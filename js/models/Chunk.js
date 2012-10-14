define(['tools/uploader','tools/downloader','tools/FileSystemHandler'],function(Uploader, Downloader){ 

    return Backbone.Model.extend({

        defaults: {
           encryptor: sjcl.mode.betterCBC,
           chunkSize: 1e6 //1 000 000  == 1MB
        },

        initialize:  function(options){
            this.generateKey()
        },


        // Generate the initial keys
        generateKey: function(){
            this.set('iv',sjcl.random.randomWords(4));
            this.set('key',sjcl.random.randomWords(4));
        },

        /*
         * Encodes the key along with the iv
         * The first for items in the array are the iv
         */
        encodeIVKey: function(){
            return sjcl.codec.base64.fromBits(this.get('iv').concat(this.get('key')))
        },

        /* Sets the internal iv and returns the decoded key
         * The first four items belong to the iv
         * The last four is the key
         */
        decodeIVKey: function(encodedKey){
            var ivKey = sjcl.codec.base64.toBits(encodedKey);

            this.set('iv',ivKey.slice(0,4))
            this.set('key' , ivKey.slice(4))

            return ivKey.slice(4);
        },

        encryptChunk:function(){
            var e = sjcl.mode.betterCBC.encryptChunk( {
                buffer: this.get('buffer')
                , iv: this.get('iv')
                , key: this.get('key')
            })
            this.set('buffer', e.buffer)

            return e

        },

        decryptChunk:function(){
            var d = sjcl.mode.betterCBC.decryptChunk( {
                buffer: this.get('buffer')
                , iv: this.get('iv')
                , key: this.get('key')
            })

            this.set('buffer', d.buffer)

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
            var location = '/api/uploadFile'
            var linkName = Math.random().toString(36).substring(2);
            var chunkData = this.serializeChunk(this.get('buffer'))

            Uploader.prototype.send(location, this.get('buffer'), linkName, function(response){
                result = JSON.parse(response)
                callback(result.return)
            })
        },

        //callback will return the binary data 
        download: function(callback){
            if ( !this.has('linkName') || !this.has('linkKey') )
            {
                console.error('link name or link key is not set');
            }

            Downloader.prototype.downloadFile(
                this.get('linkName'),
                this.get('linkKey'), 
                _.bind(function(arraybuffer){
                    this.set('buffer',arraybuffer)
                    //we are also going to decrypt here to save another worker message
                    this.decryptChunk()
                    //passing the data back just to test
                    if (callback) callback(this.readData())
                },this)
            )
        },

        writeToFile: function(fs, manifest, callback, errCallback){
            FileSystemHandler.appendToFile({
                { 
                  successCallback: callback
                  , errorCallback: errCallback
                  , name: manifest.name
                  , fs: fs
                  , data: this.get('buffer')
                  , type: manifest.type
                }
            })
        },

        readData: function(){
            var stringBufferView = new Uint8Array(this.get('buffer'))
            var data = String.fromCharCode.apply(this,stringBufferView)

            console.log(data);
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

    })
})

