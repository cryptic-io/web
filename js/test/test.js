//returns the test model
define(["test/data","models/Chunk", "models/Manifest","models/ChunkWorkerInterface"], function(unEncryptedData,Chunk, Manifest, ChunkWorkerInterface){ 
    return {

        unEncryptedData: unEncryptedData,

        //preserve the actual length of the data
        dataLength: unEncryptedData.length,

        //the type of the file
        type: 'text/plain',

        //original filename
        name: 'test.txt',
        
        //We need to pad it so it is divisble by 32
        buffer : new ArrayBuffer( ( unEncryptedData.length + (32-(unEncryptedData.length%32) ) ) ) ,

        //This isn't necessary, but provides access to the Chunk model from command line
        Chunk: Chunk,
        
        manifest: new Manifest({ type:'text/plain', name:'test.txt', size:unEncryptedData.length }),

        //read the file from the input
        loadFile: function(){
            stringBuffer = new Uint8Array(this.buffer)
            
            for (charIndex in this.unEncryptedData){
                stringBuffer[charIndex] = this.unEncryptedData.charCodeAt(charIndex);
            }
        },

        parseBuffer: function(buffer){
            if (typeof(buffer) == 'undefined') buffer = this.buffer;

            stringBuffer = new Uint8Array(buffer)
            string = ''

            for (var i = 0; i < stringBuffer.length; i++) {
                string = string.concat(String.fromCharCode(stringBuffer[i]))
            };
            return string

        },

        split: function() {
            var buffer = this.buffer

            var chunkSize = Chunk.prototype.defaults.chunkSize

            if (this['chunks']) return this['chunks'];

            var counter = 0;
            var chunks = [];

            while ( counter < buffer.byteLength ){

                var start = counter;
                counter += chunkSize;
                var end = counter < buffer.byteLength ? counter : buffer.byteLength;

                chunks.push( 
                    //new Chunk({buffer:buffer.slice(start,end)}) 
                    new ChunkWorkerInterface({buffer:buffer.slice(start,end)})
                )

            }

            this.manifest.setChunks(chunks)

            this.chunks = chunks
            return chunks;
        },


        //Returns the linkName for the manifest and the key
        upload: function(callback){
            this.loadFile()
            this.split()
            var chunks = this.chunks;


            var uploadManifest = _.after(chunks.length, _.bind(this.manifest.uploadManifest, this.manifest, callback) )

            for (var i = 0; i < chunks.length; i++) {
                var chunk = chunks[i]
                //lets avoid this to avoid another async hassle
                //chunk.encryptChunk()
                
                //bind the function to this and keep the current index inside to function so it doesn't change when called
                chunk.upload(_.bind(function(index, linkName){
                    //save the response here and an
                    //async way of knowing when all the chunks have been uploaded and saved, we go on to upload the manifest
                    this.manifest.setChunkLinkName(index, linkName, uploadManifest)

                }, this, i))
            };
        },

        download: function(link, passcode, callback) {
            this.manifest.downloadManifest(linkName, passcode, _.bind(function(){
                console.log('we got the manifest!');
                callback();
            },this))
        },
    }
});
