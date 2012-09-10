define(["models/Chunk"],function(Chunk){ 

    return Backbone.Model.extend({

        defaults: {
        /** These are what the manifest object would look like
           filename: coolFileBro.txt
           type: 'test/plain'
           size: 1e6 //1 MB
           linkName: 'jeJDxkie'
           chunks: [
             {
               linkName : 'ejxiiEx',
               IVkey : 'AEcjdejcde',
             }
           ...
           ]
        */

        },

        setChunkLinkName: function(chunkIndex, linkName){
            var chunks = this.get('chunks');
            chunks[chunkIndex].linkName = linkName
            this.set('chunks',chunks)
        },

        setChunks: function(chunks){
            var manifestChunks = []
            for (var i = 0; i < chunks.length; i++) {
                var chunk = {
                    linkName : '',
                    IVKey: chunks[i].encodeIVKey()
                }
                manifestChunks.push(chunk)
            };
            this.set('chunks',manifestChunks)
        },

        uploadManifest: function(callback){
            var buffer = this.bufferManifest()
            manifestChunk = new Chunk({buffer:buffer})
            debugger;
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

