//Chunk Worker Interface
define(['models/Chunk'],function(Chunk){ 
    return Backbone.Model.extend({
        defaults:{
            workerScript: "js/ChunkWorker.js"
        },

        //setup a new worker
        initialize: function(){
            this.worker = new Worker(this.get('workerScript'))
            var serialized = Chunk.prototype.serializeChunk(this.get('buffer'))
            this.worker.postMessage({
                command:"initializeChunk"
                , arrayBuffer:serialized
                , entropy: sjcl.random.randomWords(8)
            })

            this.worker.onmessage = _.bind(this.callbackHandler,this)
        },

        bindSuccess: function(command, callback){
            //Only want this to happen once
            this.on(command+':success', _.once(function(event){callback(event.data.result)}) )
        },

        bindError: function(command, callback){
            this.on(command+':error', _.once(callback) )
        },

        encryptChunk: function(callback){
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

        encodeIVKey: function(callback){
            var command = "encodeIVKey"
            this.worker.postMessage({
                "command":command
            })

            this.bindSuccess(command, callback)
        },

        upload: function(callback){
            var command = "upload"


            this.worker.postMessage({
                "command":command
            })

            //We listen in for the event that will be triggered when the worker is done
            this.bindSuccess(command,callback)

            //If we wanted to account for an error we could do
            this.bindError(command,function(result){ console.error('There was an error with the worker',result)})


        },


        callbackHandler: function(event){
            if (event.data.command){
                this.trigger(event.data.command+':'+event.data.status, event)
                console.log('triggered',(event.data.command+':'+event.data.status))
                console.log('From worker',event.data)
            }else{
                console.log('From worker',event.data)
            }
        }
    })
})
