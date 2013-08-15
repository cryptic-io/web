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
            this.worker = new Worker(this.get('workerScript'))
            this.setupPostMessage(this.worker)
            this.worker.onmessage = _.bind(this.callbackHandler,this)
            //we cannot just create the worker and send it messages,
            //we need to wait until it is finished spawning
            var workerMessageOnComplete = "readyToRock" //this is what the worker will send when it's ready to start doing stuff


            //setup the callback handler
            this.bindSuccess(workerMessageOnComplete, _.bind(this.initializeChunk, this, callback))
        },

        initializeChunk : function(callback){
            var command = "initializeChunk"

            this.worker.postMessage({
                command : command
                , entropy : sjcl.random.randomWords(8)
                , chunkOpts: {
                    iv:this.get('iv')
                    , key:this.get('key')
                    , username : this.get('username')
                    , RSAObject : this.get('RSAObject')
                }

            })

            //setup the callback handler
            this.bindSuccess(command, callback)
            this.reallyAttachProgressListener()
        },


        setupPostMessage: function(worker) {
            var postMessageFunc = worker.webkitPostMessage || worker.postMessage; //try to use webkitPostMessage
            //check to see if browser supports transferable buffers in messages
            var SUPPORTS_TRANSFERS = false;
            try {
                var testAB = new ArrayBuffer(1);
                worker.postMessage({buffer: testAB}, [testAB]);
                if (!testAB.byteLength) { //if there is no byteLength then it was transferred
                    SUPPORTS_TRANSFERS = true;
                }
            } catch(e) {
            }
            if (SUPPORTS_TRANSFERS) {
                worker.postMessage = postMessageFunc;
            } else {
                worker.postMessage = function(obj) { //ignore the array on the end
                    postMessageFunc(obj);
                };
            }
        },

        //have the ability to call this only when really necessary. Be lazy ;)
        setBuffer: function(callback, hasBuffer){
            if (_.isUndefined(this.worker)){
                //we don't have a worker yet, lets make one
                this.createWorker(_.bind(this.setBuffer, this, callback, hasBuffer))
                return
            }

            if ( !hasBuffer ){
                this.getBufferFromState(_.bind(this.setBuffer, this, callback, true))
                return
            }

            this.placedBuffer = true;
            var command = "setBuffer"
            , buffer = this.get("buffer")
            this.worker.postMessage({
                command: command,
                arrayBuffer: buffer
            }, [buffer]);

            this.unset('buffer')
            this.bindSuccess(command, callback);
        },

        //save the buffer info so we know how get the correct chunk when we really need it.
        saveBufferInfo: function(fileModel, start, end, padding){
            this.set('bufferInfo',[fileModel, start, end, padding])
        },

        bindSuccess: function(command, callback) {
            //Only want this to happen once
            this.on(command + ':success', _.once(function(event) {
                callback(event.data.result);
            }));
        },

        continousBindSuccess: function(command, callback) {
            //Only want this to happen once
            this.on(command + ':success', function(event) {
                callback(event.data.result);
            });
        },

        bindError: function(command, callback) {
            this.on(command + ':error', _.once(callback));
        },

        encryptChunk: function(callback) {
            //Check to see if the worker has a copy of the buffer, if not, give it one
            if (!this.placedBuffer){
                this.setBuffer(_.bind(this.encryptChunk, this, callback), false) //this is set to false to let the function figure out where the buffer is
                return 
            }


            var command = "encryptChunk";
            this.worker.postMessage({
                command: command
            });

            this.bindSuccess(command, callback);
            
        },

        decryptChunk: function(callback) {
            var command = "decryptChunk";
            this.worker.postMessage({
                command: command
            });
            //it will get an event.data as the parameter
            
            this.bindSuccess(command, callback);
        },

        /*
        encodeIVKey: function(callback) {
            var command = "encodeIVKey";
            this.worker.postMessage({
                command: command
            });

            this.bindSuccess(command, callback);
        },
        */

        upload: function(callback) {
            //Check to see if the worker has a copy of the buffer, if not, give it one
            if (!this.placedBuffer){
                this.setBuffer( _.bind(this.upload, this, callback), false)
                return 
            }

            var command = "upload";

            this.worker.postMessage({
                command: command
            });

            //We listen in for the event that will be triggered when the worker is done
            this.bindSuccess(command, _.bind(function(chunkInfo){
              //save the tag
              this.set('tag',chunkInfo.tag)

              callback(chunkInfo.linkName)
            },this));

            //If we wanted to account for an error we could do
            this.bindError(command, function(result) {
                console.error('There was an error with the worker: ', result);
            });

        },

        download: function(args, callback){
            if (_.isUndefined(this.worker)){
                //we don't have a worker yet, lets make one
                this.createWorker(_.bind(this.download, this, args, callback))
                return
            }

            var command = "download"

            this.worker.postMessage({
                command: command,
                linkName: args.linkName,
                linkKeyObj: args.linkKeyObj,
                IVKey: args.IVKey,
                tag : args.tag
            });

            //We listen in for the event that will be triggered when the worker is done
            this.bindSuccess(command, _.bind(function(decryptedBuffer) {
                this.set('buffer', decryptedBuffer);
                callback(decryptedBuffer);
            },this));

            //If we wanted to account for an error we could do
            this.bindError(command, function(result) {
                console.error('There was an error with the worker: ', result);
            });
        },

        writeToFile: function(fileSystem, manifestObj, callback) {
            var command = 'writeToFile';

            this.worker.postMessage({
                command: command,
                manifest: manifestObj,
                fileSystem: fileSystem,
                chunkInfo: this.get('chunkInfo')
            });

            //We listen in for the event that will be triggered when the worker is done
            this.bindSuccess(command, callback);

            //If we wanted to account for an error we could do
            this.bindError(command, function(result) {
                console.error('There was an error with the worker', result);
            });
        },

        readData: function() {
            var stringBufferView = new Uint8Array(this.get('buffer'));
            return String.fromCharCode.apply(this,stringBufferView);
        },


        callbackHandler: function(event) {
            if (event.data.command) {
                this.trigger(event.data.command+':'+event.data.status, event);
                console.log('triggered',(event.data.command + ':' + event.data.status));
                console.log('From worker', event.data);
            } else {
                console.log('From worker', event.data);
            }
        },

        terminate: function() {
            if (this.worker) {
                this.worker.terminate();
            }
        },

        //setup a callback to be called when the progress changes
        attachProgressListener: function(callback){
            this.set('progressListener',callback)
        },

        //this will use the saved callback for the progress listener to attach it to the worker chunk 
        reallyAttachProgressListener: function(){
            var command = "attachProgressListener"

            this.worker.postMessage({
                command: command
            });

            //We listen in for the event that will be triggered when the worker is done
            this.continousBindSuccess(command,this.get("progressListener"))

            //If we wanted to account for an error we could do
            this.bindError(command, function(result) {
                console.error('There was an error with the worker in the progress listener', result);
            });
        }
        
    });
});
