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
                var serializedBuffer = args.arrayBuffer;
                var entropy = args.entropy;
                sjcl.random.addEntropy(entropy,256)
                this.chunk = new Chunk() 
                this.chunk.deserializeChunk(serializedBuffer);
                this.postMessage({
                    command:"initializeChunk",
                    status:"success"
                })
            },

            upload: function(){
                //the callback returns the linkName
                this.chunk.encryptChunk()
                this.chunk.upload(function(linkName){
                    this.postMessage({
                        command:"upload",
                        status:"success",
                        result:linkName
                    })
                })
            },

            encryptChunk:function(){
                this.chunk.encrypt()
                this.postMessage({
                    command:"encryptChunk",
                    status:"success"
                })
            },

            decryptChunk: function(){
                var buffer = this.chunk.decrypt().buffer
                var serializedBuffer = Chunk.prototype.serializedBuffer(buffer)

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


