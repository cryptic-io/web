//returns the test model
define(["test/data","models/Chunk"], function(unEncryptedData,Chunk){ 
    return {

        unEncryptedData: unEncryptedData,

        //preserve the actual length of the data
        dataLength: unEncryptedData.length,
        
        //We need to pad it so it is divisble by 32
        buffer : new ArrayBuffer( ( unEncryptedData.length + (32-(unEncryptedData.length%32) ) ) ) ,

        //This isn't necessary, but provides access to the Chunk model from command line
        Chunk: Chunk,

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
                var end = counter < buffer.byteLength ? counter : buffer.byteLength;
                chunks.push( new Chunk({buffer:buffer, start:start, end:end}) )

                counter += chunkSize;
            }

            this.chunks = chunks
            return chunks;
        },

    }
});
