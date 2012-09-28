define(["models/Chunk"],function(Chunk){ 

    return Backbone.Model.extend({

        defaults: {
        /** These are what the manifest object would look like
           filename: coolFileBro.txt
           type: 'test/plain'
           size: 1e6 //1 MB
           linkName: 'jeJDxkie'
           chunks: {
             2:{
               linkName : 'ejxiiEx',
               IVkey : 'AEcjdejcde',
               part: 2
             }
           ...
           }
        */

        },

        setChunkLinkName: function(chunkIndex, linkName, callback){
            if (this.get('manifestLock')) {
                setTimeout(_.bind(this.setChunkLinkName,this,chunkIndex,linkName), 1e3);
                console.log("Manifest isn't ready yet")
                return;
            }
            var chunks = this.get('chunks');
            chunks[chunkIndex].linkName = linkName
            this.set('chunks',chunks)

            if (callback) callback();
        },

        setChunks: function(chunks){
            var manifestChunks = {}
            //prevent anything from being uploaded while the manifest has this locked
            this.set('manifestLock',true)
            //After all the async calls to get the chunk's IVkeys have been executed, lets save the chunks in the manifest
            var saveChunks = _.after(chunks.length, _.bind(function(){this.set('chunks',manifestChunks); this.set('manifestLock',false)},this))
            for (var i = 0; i < chunks.length; i++) {
                chunks[i].encodeIVKey(_.bind(
                    function(i,ivKey){
                        var chunk = {
                            linkName : ''
                            , IVKey: ivKey
                            , part: i
                        }
                        manifestChunks[i]= chunk
                        saveChunks()
                },this,i))
            };
            //this.set('chunks',manifestChunks)
        },

        //The Callback will be supplied with an object containing linkName and IVKey
        uploadManifest: function(callback){
            var buffer = this.bufferManifest()
            manifestChunk = new Chunk({buffer:buffer})
            manifestChunk.encryptChunk();
            var IVKey = manifestChunk.encodeIVKey()
            this.set('IVKey', IVKey)
            manifestChunk.upload(
                function(linkName){
                    callback({
                        linkName: linkName,
                        IVKey: IVKey
                    })
                }
            );
        },

        bufferManifest: function(){
            var manifestData = JSON.stringify(this.toJSON())

            //padding for encryption
            buffer = new ArrayBuffer(manifestData.length+32-manifestData.length%32)

            var stringBuffer = new Uint8Array(buffer)
            
            for (charIndex in this.unEncryptedData){
                stringBuffer[charIndex] = manifestData.charCodeAt(charIndex);
            }

            return buffer
        },

        initialize:  function(){
        },
    })
})

