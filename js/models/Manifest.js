define(["models/Chunk","tools/downloader"],function(Chunk, Downloader){ 
    var debug = true;

    return Backbone.Model.extend({

        defaults: {
            chunkKeyCache : {}
            , lastChunkKeyTimestamp : 0
            , chunkKeyTimeout: 30e3 //timeout in ms
            , maxKeysPerRequest: 20
            , encryptionVersion: "1.0" //This will map to encryption methods, and eventually a different chunks file will support different encryption versions.
            // Older chunks will re encrypt to new format if necessary.
            // 
        /** These are what the manifest object would look like
           name: coolFileBro.txt
           type: 'text/plain'
           encryptionVersion: "1.0"
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

        getChunkLinks : function(){
            var chunks = this.get('chunks')
            , length = _.keys(chunks).length
            , chunkLinks = _.map( _.range(length), function(index){ return chunks[index].linkName })
            return chunkLinks
        },

        setChunkLinkName: function(chunkIndex, linkName, callback){
            var chunks = this.get('chunks');
            chunks[chunkIndex].linkName = linkName
            this.set('chunks',chunks)

            if (callback) callback();
        },

        setChunks: function(chunks, callback){
            var manifestChunks = {}
            //After all the async calls to get the chunk's IVkeys have been executed, lets save the chunks in the manifest
            var saveChunks = _.after(chunks.length, _.bind(function(){
                this.set('chunks',manifestChunks);
                callback();
            },this))
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
            , usernameAndRSA = {}
            if (this.has('userBlob')){
              usernameAndRSA = _.pick(this.get('userBlob'), ["username", "RSAObject"]) 
            }

            manifestChunk = new Chunk(_.defaults({buffer:buffer}, usernameAndRSA))
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
                var manifestChunk = new Chunk({buffer:buffer})

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
                    console.error("Couldn't parse the manifest");
                    return
                }

                if (callback) callback(this)

            },this))
        },

        fetchChunkKeys: function(startingIndex, callback){
            var endIndex = _.min([_.keys(this.get('chunks')).length, this.get('maxKeysPerRequest')+startingIndex])
            , indices = _.range(startingIndex, endIndex)
            , chunks = this.get('chunks')
            , chunkLinkNames = _.map(indices, function(index){
                return chunks[index].linkName
            }, this)

            Downloader.prototype.getFileKeys(chunkLinkNames, _.bind(function(chunkKeys){
                this.set('chunkKeyCache',chunkKeys)
                this.set('lastChunkKeyTimestamp',+(new Date()))

                callback(chunkKeys[chunks[startingIndex].linkName])
            },this))

        },

        // This will transperantly handle fetching the chunk keys from the server
        // It will make a request and remember the request time
        // If a chunkKey is requested withouth being in the cached array, another request will be made
        fetchChunkKey: function(chunkIndex, callback){
            //check the timeout
            if ( this.get('chunkKeyTimeout') < ( +(new Date()) - this.get('lastChunkKeyTimestamp') ) ){
                this.fetchChunkKeys(chunkIndex, callback)
                return
            }

            var chunkLinkName = this.get('chunks')[chunkIndex].linkName

            if ( _.isUndefined(this.get('chunkKeyCache')[chunkLinkName]) ){
                this.fetchChunkKeys(chunkIndex, callback)
                return
            }else{
                callback(this.get('chunkKeyCache')[chunkLinkName])
                return
            }
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

