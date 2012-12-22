//returns the file model
totalText=[]
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

           webworkers: true
           , maxWorkers: 2

        },

        fileSystem: new FileSystem(),

        initialize: function(){

            //Unfortunately somethings have vendor prefixes so we'll get that sorted right here and now
            File.prototype.slice = File.prototype.slice ? File.prototype.slice : File.prototype.mozSlice;

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
            var file = this.get('file')
            , chunkSize = Chunk.prototype.defaults.chunkSize
            , chunkCount = Math.ceil(file.size/chunkSize)
            //see if we need padding
            //32 is becasue the encryption works on a 32 bit array
            //we add one more chunk for padding sake
            //if ( (file.size%chunkSize)%32 != 0 )  chunkCount++;
            

            if (this.has('chunks')) return callback(this.get('chunks'));

            var counter = 0
            , chunks = []
            , padding


            var splitNext = function(){
                if ( counter < file.size ){
                    padding = false
                    
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

                    this.getArrayBufferChunk(start, end, _.bind(function(padding, buffer){

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

                        /**
                        chunks[chunks.length-1].attachProgressListener(_.bind(function(i, progressObj){
                            console.log('================================> chunk',i,'is ',progressObj.event,'and',progressObj.progress,'% done')
                        },this,chunks.length))
                        */

                        //start splitting the next chunk
                        splitNext.apply(this);
                    },this, padding))

                }else{
                    this.set('chunks', chunks);
                    this.manifest.setChunks(chunks, function(){
                        if (callback) callback(chunks)
                    })
                }
                return;

            }

            splitNext.apply(this);
            return;

        },

        attachProgressListenerToChunks: function(){
            var chunks = this.get('chunks');
            var progressView = this.get('progressView')
            var numberOfUpdateEventsPerChunk = 2 //represents the events that will be updated for each chunk, this is weighted evenly
            //There is the upload event and the encrypting event. That's 2
            var numberOfChunks = chunks.length  //the chunks that are going to be part of the whole progress
            var chunkProgress = {}

            var progressListener = function(chunkNo){
                //We are going to keep track of each individual chunks progress 
                var currentChunkProgress = chunkProgress[chunkNo] = {Uploading:0}
                

                //in order to scale the individual progress events for the whole shebang 
                return function(progressObj){

                    //update the progress of the affected chunk
                    currentChunkProgress[progressObj.event]=progressObj.progress
                    console.log(progressObj.event,progressObj.progress)

                    //create an array of total progresses for each chunk
                    var totalChunkProgress = _.map(chunkProgress, function(singleChunkProgressObj){
                        return _.reduce(singleChunkProgressObj, function(memo, eventProgress){ return memo + eventProgress })
                    })

                    //sum the total progresses from each chunk to a total progress
                    totalChunkProgress = _.reduce(totalChunkProgress, function(memo, singleChunkProgress){ return singleChunkProgress + memo})

                    //scale the progress appropriately for the chunks
                    totalChunkProgress = totalChunkProgress/(numberOfChunks*numberOfUpdateEventsPerChunk)
                    console.log('total progress:',totalChunkProgress)

                    progressView.changePercentage(totalChunkProgress)
                }
            }

            //attach the progress listener to each chunk
            _.each(chunks, function(chunk, chunkNo){
                chunk.attachProgressListener(progressListener(chunkNo));
            })
        },

        //Returns the linkName for the manifest and the key
        upload: function(callback){
            //check to see if we have made chunks for this file or not
            if (!this.has('chunks')){
                return this.split(_.bind(this.upload,this,callback));
            }
            var chunks = this.get('chunks');
            var file = this.get('file');
            var chunkSize = Chunk.prototype.defaults.chunkSize
            var chunkCount = Math.ceil(file.size/chunkSize)

            this.attachProgressListenerToChunks();


            uploadManifest = _.after(chunks.length, _.bind(this.manifest.uploadManifest, this.manifest, callback) )

            // The chunks array will act as a queue, and we will spawn
            // maxWorkers number of workers to read from the queue
           
            _.each(_.range(this.get('maxWorkers')), _.bind(function(){this.recursivelyUploadChunks(chunks)},this))
        },

        recursivelyUploadChunks: function(chunks){
          if (!chunks.length) return;
          var chunk = chunks.pop()
          chunk.upload(_.bind(function(index,linkName){
            if(this.get('webworkers')){
                chunk.terminate(); //destroy the current chunk web worker, to save resources
            }

            //save the response from the server
            this.manifest.setChunkLinkName(index, linkName, function(){
              //async way of knowing when all the chunks have been uploaded, we go on to upload the chunks
              uploadManifest()

            })

            //now we recursively upload the chunks, given there are still chunks to process
            if (chunks.length) this.recursivelyUploadChunks(chunks)
          }, this, chunks.length))
        },

        download: function(linkName, passcode, callback){

            this.manifest.downloadManifest(linkName, passcode, _.bind(function(manifest){
                console.log('we got the manifest!');
                this.manifest = manifest
                this.createChunksFromManifest()
                this.attachProgressListenerToChunks();
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
            var chunks = this.get('chunks')

            //get more space for the new file
            this.fileSystem.requestMoreSpace(this.manifest.get('size'), _.bind(function(fs){

                //create the file and delete it if it already exists
                FileSystemHandler.createFile({
                    successCallback: _.bind(function(){

                        //callback after all the chunks have been written
                        var asyncCallback = _.after(chunks.length, callback)

                        //reverse the chunks to use it as a stack
                        var chunksStack = chunks.reverse()
                        var writePositionObj = { writePosition:0, downloadedChunks:{}, numberOfChunks:chunks.length }

                        //spawn the number of maxWorkers
                        _.map(_.range(this.get('maxWorkers')), _.bind(this.recursivelyDownloadChunks, this, chunksStack, writePositionObj))

                        //spawn a single writing worker
                        this.recursivelyWriteChunks(writePositionObj, callback)

                        //this.downloadChunk(chunk, chunkKeys, asyncCallback)

                    },this)
                    , name: this.manifest.get('name')
                    , fileSystem: this.fileSystem
                })
            }, this))

        },

        recursivelyDownloadChunks : function(chunks, writePositionObj){
            //nothing left to process
            if (chunks.length == 0){
                return;
            }

            //peek at the chunk before we decide we want it
            var chunk = chunks[chunks.length-1]
            , chunkIndex = chunk.get('chunkInfo').part

            // Prevent from downloading too far ahead.
            // If this worker is too ahead we don't want the chunk just yet
            if ( chunkIndex > this.get('maxWorkers') + writePositionObj.writePosition ){
                setTimeout(_.bind(arguments.callee,this,chunks, writePositionObj), 500) //wait half a second to try again
                return
            }

            //we want the chunk, so lets pop it off the stack
            chunk = chunks.pop()

            //get the key and then download the file
            this.manifest.fetchChunkKey(chunk.get('chunkInfo').part, _.bind(function(linkKey){

                if ( this.get('webworkers') ){
                    console.log('USING WEBWORKERS')
                    //If there are web workers do this
                    chunk.download({
                        linkName: chunk.get('chunkInfo')['linkName']
                        , linkKey: linkKey
                        , IVKey: chunk.get('chunkInfo')['IVKey']
                    }, function(decryptedBuffer){
                        //Here we put it on the map to be written by the main thread
                        writePositionObj.downloadedChunks[chunkIndex]=chunk
                    })
                }else{
                    //not using webworkers
                    //We need to break it up into multiple steps (something the webworker does to save messages)
                    var args = {
                        linkName: chunk.get('chunkInfo')['linkName']
                        , linkKey: linkKey
                        , IVKey: chunk.get('chunkInfo')['IVKey']
                    }
                    chunk.set({'linkName':args.linkName, 'linkKey':args.linkKey})
                    chunk.decodeIVKey(args.IVKey)
                    chunk.download(_.bind(function(decryptedBuffer){
                        //Here we put it on the map to be written by the main thread
                        writePositionObj.downloadedChunks[chunkIndex]=chunk
                    },this) )
                }

                // Using a dirty hack to place the recursive call at the top of Javascript's call stack  
                // We want to place it at the top because it gives the writer a chance to catch up
                _.defer(_.bind(this.recursivelyDownloadChunks, this, chunks, writePositionObj))},this))
        },

        recursivelyWriteChunks : function(writePositionObj, writeCompleteCallback){
            // So we are going to read from the writePositionObj and treat it as a pointer
            // it's a sort of queue that of processed chunks from the download worker
            // We have to write the chunks sequentially, but we don't have to download the chunks one by one
            // So we have maxWorkers downloading and staying with writePosition+maxWorkers chunks
            var writePosition = writePositionObj.writePosition
            , downloadedChunks = writePositionObj.downloadedChunks

            //lets check to see if we have already written everything.
            if ( writePosition >= writePositionObj.numberOfChunks ){
                writeCompleteCallback()
                return
            }


            // if the current write position chunk is undefined, that means we haven't downloaded it yet
            // Let's wait a bit for the download workers to do their work
            if ( !downloadedChunks[writePosition] ){
                setTimeout(_.bind(arguments.callee, this, writePositionObj, writeCompleteCallback), 500)
                return
            }

            //So we have a chunk that is ready to be written
            var chunk = downloadedChunks[writePosition]
            this.appendToFile(chunk, _.bind(function(){
                writePositionObj.writePosition++; //Increment the writePositionObj

                // Make the recursive call
                // Using a dirty hack to place the recursive call at the top of Javascript's call stack  
                _.defer(_.bind(this.recursivelyWriteChunks, this, writePositionObj, writeCompleteCallback))
            },this));
        },

        appendToFile: function(chunk, callback){
            var chunkCount = _.keys(this.manifest.get('chunks')).length - 1 //zero indexed
            , chunkSize = Chunk.prototype.defaults.chunkSize
            , buffer = chunk.get('buffer')

            //if this is the last chunk only write the amount needed to the file
            if ( chunk.get('chunkInfo').part == chunkCount){
                var lastChunkSize =  this.manifest.get('size') - (chunkCount*chunkSize)

                buffer = buffer.slice(0, lastChunkSize)
            }


            //specify where in the file this chunk starts
            var start = chunk.get('chunkInfo').part*chunkSize


            var errCallback = function(e){console.error('Error in saving file:',e)}

            FileSystemHandler.appendToFile(
                { 
                  successCallback: _.bind(function(){
                      callback()
                  },this)
                  , errorCallback: errCallback
                  , name: this.manifest.get('name')
                  , fileSystem: this.fileSystem
                  , data: buffer
                  , type: this.manifest.get('type')
                  , size: this.manifest.get('size')
                  , start: start
                }
            )
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
        },

        destroy:function(){
            this.trigger('destroy')
            if (this.get('webworkers')){
                _.each(this.get('chunks'), function(chunk){ chunk.terminate() })
            }
        },
    })
});


