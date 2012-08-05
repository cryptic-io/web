//returns the file model
define(function(){ 
    return Backbone.Model.extend({

        defaults:{
            /**
             * Stuff that will be instatiated on creation
             *
             * file: File obj
             * reader: FileReader obj
             *
            */
        },

        initialize: function(){
            this.set('reader',new FileReader());

            var file = this.get('file');

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
        split: function(chunkSize) {
            var file = this.get('file');

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
            this.set('chunkSize',chunkSize)
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

        //returns a public manifest file that only has the file chunksize and the number of chunks
        getPublicManifest: function(){
            return {
                chunkSize: this.get('chunkSize'),
                chunkNumber: this.get('chunks').length,
            }
        },

        //returns a private manifest file that has a description and title 
        getPrivateManifest: function(){
        },

        //Generates the encryption key, returns false if not ready
        generateKey: function(){
            if (sjcl.random.isReady()){
                this.set("key",sjcl.random.randomWords(4));
                return true;
            }
            return false
        },

        //Decrypts given binary
        decryptBinary: function(encryptedData){
            return sjcl.decrypt(this.get('key'), encryptedData)
        },

        //encrypt given binary
        encryptBinary: function(binary){
            if (this.has('key')){
                return sjcl.encrypt(this.get('key'), binary)
            }

            console.error('no encryption key set');
        }
    })
});


