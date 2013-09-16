//Define the chunk model
define(['tools/uploader','tools/downloader','tools/FileSystemHandler', 'models/FileSystem', 'models/RSA', 'apiEndPoints', 'tools/sha1Hash'],function(Uploader, Downloader, FileSystemHandler, FileSystem, RSAModel, api, sha1Hash){ 
    if (typeof(console) === "undefined") {
      //in case we are in a web worker
      console = {
        log : function(){}
        , error : function(){}
        , warn : function(){}
      }
    }

    return Backbone.Model.extend({

        defaults: {
            //This chunk uses the 1.0 version of enryption, future chunks may have different versions
           encryptionVersion: "1.0",

           chunkSize: 4194304,  //Specify how big the chunk should be. ******  THIS HAS TO BE DIVISBLE BY 16 ****** (the reason so that we only need pad the last chunk)
           //chunksize is 4MB
           
           //required params to be passed in
           /*
            * This is needed so that the chunks can upload their own data
            * but in order to do that they need to sign for it, and then the server needs to verify the signature with their username+stored public_key
           username: "anon",
           RSAObject : {"pub_key":...} 
           */
        },


        //gets the buffer from the file model, along with a start, and end position, and if padding is required
        getBuffer: function(fileModel, start, end, padding, callback){
            fileModel.getArrayBufferChunk(start, end, _.bind(function(buffer){

                if (padding){
                    var leftover = (end - start)%(16)
                    var paddedSize  = (16 - leftover) + (end - start)
                    var copierDest = new Uint8Array(paddedSize)
                    var copierSource = new Uint8Array(buffer)
                    _.each(copierSource, function(byte, index){ copierDest[index] = byte })
                    buffer = copierDest.buffer;
                }

                //save the buffer
                this.set('buffer',buffer)
                callback(buffer)

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

            //create the RSA model if we have the necessary info
            if (this.has('RSAObject')){
              var rsa = new RSAModel()
              rsa.setRSAObject(this.get('RSAObject'))
              this.set('rsa',rsa)
            }

            //generate initial set of keys, this doesn't take long but it's nice to know we have them
            this.generateKey()
        },


        // Generate the initial keys
        generateKey: function(){
            if ( !this.has('iv') || !this.has('key')){
                this.set('iv',sjcl.random.randomWords(2));
                this.set('key',sjcl.random.randomWords(8));
            }
        },

        /*
         * Encodes the key along with the iv
         * The first for items in the array are the iv
         *
         * The reason it looks async is that this method is also used by the webworker so it needs to appear async on both implementations
         */
        encodeIVKey: function(callback){
            var ivKey = sjcl.codec.base64url.fromBits(this.get('iv').concat(this.get('key')))
            if (callback) callback(ivKey)
            return ivKey
        },

        /* Sets the internal iv and returns the decoded key
         * The first 2 items belong to the iv
         * The last 8 is the key
         */
        decodeIVKey: function(encodedKey){
            var ivKey = sjcl.codec.base64url.toBits(encodedKey);

            this.set('iv',ivKey.slice(0,2))
            this.set('key' , ivKey.slice(2))

            return ivKey.slice(2);
        },

        encryptChunk:function(){
            if (this.has('progressListener')) this.get('progressListener')({event:'Encrypting',progress:0})
            
            var prf = new sjcl.cipher.aes(this.get('key'))

            var e = sjcl.arrayBuffer.ccm.encrypt( 
              prf,
              this.get('buffer'),
              this.get('iv')
            )

            this.set('buffer', e.ciphertext_buffer)
            this.set('tag',e.tag)

            this.set('encrypted', true)

            if (this.has('progressListener')) this.get('progressListener')({event:'Encrypting',progress:100})

        },

        encryptStr: function(str){
            //authenticated encryption
            var e = sjcl.encrypt(this.get('key'), str)
            return e
        },

        decryptStr: function(str){
            var d = sjcl.decrypt(this.get('key'), str)
            return d
        },

        decryptChunk:function(){
            if (this.has('progressListener')) this.get('progressListener')({event:'Decrypting',progress:0})
              
            var prf = new sjcl.cipher.aes(this.get('key'))

            var d = sjcl.arrayBuffer.ccm.decrypt( 
              prf,
              this.get('buffer'),
              this.get('iv'),
              this.get('tag')
            )

            this.set('buffer', d)

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
        upload: function(callback, errorCallback){

            // We need to check to see if we even have the buffer that we need to upload
            // If we don't have it we need to get it and comeback to this funciton
            if ( !this.has('buffer')){
                this.getBufferFromState(_.bind(this.upload,this,callback, errorCallback))
                return
            }

            var location = api.uploadFile
            var linkName = Math.random().toString(36).substring(2);
            var chunkData = this.serializeChunk(this.get('buffer'))

            var uploader = new Uploader();

            //check if we have already encrypted the chunk
            if (!this.get("encrypted")){
              this.encryptChunk();
            }

            //this is going to be a signed user upload as opposed to an anonymous upload
            //The username is required for chunks that are signed so the server can verify the sig
            //As well as the hash of the chunk
            //As well as the Signed hash of the chunk 
            if (this.has('rsa') ) {
              var rsa = this.get('rsa')
              , username = this.get('username')
              , hash = sha1Hash(this.get('buffer'))
              , sig = rsa.signMessage(hash)

              uploader.send(location, this.get('buffer'), linkName, this.get('progressListener'), function(response){
                  result = JSON.parse(response)
                  callback(result.return)
              }, {
                username : username
                , hash : hash 
                , signature: sig
              }, errorCallback)
            }else{
              var hash = sha1Hash(this.get('buffer'))
              uploader.send(api.anonUploadFile, this.get('buffer'), linkName, this.get('progressListener'), function(response){
                  result = JSON.parse(response)
                  callback(result.return)
              }, {
                username : username
                , hash : hash 
                , signature: sig
              }, errorCallback)
            }
        },

        //callback will return the binary data 
        download: function(callback){
            if ( !this.has('linkName') || !this.has('linkKeyObj') )
            {
                console.error('link name or link key is not set');
            }

            Downloader.prototype.downloadFile(
                this.get('linkName'),
                this.get('linkKeyObj'), 
                this.get('progressListener'), 
                _.bind(function(arraybuffer){
                    this.set('buffer',arraybuffer)
                    //we are also going to decrypt here to save another worker message
                    this.decryptChunk()
                    //passing the data back just to test
                    if (callback) callback(this.get('buffer'))
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

