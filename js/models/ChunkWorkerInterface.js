//Chunk Worker Interface
define(['models/Chunk'],function(Chunk){ 
    return Chunk.extend({
        defaults:{
            workerScript: "js/ChunkWorker.js"
        },

        initialize: function(){
            this.generateKey()
        },

        /*
         * Encodes the key along with the iv
         * The first for items in the array are the iv
         */
        encodeIVKey: function(callback){
            var ivKey = sjcl.codec.base64url.fromBits(this.get('iv').concat(this.get('key')))
            if (callback) callback(ivKey)
            return ivKey
        },


        //setup a new worker
        createWorker: function(callback){
            var command = "initializeChunk"

            this.worker = new Worker(this.get('workerScript'))
            this.worker.onmessage = _.bind(this.callbackHandler,this)

            this.worker.postMessage({
                command : command
                , entropy : sjcl.random.randomWords(8)
                , chunkOpts: {
                    iv:this.get('iv')
                    , key:this.get('key')
                }

            })

            //setup the callback handler
            this.bindSuccess(command, callback)
            this.reallyAttachProgressListener()
        },

        //have the ability to call this only when really necessary. Be lazy ;)
        setBuffer: function(callback, buffer){
            if (_.isUndefined(this.worker)){
                //we don't have a worker yet, lets make one
                this.createWorker(_.bind(this.setBuffer, this, callback))
                return
            }

            if ( !buffer ){
                this.getBufferFromState(_.bind(this.setBuffer, this, callback))
                return
            }

            this.placedBuffer = true;
            var command = "setBuffer"
            this.worker.postMessage({
                command:command
                , arrayBuffer:buffer
            })

            this.unset('buffer')

            this.bindSuccess(command, callback)

        },

        //gets the buffer from the file model, along with a start, and end position, and if padding is required
        getBuffer: function(fileModel, start, end, padding, callback){
            fileModel.getArrayBufferChunk(start, end, _.bind(function(buffer){

                if (padding){
                    var copierDest = new Uint8Array(paddedSize)
                    var copierSource = new Uint8Array(buffer)
                    _.each(copierSource, function(byte, index){ copierDest[index] = byte })
                    buffer = copierDest.buffer;
                }

                callback(buffer)

            },this))
        },

        //save the buffer info so we know how get the correct chunk when we really need it.
        saveBufferInfo: function(fileModel, start, end, padding){
            this.set('bufferInfo',[fileModel, start, end, padding])
        },

        getBufferFromState: function(callback){
            //call getBuffer with the bufferInfo  as args
            this.getBuffer.apply(this,this.get('bufferInfo').concat(callback))
        },


        bindSuccess: function(command, callback){
            //Only want this to happen once
            this.on(command+':success', _.once(function(event){callback(event.data.result)}) )
        },

        continousBindSuccess: function(command, callback){
            //Only want this to happen once
            this.on(command+':success', function(event){callback(event.data.result)})
        },

        bindError: function(command, callback){
            this.on(command+':error', _.once(callback) )
        },

        encryptChunk: function(callback){
            //Check to see if the worker has a copy of the buffer, if not, give it one
            if (!this.placedBuffer){
                this.setBuffer(_.bind(arguments.callee, this, callback), false)
                return 
            }


            var command = "encryptChunk"
            this.worker.postMessage({
                "command":command
            })

            this.bindSuccess(command, callback)
            
        },

        decryptChunk: function(callback){
            var command = "decryptChunk"
            this.worker.postMessage({
                "command":command
            })
            //it will get an event.data as the parameter
            
            this.bindSuccess(command, callback)
        },

        /*
        encodeIVKey: function(callback){
            var command = "encodeIVKey"
            this.worker.postMessage({
                "command":command
            })

            this.bindSuccess(command, callback)
        },
        */

        upload: function(callback){
            //Check to see if the worker has a copy of the buffer, if not, give it one
            if (!this.placedBuffer){
                this.setBuffer( _.bind(arguments.callee, this, callback), false)
                return 
            }

            var command = "upload"

            this.worker.postMessage({
                "command":command
            })

            //We listen in for the event that will be triggered when the worker is done
            this.bindSuccess(command,callback)

            //If we wanted to account for an error we could do
            this.bindError(command,function(result){ console.error('There was an error with the worker',result)})

        },

        download: function(args, callback){
            if (_.isUndefined(this.worker)){
                //we don't have a worker yet, lets make one
                this.createWorker(_.bind(this.download, this, args, callback))
                return
            }

            var command = "download"

            this.worker.postMessage({
                "command":command
                , linkName: args.linkName
                , linkKey: args.linkKey
                , IVKey: args.IVKey
            })

            //We listen in for the event that will be triggered when the worker is done
            this.bindSuccess(command,_.bind(function(decryptedBuffer){
                this.set('buffer',decryptedBuffer)
                callback(decryptedBuffer)
            },this))

            //If we wanted to account for an error we could do
            this.bindError(command,function(result){ console.error('There was an error with the worker',result)})
        },

        writeToFile: function(fileSystem, manifestObj, callback){
            var command = 'writeToFile'

            this.worker.postMessage({
                command:command
                , manifest: manifestObj
                , fileSystem: fileSystem
                , chunkInfo: this.get('chunkInfo')
            })

            //We listen in for the event that will be triggered when the worker is done
            this.bindSuccess(command,callback)

            //If we wanted to account for an error we could do
            this.bindError(command,function(result){ console.error('There was an error with the worker',result)})
        },

        readData: function(){
            var stringBufferView = new Uint8Array(this.get('buffer'))
            var data = String.fromCharCode.apply(this,stringBufferView)

            return data;
        },


        callbackHandler: function(event){
            if (event.data.command){
                this.trigger(event.data.command+':'+event.data.status, event)
                console.log('triggered',(event.data.command+':'+event.data.status))
                console.log('From worker',event.data)
            }else{
                console.log('From worker',event.data)
            }
        },

        terminate: function(){
            if (this.worker) this.worker.terminate()
        },

        //setup a callback to be called when the progress changes
        attachProgressListener: function(callback){
            this.set('progressListener',callback)
        },

        //this will use the saved callback for the progress listener to attach it to the worker chunk 
        reallyAttachProgressListener: function(){
            var command = "attachProgressListener"

            this.worker.postMessage({
                command:command
            })

            //We listen in for the event that will be triggered when the worker is done
            this.continousBindSuccess(command,this.get("progressListener"))

            //If we wanted to account for an error we could do
            this.bindError(command,function(result){ console.error('There was an error with the worker in the progress listener',result)})
        }
        
    })
})
