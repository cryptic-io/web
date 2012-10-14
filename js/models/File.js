//returns the file model
define(['models/Chunk','models/Manifest','models/ChunkWorkerInterface'],function(Chunk, Manifest, ChunkWorkerInterface){ 
    return Backbone.Model.extend({

        defaults:{
            /**
             * Stuff that will be instatiated on creation
             *
             * file: File obj
             * reader: FileReader obj
             *
            */

           chunkSize : 1e6 // 10 MB
           , uploadURL: 'api/uploadFile'
           , encryptor: sjcl.mode.betterCBC

        },

        manifest: new Manifest(),

        initialize: function(){

            //Unfortunately somethings have vendor prefixes so we'll get that sorted right here and now
            File.prototype.slice = File.prototype.webkitSlice ? File.prototype.webkitSlice : File.prototype.mozSlice;
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
            if ( (file.size%chunkSize)%32 != 0 )  chunkCount++;
            

            if (this.has('chunks')) return callback(this.get('chunks'));

            var counter = 0;
            var chunks = [];

            //async call to save chunks
            var saveChunks = _.after(chunkCount, _.bind(function(chunks){ 
                this.set('chunks', chunks);
                this.manifest.setChunks(chunks)
                callback(chunks)
            },this) )


            padding = false
            while ( counter < file.size ){
                var start = counter;
                counter += chunkSize;
                var end = counter < file.size ? counter : file.size;

                //It has to fit withing 32*4 because 32 bits is the int size used in data encryption and 4 because AES operates on 4 ints at a time for decryption
                if ( (end - start)%(16) != 0){
                    leftover = (end - start)%(16)
                    padding = true;
                    end -= leftover;
                }

                this.getArrayBufferChunk(start, end, function(buffer){
                    chunks.push(
                        new ChunkWorkerInterface({buffer:buffer})
                    )
                    saveChunks(chunks)
                })
                
                //We need to created a padded chunk that contains the last couple of bytes of information
                if (padding){
                    start = end;
                    end = file.size + 32-leftover
                    counter += chunkSize;
                    this.getArrayBufferChunk(start, end, function(buffer){
                        paddedBuffer = new ArrayBuffer(32)

                        buffer1View = new Int8Array(buffer)
                        buffer2View = new Int8Array(paddedBuffer)
                        for (var i = 0; i < buffer1View.length; i++) {
                            buffer2View[i] = buffer1View[i]
                        };

                        chunks.push(new ChunkWorkerInterface({buffer:paddedBuffer}));
                        saveChunks(chunks)
                    })
                }

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
                //chunk.encryptChunk()
                
                //bind the function to this and keep the current index inside to function so it doesn't change when called
                chunk.upload(_.bind(function(index, linkName){
                    //save the response here
                    this.manifest.setChunkLinkName(index, linkName)

                    //async way of knowing when all the chunks have been uploaded, we go on to upload the chunks
                    uploadManifest()

                }, this, i))
            };
        },

        download: function(linkName, passcode, callback){

            this.manifest.downloadManifest(linkName, passcode, _.bind(function(manifest){
                console.log('we got the manifest!');
                this.manifest = manifest
                this.createChunksFromManifest()
                this.downloadChunks(null,callback)
            },this))
        },

        //mainly for testing, ouputs text
        readFile: function(){
            fileData = _.map(this.get('chunks'), function(chunk){
                return chunk.readData()
            })
            return fileData.join('')
        },

        createChunksFromManifest: function(){
            var chunks = _.clone(this.manifest.get('chunks'));
            //convert the chunks obj into an array 
            chunks = _.values(chunks)
            //Sort the array 
            chunks = _.sortBy(chunks, function(chunk){ return chunk.part } )

            //create the chunk workers
            chunks = _.map(chunks, function(chunk){ return (new ChunkWorkerInterface({chunkInfo:chunk})) } )
            this.set('chunks',chunks)

            //now the chunk workers are ready for some downloading action

        },

        //Speciy which chunk you want. if unspecified will default to all
        downloadChunks: function(whichChunks, callback){
            //get all the chunks if whichChunks haven't been specified
            var chunks = (whichChunks === null) ? this.get('chunks') : whichChunks

            //only execute the callback after all the chunks have downloaded
            asyncExecuteCallback = _.after(chunks.length, callback)

            //we need to get the fileKeys
            this.manifest.fetchChunkKeys(_.bind(function(chunkKeys){
                //download each chunk
                _.each(chunks, function(chunk){
                    chunk.download({
                        linkName: chunk.get('chunkInfo')['linkName']
                        , linkKey: chunkKeys[chunk.get('chunkInfo')['linkName']]
                        , IVKey: chunk.get('chunkInfo')['IVKey']
                    }, asyncExecuteCallback )
                })

            },this))

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


