//returns the file model
define(['models/Chunk','models/Manifest','models/ChunkWorkerInterface', 'models/FileSystem', 'tools/FileSystemHandler'],function(Chunk, Manifest, ChunkWorkerInterface, FileSystem, FileSystemHandler){ 
    return Backbone.Model.extend({

        defaults:{
            /**
             * Stuff that will be instatiated on creation
             *
             * file: File obj
             * reader: FileReader obj
             *
            */

           webworkers: false

        },

        fileSystem: new FileSystem(),

        initialize: function(){

            //Unfortunately somethings have vendor prefixes so we'll get that sorted right here and now
            File.prototype.slice = File.prototype.webkitSlice ? File.prototype.webkitSlice : File.prototype.mozSlice;

            if (this.has('file')){
                this.manifest = new Manifest( _.pick( this.get('file'), 'name', 'type', 'size' ) );
            }else{
                this.manifest = new Manifest();
            }
        },

        //splits the file into several chunks of size specified by the argument ( in bytes )
        //returns an array of objects in the form of 
        // chunk = [
        //   { start: 0, end: 1024 }
        //   { start: 1025, end: 2048 }
        //   ...
        //]
        split: function(callback) {
            var file = this.get('file');
            var chunkSize = Chunk.prototype.defaults.chunkSize
            var chunkCount = Math.ceil(file.size/chunkSize)
            //see if we need padding
            //32 is becasue the encryption works on a 32 bit array
            //we add one more chunk for padding sake
            //if ( (file.size%chunkSize)%32 != 0 )  chunkCount++;
            

            if (this.has('chunks')) return callback(this.get('chunks'));

            var counter = 0;
            var chunks = [];

            //async call to save chunks
            var saveChunks = _.after(chunkCount, _.bind(function(chunks){ 
                this.set('chunks', chunks);
                this.manifest.setChunks(chunks, function(){
                    if (callback) callback(chunks)
                })
            },this) )


            padding = false
            while ( counter < file.size ){
                var start = counter;
                counter += chunkSize;
                var end = counter < file.size ? counter : file.size;

                //It has to fit withing 32*4 because 32 bits is the int size used in data encryption and 4 because AES operates on 4 ints at a time for decryption
                //Then it has to divide by 8 because 8 bits in a byte
                //so 2^5 * 2^2 / 2^3  == 16
                if ( (end - start)%(16) != 0){
                    leftover = (end - start)%(16)
                    paddedSize  = (16 - leftover) + (end-start)
                    


                    console.log('padding is necessary')

                    padding = true;
                    //end -= leftover;

                }

                this.getArrayBufferChunk(start, end, _.bind(function(buffer){

                    if (padding){
                        var copierDest = new Uint8Array(paddedSize)
                        var copierSource = new Uint8Array(buffer)
                        _.each(copierSource, function(byte, index){ copierDest[index] = byte })
                        buffer = copierDest.buffer;
                    }

                    if (this.get('webworkers')){
                        chunks.push(
                            new ChunkWorkerInterface({buffer:buffer})
                        )
                    }else{
                        chunks.push(
                            new Chunk({buffer:buffer})
                        )
                    }
                    saveChunks(chunks)
                },this))
                

            }

        },

        //Returns the linkName for the manifest and the key
        upload: function(callback){
            //this.split()
            if (!this.has('chunks')){
                return this.split(_.bind(this.upload,this,callback));
            }
            var chunks = this.get('chunks');
            var file = this.get('file');
            var chunkSize = Chunk.prototype.defaults.chunkSize
            var chunkCount = Math.ceil(file.size/chunkSize)



            uploadManifest = _.after(chunks.length, _.bind(this.manifest.uploadManifest, this.manifest, callback) )

            for (var i = 0; i < chunks.length; i++) {
                var chunk = chunks[i]
                
                //bind the function to this and keep the current index inside to function so it doesn't change when called
                chunk.upload(_.bind(function(index, linkName){
                    //save the response here
                    console.log('hello world')

                    this.manifest.setChunkLinkName(index, linkName, function(){
                        //async way of knowing when all the chunks have been uploaded, we go on to upload the chunks
                        uploadManifest()
                    })

                }, this, i))
            };
        },

        download: function(linkName, passcode, callback){

            this.manifest.downloadManifest(linkName, passcode, _.bind(function(manifest){
                console.log('we got the manifest!');
                this.manifest = manifest
                this.createChunksFromManifest()
                this.downloadChunks(callback)
            },this))
        },

        createChunksFromManifest: function(){
            var chunks = _.clone(this.manifest.get('chunks'));
            //convert the chunks obj into an array 
            chunks = _.values(chunks)
            //Sort the array 
            chunks = _.sortBy(chunks, function(chunk){ return chunk.part } )

            //create the chunk workers
            if (this.get('webworkers')){
                chunks = _.map(chunks, function(chunk){ return (new ChunkWorkerInterface({chunkInfo:chunk})) } )
            }else{
                chunks = _.map(chunks, function(chunk){ return (new Chunk({chunkInfo:chunk})) } )
            }

            this.set('chunks',chunks)

            //now the chunk workers are ready for some downloading action

        },

        //Speciy which chunk you want. if unspecified will default to all
        downloadChunks: function(callback){
            //get all the chunks if whichChunks haven't been specified
            var chunks = this.get('chunks')

            //get more space for the new file
            this.fileSystem.requestMoreSpace(this.manifest.get('size'), _.bind(function(fs){

                //create the file and delete it if it already exists
                FileSystemHandler.createFile({
                    successCallback: _.bind(function(){

                        //callback after all the chunks have been written
                        var asyncCallback = _.after(chunks.length, callback)

                        //we need to get the fileKeys
                        this.manifest.fetchChunkKeys(_.bind(function(chunkKeys){
                            //download each chunk
                            var chunk = chunks[0];
                            this.downloadChunk(chunk, chunkKeys, asyncCallback)

                        },this))

                    },this)
                    , name: this.manifest.get('name')
                    , fileSystem: this.fileSystem
                })


            }, this))

        },

        downloadChunk: function(chunk, chunkKeys, callback){

            if ( !this.get('webworkers') ){

                //If there are no web workers go here
                var args = {
                    linkName: chunk.get('chunkInfo')['linkName']
                    , linkKey: chunkKeys[chunk.get('chunkInfo')['linkName']]
                    , IVKey: chunk.get('chunkInfo')['IVKey']
                }
                chunk.set({'linkName':args.linkName, 'linkKey':args.linkKey})
                chunk.decodeIVKey(args.IVKey)

                chunk.download(_.bind(function(){

                    var chunks = this.get('chunks')

                    this.writeChunk(chunk, chunkKeys, callback);
                },this) )

            }else{

                console.log('USING WEBWORKERS')
                //If there are web workers do this
                chunk.download({
                    linkName: chunk.get('chunkInfo')['linkName']
                    , linkKey: chunkKeys[chunk.get('chunkInfo')['linkName']]
                    , IVKey: chunk.get('chunkInfo')['IVKey']
                }, _.bind(function(){
                    this.writeChunk(chunk, chunkKeys, callback);
                },this) )
            }

        },

        writeChunk: function(chunk, chunkKeys, callback){
            console.log('chunk says',chunk.readData(), 'with array of', new Uint8Array(chunk.get('buffer')) )
            chunk.writeToFile(this.fileSystem, this.manifest.toJSON(), _.bind(function(){

                var chunks = this.get('chunks')
                if (chunk.get( 'chunkInfo' )['part']+1 < chunks.length){
                    var nextChunk = chunks[chunk.get( 'chunkInfo' )['part']+1]
                    debugger;
                    if (this.get('webworkers')) chunk.terminate();
                    this.downloadChunk(nextChunk, chunkKeys, callback)
                    
                }

                callback()
            },this))

        },

        getFileEntry: function(callback){
            var name = this.manifest.get('name')
            this.fileSystem.getFileSystem(function(fs){
                fs.root.getFile(name, {}, callback)
            })
        },


        //mainly for testing, ouputs text
        readFile: function(callback){
            this.getFileEntry(function(fileEntry){
                fileEntry.file(function(file){
                    var reader = new FileReader();
                    reader.onloadend = function(e){
                        callback(this.result)
                    }
                    reader.readAsText(file)
                })
            })
        },




        getArrayBufferChunk:function(start, end, callback){

            var reader = new FileReader();
            var file = this.get('file');

            reader.onloadend = _.bind(function(event){
                //check if we are done reading the file
                if (event.target.readyState == FileReader.DONE){
                    callback(event.target.result) //call the callback with the binary data
                }

            }, this)

            //get the right chunk
            var blob = file.slice(start, end);

            //lets start reading
            reader.readAsArrayBuffer(blob)
        }
    })
});


