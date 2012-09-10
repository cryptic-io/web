define(['tools/uploader'],function(Uploader){ 

    return Backbone.Model.extend({

        defaults: {
           encryptor: sjcl.mode.betterCBC,
           chunkSize: 1e6 //1 000 000 == 1MB
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
            var ivKey = sjcl.code.base64.toBits(key);

            this.set('iv',ivKey.slice(0,4))
            this.set('key' , ivKey.slice(4))

            return ivKey.slice(4);
        },

        encryptChunk:function(){
            e = sjcl.mode.betterCBC.encryptChunk( {
                buffer: this.get('buffer')
                , iv: this.get('iv')
                , key: this.get('key')
            })
            this.set('buffer', e.buffer)

            return e

        },

        decryptChunk:function(){
            d = sjcl.mode.betterCBC.decryptChunk( {
                buffer: this.get('buffer')
                , iv: this.get('iv')
                , key: this.get('key')
            })

            this.set('buffer', d.buffer)

            return d

        },

        serializeChunk: function(){
            //Converts the array buffer into a string, where each char is = to two bytes
            string = ''
            stringBuffer = new Uint16Array(this.get('buffer'))
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
        },

        //The callback will contain the linkName
        upload: function(callback){
            var location = 'api/uploadFile'
            var linkName = Math.random().toString(36).substring(2);
            var chunkData = this.serializeChunk()

            Uploader.prototype.send(location, chunkData, linkName, function(response){
                result = JSON.parse(response)
                result = result['return'];
                callback(result.linkName)
            })
        }

    })
})

