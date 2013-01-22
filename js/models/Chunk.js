//Define the chunk model
define(['tools/uploader','tools/downloader','tools/FileSystemHandler', 'models/FileSystem', 'apiEndPoints'],function(Uploader, Downloader, FileSystemHandler, FileSystem, api){ 

    return Backbone.Model.extend({

        defaults: {
            //This chunk uses the 1.0 version of enryption, future chunks may have different versions
            encryptionVersion: "1.0",

           chunkSize: 10e6  //Specify how big the chunk should be. ******  THIS HAS TO BE DIVISBLE BY 16 ****** (the reason so that we only need pad the last chunk)
           //chunksize is 10MB
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

                //save the buffer
                this.set('buffer',buffer)
                callback()

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

        initialize:  function(options){
            this.generateKey()
        },


        // Generate the initial keys
        generateKey: function(){
            if ( !this.has('iv') || !this.has('key')){
                this.set('iv',sjcl.random.randomWords(4));
                this.set('key',sjcl.random.randomWords(4));
            }
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

        /* Sets the internal iv and returns the decoded key
         * The first four items belong to the iv
         * The last four is the key
         */
        decodeIVKey: function(encodedKey){
            var ivKey = sjcl.codec.base64url.toBits(encodedKey);

            this.set('iv',ivKey.slice(0,4))
            this.set('key' , ivKey.slice(4))

            return ivKey.slice(4);
        },

        encryptChunk:function(){
            if (this.has('progressListener')) this.get('progressListener')({event:'Encrypting',progress:0})

            var e = sjcl.mode.betterCBC.encryptChunk( {
                buffer: this.get('buffer')
                , iv: this.get('iv')
                , key: this.get('key')
            })
            this.set('buffer', e.buffer)

            if (this.has('progressListener')) this.get('progressListener')({event:'Encrypting',progress:100})

            return e

        },

        decryptChunk:function(){
            if (this.has('progressListener')) this.get('progressListener')({event:'Decrypting',progress:0})

            var d = sjcl.mode.betterCBC.decryptChunk( {
                buffer: this.get('buffer')
                , iv: this.get('iv')
                , key: this.get('key')
            })

            this.set('buffer', d.buffer)

            if (this.has('progressListener')) this.get('progressListener')({event:'Decrypting',progress:100})

            return d

        },

        serializeChunk: function(buffer){
            //Converts the array buffer into a string, where each char is = to two bytes
            string = ''
            stringBuffer = new Uint16Array(buffer)
            for (var i = 0; i < stringBuffer.length; i++) {
                string += String.fromCharCode( stringBuffer[i] )
            };
            return string
        },

        deserializeChunk: function(str){
            var buf = new ArrayBuffer(str.length*2)
            var bufView = new Uint16Array(buf)

            for (var i = 0; i < str.length; i++) {
                bufView[i] = str.charCodeAt(i)
            };

            this.set('buffer',buf)
            return buf;
        },

        //The callback will contain the linkName
        upload: function(callback){

            // We need to check to see if we even have the buffer that we need to upload
            // If we don't have it we need to get it and comeback to this funciton
            if ( !this.has('buffer')){
                debugger;
                this.getBufferFromState(_.bind(this.upload,this,callback))
                return
            }

            var location = api.uploadFile
            var linkName = Math.random().toString(36).substring(2);
            var chunkData = this.serializeChunk(this.get('buffer'))

            var uploader = new Uploader();

            this.encryptChunk();

            uploader.send(location, this.get('buffer'), linkName, this.get('progressListener'), function(response){
                result = JSON.parse(response)
                callback(result.return)
            })
        },

        //callback will return the binary data 
        download: function(callback){
            if ( !this.has('linkName') || !this.has('linkKey') )
            {
                //console.error('link name or link key is not set');
            }

            Downloader.prototype.downloadFile(
                this.get('linkName'),
                this.get('linkKey'), 
                this.get('progressListener'), 
                _.bind(function(arraybuffer){
                    this.set('buffer',arraybuffer)
                    //we are also going to decrypt here to save another worker message
                    var decryptedBuffer = this.decryptChunk().buffer
                    //passing the data back just to test
                    if (callback) callback(decryptedBuffer)
                },this)
            )
        },

        writeToFile: function(fileSystem, manifest, callback, errCallback){
            var buffer = this.get('buffer')
            var chunkCount = _.keys(manifest.chunks).length -1 //zero indexed
            //if this is the last chunk only write the amount needed to the file
            if ( this.get('chunkInfo').part == chunkCount){
                var lastChunkSize =  manifest.size - (chunkCount*this.get('chunkSize'))

                buffer = buffer.slice(0, lastChunkSize)
            }


            //specify where in the file this chunk starts
            var start = this.get('chunkInfo').part*this.get('chunkSize')

            var fileSystem = new FileSystem()
            FileSystemHandler.appendToFile(
                { 
                  successCallback: callback
                  , errorCallback: errCallback
                  , name: manifest.name
                  , fileSystem: fileSystem
                  , data: buffer
                  , type: manifest.type
                  , size: manifest.size
                  , start: start
                }
            )

        },

        readData: function(){
            var stringBufferView = new Uint8Array(this.get('buffer'))
            var data = String.fromCharCode.apply(this,stringBufferView)

            return data;
        },

        hexDump: function(){
            var stringBufferView = new Uint16Array(this.get('buffer'))
            var string = ''

            for (var i = 0; i < stringBufferView.length; i+=1) {
                if (i%16 == 0) string += ('\n'+(i).toString(16)+'\t')
                string += ( stringBufferView[i].toString(16) + ' ')
            }
            console.log(string.toUpperCase())

        },

        attachProgressListener: function(callback){
            this.set('progressListener',callback)
        },

    })
})

