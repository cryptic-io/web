define([],function(){ 

    return Backbone.Model.extend({

        defaults: {
           encryptor: sjcl.mode.betterCBC,
           chunkSize: 1e6 //1 000 000 == 1MB
        },

        initialize:  function(options){
            this.generateKey()

            this.set('buffer',options.buffer);
            this.set('start',options.start)
            this.set('end', options.end)
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
        encodeIVKey: function(key){
            return sjcl.codec.base64.toBits(this.iv.concat(key))
        },

        /* Sets the internal iv and returns the decoded key
         * The first four items belong to the iv
         * The last four is the key
         */
        decodeIVKey: function(encodedKey){
            var ivKey = sjcl.code.base64.fromBits(key);

            this.set('iv',ivKey.slice(0,4))
            this.set('key' , key)

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
            return String.fromCharCode.apply(null, new Uint16Array(this.get('buffer')))
        },

        deserializeChunk: function(str){
            var buf = new ArrayBuffer(str.length*2)
            var bufView = new Uint16Array(buf)

            for (var i = 0; i < str.length; i++) {
                bufView[i] = str.charCodeAt(i)
            };

            this.set('buffer',buf)
        },

        upload: function(){
        }

    })
})

