define(["models/Chunk","tools/downloader"],function(Chunk, Downloader){ 
    var debug = true;

    return Backbone.Model.extend({

        defaults: {
        /** These are what the manifest object would look like
           name: coolFileBro.txt
           type: 'text/plain'
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
            var buffer = this.manifestToBuffer()
            manifestChunk = new Chunk({buffer:buffer})
            manifestChunk.encryptChunk();
            if(debug){
                manifestChunk.hexDump()
            }
            var IVKey = manifestChunk.encodeIVKey()
            this.set('IVKey', IVKey)
            var t=this;
            manifestChunk.upload(
                function(linkName){
                    callback({
                        linkName: linkName,
                        IVKey: IVKey
                    })
                    if (debug){
                        console.log('uploaded')
                        console.log(window.location.origin+('#download/'+linkName+'|'+IVKey))
                    }
                }
            );
        },

        downloadManifest: function(linkName, passcode, callback){
            Downloader.prototype.getKeyAndDownload(linkName, _.bind(function(buffer){
                var manifestChunk = new Chunk({buffer:buffer});
                manifestChunk.decodeIVKey(passcode)
                if(debug){
                    console.log('downloaded, dumping hex')
                    manifestChunk.hexDump()
                }

                try{
                    manifestChunk.decryptChunk()
                }catch(err){
                    console.log('decryption failed')
                    return;
                }

                try{
                    this.bufferToManifest(manifestChunk.get('buffer'));
                }catch(error){
                    console.error("couldn't parse text");
                    return
                }

                if (callback) callback(this)

            },this))
        },

        fetchChunkKeys: function(callback){
            var chunks = _.values(this.get('chunks'))
            chunks = _.map(chunks, function(chunk) { return chunk.linkName } )
            Downloader.prototype.getFileKeys(chunks, callback)
        },

        manifestToBuffer: function(){
            var manifestData = JSON.stringify(this.toJSON())

            //padding for encryption
            //
            
            //it has to be divisible by 4 and 32 to be prorperly decrypted/encrypted
            var paddedLength = manifestData.length*2 + ( (16) - (manifestData.length*2)%(16) )
            var buffer = new ArrayBuffer(paddedLength)

            var stringBuffer = new Uint16Array(buffer)

            
            for (charIndex=0; charIndex<paddedLength; charIndex++){
                if (charIndex >= manifestData.length){
                    stringBuffer[charIndex] = 32 // 32 is the space character
                }else{
                    stringBuffer[charIndex] = manifestData.charCodeAt(charIndex);
                }
            }


            return buffer
        },

        bufferToManifest: function(buffer){
            var stringBufferView = new Uint16Array(buffer)
            var manifestJSON = String.fromCharCode.apply(this,stringBufferView)

            console.log(manifestJSON);
            this.set( JSON.parse(manifestJSON) ) 

        },

        initialize:  function(){
        },
    })
})

