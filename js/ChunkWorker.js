importScripts('./require.js','./core/underscore.js','./core/backbone.js','./crypt/sjcl.js','./crypt/betterCBC.js')


require({
    baseUrl:'./'
    }
    , [
        'require'
        , 'models/Chunk'
      ]
    , function(require, Chunk){

        chunkHandle = {}


        var command = {
            initializeChunk: function(args){
                var entropy = args.entropy;
                sjcl.random.addEntropy(entropy,256)
                this.chunk = new Chunk({buffer:args.arrayBuffer}) 
                this.postMessage({
                    command:"initializeChunk",
                    status:"success"
                })
            },

            newEmptyChunk: function(){
                var entropy = args.entropy;
                sjcl.random.addEntropy(entropy,256)

                this.chunk = new Chunk() 
                this.postMessage({
                    command:"newEmptyChunk"
                    , status:"success"
                })
            },

            upload: function(){
                //the callback returns the linkName
                this.chunk.upload(function(linkName){
                    this.postMessage({
                        command:"upload",
                        status:"success",
                        result:linkName
                    })
                })
            },

            download: function(args){
                this.chunk.set({'linkName':args.linkName, 'linkKey':args.linkKey})
                this.chunk.decodeIVKey(args.IVKey)

                this.chunk.download(function(decryptedBuffer){
                    this.postMessage({
                        command:"download"
                        , status:"success"
                        , result:decryptedBuffer
                    })
                })
            },

            encryptChunk:function(){
                this.chunk.encryptChunk()
                this.postMessage({
                    command:"encryptChunk",
                    status:"success"
                })
            },

            decryptChunk: function(){
                var buffer = this.chunk.decrypt().buffer

                this.postMessage({
                    command:"decryptChunk",
                    status:"success",
                    result:serializedBuffer
                })
            },

            encodeIVKey: function(){
                var ivKey = this.chunk.encodeIVKey()

                this.postMessage({
                    command:"encodeIVKey",
                    status:"success",
                    result:ivKey
                })

            },

            writeToFile: function(args){
                this.chunk.set('chunkInfo',args.chunkInfo)
                this.chunk.writeToFile(args.fileSystem, args.manifest
                   //successCallback
                   , _.bind(function(){
                        this.postMessage({
                            command:"writeToFile"
                            , status: "success"
                        })
                   },this)
                   //failureCallback
                   , _.bind(function(){
                        this.postMessage({
                            command:"writeToFile"
                            , status: "error" })
                   },this)
              )
            },

            //setup a callback to be called when the progress changes
            attachProgressListener: function(){
                this.chunk.attachProgressListener(_.bind(function(progress){
                    this.postMessage({
                        command:"attachProgressListener",
                        status:"success",
                        result:progress
                    })
                }, this))
            }

        }


        self.onmessage = function(event) {
            self.postMessage('Hello World!')

            //route the commands appropriately
            if (event.data.command){
                command[event.data.command].apply(this, [ event.data ])
            }
        }

    

    }
);


