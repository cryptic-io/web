//returns the file model
define(['tools/uploader'],function(Uploader){ 
    return Backbone.Model.extend({

        defaults:{
            /**
             * Stuff that will be instatiated on creation
             *
             * file: File obj
             * reader: FileReader obj
             *
            */

           chunkSize : 1e5 // 100 Kbytes
           , uploadURL: 'api/uploadFile'
           , manifest: {
               fileName:''
               , chunks:[] //array of objects containing the chunkNumber and chunk location
               , chunkSize:0
               , secretKey:''
               , "content-type":''
               , fileSize:''

           }
           , uploader: (new Uploader())

        },

        initialize: function(){
            this.set('reader',new FileReader());

            var file = this.get('file');

            this.on('keyReady', this.syncManifest, this)

            this.generateKey()

            this.set('privateManifest', {
                type: file.type,
                size: file.size
            });


            //Unfortunately somethings have vendor prefixes so we'll get that sorted right here and now
            File.prototype.slice = File.prototype.webkitSlice ? File.prototype.webkitSlice : File.prototype.mozSlice;
        },

        //splits the file into several chunks of size specified by the argument ( in bytes )
        //returns an array of objects in the form of 
        // chunk = [
        //   { start: 0, end: 1024 }
        //   { start: 1025, end: 2048 }
        //   ...
        //]
        split: function() {
            var file = this.get('file');
            var chunkSize = this.get("chunkSize")

            var counter = 0;
            var chunks = [];
            while ( counter < file.size ){
                var chunk = {};

                chunk.start = counter;
                counter += chunkSize;
                chunk.end = counter < file.size ? counter : file.size;

                chunks.push(chunk);
            }

            this.set('chunks',chunks)
            return chunks;
        },

        //This will get the binary string from a specified chunknumber from the file
        getBinaryChunk: function(chunkNumber,callback){
            var chunks = this.get('chunks');
            var chunk = chunks[chunkNumber];

            var reader = this.get('reader');
            var file = this.get('file');

            reader.onloadend = _.bind(function(event){
                //check if we are done reading the file
                if (event.target.readyState == FileReader.DONE){
                    callback(event.target.result) //call the callback with the binary data
                }

            }, this)

            //get the right chunk
            var blob = file.slice(chunk.start, chunk.end);

            //lets start reading
            reader.readAsBinaryString(blob)
        },

        //returns the whole binary string through a callback that should accept a parameter for the binary string data
        getBinary: function(callback){
            var reader = this.get('reader');
            var file = this.get('file');

            reader.onloadend = _.bind(function(event){
                //check if we are done reading the file
                if (event.target.readyState == FileReader.DONE){
                    callback(event.target.result) //call the callback with the binary data
                }

            }, this)

            //lets start reading
            reader.readAsBinaryString(file)
        },

        //read the whole file and return the data url. This should be a useful feature for allowing media to be played on the site
        getDataURL: function(callback){
            var reader = this.get('reader');
            var file = this.get('file');

            reader.onloadend = _.bind(function(event){
                //check if we are done reading the file
                if (event.target.readyState == FileReader.DONE){
                    callback(event.target.result) //call the callback with the binary data
                    
                }

            }, this)

            //lets start reading
            reader.readAsDataURL(file);
        },

        logChunkInManifest: function(chunkNumber, chunkFileName){
            var manifest = this.get('manifest');
            manifest.chunks.push({chunkNumber:chunkNumber,chunkFileName:chunkFileName});
        },

        syncManifest: function(){
            var file = this.get('file');
            var manifest = this.get('manifest');

            manifest.fileName = file.name;
            manifest.fileSize = file.size;
            manifest.contentType = file.type;
            manifest.chunkSize = this.get('chunkSize');
            manifest.secretKey = this.getKey();

            this.set('manifest',manifest);

            console.log('key is ready, and manifest is synced');

        },

        //Generates the encryption key, returns false if not ready
        generateKey: function(){
            if (this.has('key')) return true;
            if (sjcl.random.isReady()){
                this.set("key",sjcl.random.randomWords(4));

                console.log('triggering keyReady')
                this.trigger('keyReady');
                return true;
            }
            setTimeout(this.generateKey, 1e3) 
        },

        //Returns a base 64 representation of the key
        getKey: function() {
            var key = this.get('key');

            return sjcl.codec.base64.fromBits(key)
        },

        //interpretes a base 64 representation of the key
        setKey: function(key){
            this.set('key', sjcl.codec.base64.toBits(key))
        },

        //Decrypts given binary
        decryptBinary: function(encryptedData){
            return sjcl.decrypt(this.get('key'), encryptedData)
        },

        //encrypt given binary
        encryptBinary: function(binaryString){
            if (this.has('key')){
                return sjcl.encrypt(this.get('key'), binaryString)
            }

            console.error('no encryption key set');
        },

        encryptBinaryChunk: function(chunkNumber, callback){
            if (chunkNumber > this.get('chunks').length){
                return "Error, chunk number out of range";
            }
            var encryptedData = '';

            this.getBinaryChunk(chunkNumber, _.bind(function(data){
                debugger;
                encryptedData = this.encryptBinary(data);
                callback(encryptedData);
            },this) )
        },

        uploadBinary: function(binaryData, fileName, callback){
            var uploader = this.get('uploader');
            uploader.send(this.get('uploadURL'), binaryData, fileName, callback)
        },

        getRandomFileName: function(){
            return sjcl.codec.base64.fromBits(sjcl.random.randomWords(8));
        },

        /* 
         *  This high level function 
         *
         *  splits the file into manageable chunks,
         *  encrypts the chunks,
         *  uploads the encrypted chunks and stores the chunk locations 
         *  and chunk info in the private manifest
         *  
         *
         */

        upload: function(){
            var chunks = this.split();
            var manifest = this.get('manifest');

            var complete = _.after(chunks.length, _.bind( this.trigger, this, 'uploadComplete') )  //async event trigger to be executed when all the chunks have been uploaded


            _.each(chunks, function(chunk, chunkNumber){

                this.encryptBinaryChunk(chunkNumber, _.bind(function(encryptedData){

                    //create a random file name for the chunk to live under
                    var randomFileName = this.getRandomFileName();

                    this.uploadBinary(encryptedData,randomFileName,_.bind(function(response){
                        //Check to see if the response is successful
                        response = JSON.parse(response);
                        if (response.return == "success"){
                        
                            //log the chunk in the manifest
                            this.logChunkInManifest(chunkNumber, randomFileName);

                        }else{
                            console.error("error in uploading file", response);
                        }

                        //done with this chain

                    },this))

                },this))

            }, this)
        }


    })
});


