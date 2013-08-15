define(["models/Chunk", "text!tests/testfile1.data", "text!tests/testfile2.data"],function(Chunk, testfile1, testfile2){
  var originalFileLength = testfile1.length

  var stringToArray = function(str){
    var text = new Uint8Array(str.length)

    for ( i=0; i < str.length; i++){
      text[i] = str.charCodeAt(i)
    }
    return text
  }

  text = stringToArray(testfile1)

  text2 = stringToArray(testfile2)

  //imitate a file obj
  //We use file objs for performance reasons so we don't have to convert a whole file into something else before it's usable
  //unfortunately, we can't instatiate our own file obj. So we are implementing our own
  var file = {
    getArrayBufferChunk: function(start, end, callback){
      callback(text.buffer)
    }
  }

  
  chunk = new Chunk()

  describe("Test the Chunk model:", function(){
    it("Saves the state of where the buffer is in the filemodel", function(){
      var padding = originalFileLength%16 !== 0
      chunk.saveBufferInfo(file, 0, originalFileLength, padding)

      expect(
        chunk.get('bufferInfo'))
      .toEqual(
        [file, 0, originalFileLength, padding])
    })

    it("Correctly gets the buffer from the saved state", function(){
      chunk.getBufferFromState(function(){
        // greater than or equal too, because padding can make the byteLength a bit bigger
        expect(chunk.get('buffer').byteLength >= text.buffer.byteLength)
      })
    }) 

    it("Encrypts the Chunk", function(){
      chunk.encryptChunk()
      encryptedBuffer = chunk.get('buffer')

      //The encrypted version shouldn't be === to zero because first it's uint, so no negs, and 0's are the plaintext
      var e = new Uint8Array(encryptedBuffer)
      expect(_.reduce(e,function(a,b){return a+b})).not.toEqual(0)
    })

    it("Decrypts the Chunk", function(){
      chunk.decryptChunk()
      decryptedBuffer = chunk.get('buffer')
      var d = new Uint8Array(decryptedBuffer)

      //the testfile is full of zero's so this should only be zero
      expect(_.reduce(d,function(a,b){return a+b})).toEqual(0)
    })

    // Run some Benchmarks

    it("Benchmarked encryption/decryption n times on a 1 MB file. Check the console for more detail: ", function(){

      var startTime = +(new Date());
          iterations = 10
      for(var i=0;i<iterations;i++){
        chunk.encryptChunk()
        chunk.decryptChunk()
      }

      var endTime = +(new Date())
      ,   delta   = endTime - startTime

      console.group("%cBenchmark encryption/decryption of a 1MB file:", "color:green;")
      console.log("Benchmark total:",delta,"ms")
      console.log("Iterations:",iterations)
      console.log("Average encrypt/decrypt operation:",delta/(iterations*2),"ms")
    })
    
  })
})
