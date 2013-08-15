//returns the file model
define(['models/Chunk','models/Manifest','models/ChunkWorkerInterface', 'models/FileSystem', 'tools/FileSystemHandler', 'config'],function(Chunk, Manifest, ChunkWorkerInterface, FileSystem, FileSystemHandler, config){ 
    return Backbone.Model.extend({

        defaults:{
            /**
             * Stuff that will be instatiated on creation
             *
             * file: File obj
             * reader: FileReader obj
             *
            */

           webworkers: config.webworkers ? true : false
           , maxWorkers: 3
        },

        chrome : navigator.userAgent.indexOf("Chrome") > 0,
        firefox : navigator.userAgent.indexOf("Firefox") > 0,
        webkit : navigator.userAgent.indexOf("AppleWebKit") > 0,

        fileSystem: new FileSystem(),

        initialize: function(){
            //Unfortunately somethings have vendor prefixes so we'll get that sorted right here and now
            File.prototype.slice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice

            var user = this.get('user')
            if (_.isUndefined(user)){
              
            }else{
              var userBlob = user.get('userBlob').getBlob()
              this.set('userBlob',userBlob)
            }


            var manifestOptions = {userBlob:userBlob}
            if (this.has('file')){
                manifestOptions = _.defaults(manifestOptions,_.pick( this.get('file'), 'name', 'type', 'size' )) 
            }
            this.manifest = new Manifest( manifestOptions )
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

                    //It has to fit within 32*4 because 32 bits is the int size used in data encryption and 4 because AES operates on a blocksize of 16bytes 
                    //(32*4) == 16Bytes
                    if ( (end - start)%(16) != 0){
                        leftover = (end - start)%(16)
                        paddedSize  = (16 - leftover) + (end-start)
                        


                        console.log('padding is necessary')

                        padding = true;
                        //end -= leftover;

                    }


                    var usernameAndRSA = {}
                    if ( this.has("userBlob") ) {
                      usernameAndRSA = _.pick(this.get('userBlob'), ["username", "RSAObject"]) 
                    }

                    if( this.get('webworkers') ){
                        var chunk = new ChunkWorkerInterface(usernameAndRSA)
                    }else{
                        //create the new chunk without a buffer, we'll just give it the necessary info for the buffer, it will only copy the buffer when necessary
                        var chunk = new Chunk(usernameAndRSA)
                    }
                    chunk.saveBufferInfo(this, start, end, padding)
                    chunks.push(chunk)

                    //start splitting the next chunk
                    splitNext.apply(this);

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
            var numberOfUpdateEventsPerChunk = 2 //represents the events that will be updated for each chunk, this is weighted evenly
            //There is the upload event and the encrypting event. That's 2
            var numberOfChunks = chunks.length  //the chunks that are going to be part of the whole progress
            var chunkProgress = {}
            var that = this

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
                    that.trigger("file:progress",totalChunkProgress)
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
          //stopping condition
          if (!chunks.length) return;

          var chunk = chunks.pop()
          chunk.upload(_.bind(function(index,linkName){
            if(this.get('webworkers')){
                chunk.terminate(); //destroy the current chunk web worker, to save resources
            }

            //save the response from the server
            this.manifest.setChunkLinkName(index, linkName, chunk, function(){
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
                //send an event for the file name
                this.trigger("file:name",manifest.get("name"))

                this.manifest = manifest
                this.createChunksFromManifest()
                this.attachProgressListenerToChunks();
                this.downloadChunks(callback)
            },this))
        },

        loadManifest: function(linkName, passcode, callback){
            this.manifest.downloadManifest(linkName, passcode, callback)
        },

        createChunksFromManifest: function(){
            var chunks = _.clone(this.manifest.get('chunks'))
            , usernameAndRSA = {}
            , that = this

            if (this.has('userBlob')){
              _.pick(this.get('userBlob'), ["username", "RSAObject"]) 
            }
            //convert the chunks obj into an array 
            chunks = _.values(chunks)
            //Sort the array 
            chunks = _.sortBy(chunks, function(chunk){ return chunk.part } )

            //create the chunk workers
            if (this.get('webworkers')){
                chunks = _.map(chunks, function(chunk){ return (new ChunkWorkerInterface(_.defaults({chunkInfo:chunk}, usernameAndRSA))) } )
            }else{
                chunks = _.map(chunks, function(chunk){ return (new Chunk(_.defaults({chunkInfo:chunk}, usernameAndRSA) ) ) } )
            }

            this.set('chunks',chunks)

            //now the chunk workers are ready for some downloading action

        },

        //Speciy which chunk you want. if unspecified will default to all
        downloadChunks: function(callback){
            var chunks = this.get('chunks')
            , size = this.manifest.get('size')

            var successCallback = _.bind(function(){

                //callback after all the chunks have been written
                var asyncCallback = _.after(chunks.length, callback)

                //reverse the chunks to use it as a stack
                var chunksStack = chunks.reverse()
                var writePositionObj = { writePosition:0, downloadedChunks:{}, numberOfChunks:chunks.length }

                //spawn the number of maxWorkers
                _.map(_.range(this.get('maxWorkers')), _.bind(this.recursivelyDownloadChunks, this, chunksStack, writePositionObj))

                //spawn a single writing worker, single because it needs to be sequential
                this.recursivelyWriteChunks(writePositionObj, callback)
            },this)

            if ( this.chrome ) {
              //get more space for the new file
              this.fileSystem.requestMoreSpace(size, _.bind(function(fs){
                  //create the file and delete it if it already exists
                  FileSystemHandler.createFile({
                      successCallback: successCallback
                      , name: this.manifest.get('name')
                      , fileSystem: this.fileSystem
                  })
              }, this))
            }else if (this.firefox){ 
              //for firefox we need to use indexed db
              //There is an optimization here that involves caching whether we already requested permissions to save >50MB of data
              //But that's for a later date
              console.log("asking for indexedDB")
              var dbName = "cryptic"

              //we have to request permissions to save big files, but after that we need to make the DB where the file is going to live for realz
              var afterPermissions = _.bind(function(){
                var request = window.indexedDB.open(dbName,1)
                this.dbName = dbName

                request.onerror = function(event){
                  console.error("There was an error in the indexedDB request",request.errorCode)
                }

                request.onupgradeneeded = function(event){
                  console.log("indexedDB is requesting upgrade")
                  request.result.createObjectStore(dbName)
                }

                //safe a reference to the db, and call the successCallback
                request.onsuccess = _.bind(function(event){
                  this.db = request.result

                  //First delete any old data by clearing the object store, then call the successCallback
                  this.db.transaction(dbName, "readwrite").objectStore(dbName).clear().onsuccess = successCallback
                },this)
              },this)

              var request = window.indexedDB.open(dbName,1)
              request.onerror = function(event){
                console.error("There was an error in the indexedDB request",request.errorCode)
              }

              request.onupgradeneeded = function(event){
                console.log("indexedDB is requesting upgrade")
                request.result.createObjectStore(dbName)
              }

              request.onsuccess = function(event){
                console.log("Success for the request!", request.result)
                var db = request.result

                var transaction = db.transaction(dbName, "readwrite")

                transaction.onerror = function(e){
                  console.error("There was an error with the transaction",e)
                }

                transaction.oncomplete = function(e){
                  console.log("Transaction completed succesfully!")
                  //delete the indexedDB temp thing we made to ask permissions for >50MB
                  db.close() 
                  indexedDB.deleteDatabase(db)
                  afterPermissions()
                }

                //lets ask for the permissions of getting over 50MB at once so we don't have to ask again later
                transaction.objectStore(dbName).put(new Blob([new ArrayBuffer(51*1024*1024)]), 'temp')
              }

            }


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

            var chunkNo = chunks.length
            console.log('chunk:',chunkIndex,'downloading')


            //we want the chunk, so lets pop it off the stack
            chunk = chunks.pop()

            //get the key and then download the file
            this.manifest.fetchChunkKey(chunk.get('chunkInfo').part, _.bind(function(linkKeyObj){

                if ( this.get('webworkers') ){
                    console.log('USING WEBWORKERS')
                    //If there are web workers do this
                    chunk.download({
                        linkName: chunk.get('chunkInfo')['linkName']
                        , linkKeyObj: linkKeyObj
                        , IVKey: chunk.get('chunkInfo')['IVKey']
                        , tag : chunk.get('chunkInfo')['tag']
                    }, _.bind(function(decryptedBuffer){
                        console.log('chunk:',chunkIndex,'downloaded')
                        //Here we put it on the map to be written by the main thread
                        writePositionObj.downloadedChunks[chunkIndex]=chunk

                        // Using a dirty hack to place the recursive call at the top of Javascript's call stack  
                        // We want to place it at the top because it gives the writer a chance to catch up
                        _.defer(_.bind(this.recursivelyDownloadChunks, this, chunks, writePositionObj))

                    },this))
                }else{
                    //not using webworkers
                    //We need to break it up into multiple steps (something the webworker does to save messages)
                    var args = {
                        linkName: chunk.get('chunkInfo')['linkName']
                        , linkKeyObj: linkKeyObj
                        , IVKey: chunk.get('chunkInfo')['IVKey']
                        , tag : chunk.get('chunkInfo')['tag']
                    }
                    chunk.set({'linkName':args.linkName, 'linkKeyObj':args.linkKeyObj, 'tag':args.tag})
                    chunk.decodeIVKey(args.IVKey)
                    chunk.download(_.bind(function(decryptedBuffer){
                        //Here we put it on the map to be written by the main thread
                        writePositionObj.downloadedChunks[chunkIndex]=chunk

                        // Using a dirty hack to place the recursive call at the top of Javascript's call stack  
                        // We want to place it at the top because it gives the writer a chance to catch up
                        _.defer(_.bind(this.recursivelyDownloadChunks, this, chunks, writePositionObj))
                    },this) )
                }

            },this))
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
            console.log('chunk:',writePosition,'writing')
            console.log('chunk:',chunk.get('chunkInfo').part,'writing')

            var successCallback = _.bind(function(){
                console.log('chunk:',writePosition,'written')
                console.log('chunk:',chunk.get('chunkInfo').part,'writing')
                writePositionObj.writePosition++; //Increment the writePositionObj

                if (this.get('webworkers')){
                    chunk.terminate()
                }

                // Make the recursive call
                // Using a dirty hack to place the recursive call at the top of Javascript's call stack  
                _.defer(_.bind(this.recursivelyWriteChunks, this, writePositionObj, writeCompleteCallback))
            },this)

            if ( this.chrome ) {
              this.appendToFile(chunk, successCallback)
            } else if ( this.firefox ) {
              this.addToIndexedDB(chunk, writePosition, successCallback)
            }
        },

        addToIndexedDB : function(chunk, writePosition, successCallback){
          var transaction = this.db.transaction(this.dbName,'readwrite')
          , that = this
          ,  chunkCount = _.keys(this.manifest.get('chunks')).length - 1 //zero indexed
          , chunkSize = Chunk.prototype.defaults.chunkSize
          , buffer = chunk.get('buffer')

          //if this is the last chunk only write the amount needed to the file
          if ( chunk.get('chunkInfo').part == chunkCount){
              var lastChunkSize =  this.manifest.get('size') - (chunkCount*chunkSize)

              buffer = buffer.slice(0, lastChunkSize)
          }

          transaction.oncomplete = function(){
            console.log("placed chunk at:",writePosition)
            successCallback()
          }

          transaction.onerror = function(){
            console.error("There was an error in trying to save a chunk:", writePosition, "Retrying now")
            that.addToIndexedDB(chunk, writePosition, successCallback)
            return
          }

          transaction.objectStore(this.dbName).put(new Blob([buffer]), "chunk:"+writePosition)
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

        getFileEntry: function(callback){
            var name = this.manifest.get('name')
            if (this.chrome){
              this.fileSystem.getFileSystem(function(fs){
                  fs.root.getFile(name, {}, callback)
              })
            } else if (this.firefox){
              var transaction = this.db.transaction(this.dbName).objectStore(this.dbName).mozGetAll()
              t = transaction


              transaction.onsuccess = function(event){
                var chunks = event.target.result
                , file = new Blob(chunks)
                , url = URL.createObjectURL(file)
                //emulate a FileEntry Obj
                var fileEntry = {
                  fullPath : "/",
                  name: name,
                  toURL : function(){ return url }
                }
                callback(fileEntry)
              }

              transaction.onerror = function(event){
                console.error("There was an error in getting the chunks",e)

              }
            }
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


