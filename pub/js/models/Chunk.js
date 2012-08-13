define([],function(){ 

    return Backbone.Model.extend({
        defaults: {
           encryptor: sjcl.mode.betterCBC
        },

        /* The constructor values 
         * are two arrays with 4 random values
         */
        initialize:  function(iv, key, chunkNumber, chunkBlob){
            this.set('iv',iv);
            this.set('key',key);
            this.set('chunkNumber',chunkNumber);
            this.set('blob',blob)
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

            this.iv = ivKey.slice(0,4);
            this.key = key
            return ivKey.slice(4);
        },

        encryptChunk:function(callback){
            this.getArrayBuffer( _.bind( function(buffer){
                callback(this.encryptBuffer(buffer))
            },this))
        },


        /*
         * Returns the encrypted string of an ArrayBuffer
         */
        encryptBuffer:function(buffer){
            var encryptedInt32 = sjcl.mode.betterCBC.encryptChunk(key,buffer);
            return sjcl.codec.base64.fromBits(encryptedInt32)
        },

        getArrayBuffer:function(callback){
            var chunks = this.get('chunks');
            var chunk = chunks[chunkNumber];

            var reader = new FileReader();
            var file = this.get('file');

            reader.onloadend = _.bind(function(event){
                //check if we are done reading the file
                if (event.target.readyState == FileReader.DONE){
                    callback(event.target.result) //call the callback with the binary data
                }

            }, this)

            //lets start reading
            reader.readAsArrayBuffer(blob)
        },

    })
})

