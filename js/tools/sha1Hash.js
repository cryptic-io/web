define(function(){
  var zeroPad = function(howManyZeros){
    return _.reduce(_.range(howManyZeros),function(m){return '0'+m},'')
  }

  sha1Hash =  function(arraybuffer){
      var byteLength = arraybuffer.byteLength

      // The total byte length must be congruent to 56 mod 64
       
      //Increment the byteLength because we are apending the bits 1000 0000 
      ++byteLength

      // Figure out how many bytes of zero we need
      var padding = (64 + (56 - byteLength%64))%64

      var originalMessageLength = arraybuffer.byteLength
      , originalMessageLengthHex = originalMessageLength.toString('16')
      , originalMessageLengthHex = originalMessageLengthHex.length == 16 ? originalMessageLengthHex : zeroPad(16-originalMessageLengthHex.length)+originalMessageLengthHex
      //lets fake shift everything left 4bits
      , hi_length_bits = '0x'+originalMessageLengthHex.substring(1,9)
      , lo_length_bits = '0x'+originalMessageLengthHex.substring(9)+"0"


      var messageLength = new Uint32Array(2)

      messageLength[0]=parseInt(hi_length_bits)
      messageLength[1]=parseInt(lo_length_bits)

      //bring it back with a one right bit shift
      
      //first lets do the bottom part
      messageLength[1]>>=1
      messageLength[1] = messageLength[1] | ((messageLength[0] & 0x1)<<31) // carry over the lsb of the high bits
      // now we can do the hi bits
      messageLength[0]>>=1


      var message = new Uint8Array(arraybuffer)

      var paddedBuffer = new ArrayBuffer(byteLength+padding+messageLength.byteLength)

      //represent the padded message as 32 bit numbers, we are still sharing the data from the origin padded message
      var paddedMessage32bit = new Uint32Array(paddedBuffer)
      ,   paddedMessage8bit = new Uint8Array(paddedBuffer)

      if (message.length == 0){
        paddedMessage8bit[3]=0x80
      }

      //copy the original message part
      for (var index=0;index<message.length;index+=4){
        //since the 8 bit bytes translate to the 32bit array as little endian we need to copy it so (e.g. 8bit [0x1,0x2,0x3,0x4] == 32bit [0x04030201]
        var i = 0
        , max = 4
        if (message.length < 4+index) max=message.length%4;

        //copy the bytes downward
        while( i < max){
          paddedMessage8bit[(3-i) + index] = message[i+index]
          i++
        }

        //we are done here
        if (i+index === message.length){
          // If the message didn't end early we need to put it on the next 32bit chunk at the very front which happens to be i+3 bytes since the order mentioned above
          if (i === 4){
            paddedMessage8bit[3+i + index]=0x80
          }else{
            // if it did end early we can just tak it on
            paddedMessage8bit[(3-i) + index]=0x80
          }
        }
      }


      //The rest are will automatically be zeros so we don't need to explicitly create the padding

      //set the end message bytes
      paddedMessage32bit[paddedMessage32bit.length-1] = messageLength[1]
      paddedMessage32bit[paddedMessage32bit.length-2] = messageLength[0]


      var leftRotate32BitWordNtimes = function(word, times){
          return (word<<times) | (word>>>32-times)
      }

      var h = new Uint32Array([0x67452301,0xefcdab89,0x98badcfe,0x10325476,0xc3d2e1f0])

      var hashTerms = new Uint32Array(7)  //a, b, c, d, e, f, temp
      , K = new Uint32Array([0x5A827999,0x6ED9EBA1,0x8F1BBCDC,0xCA62C1D6])


      //Create the array for the words
      var words = new Uint32Array(80)

      //get the range of chunks, at 16 step intervals because 32bits*16=512bits which is the chunksize we need
      var chunkLocation = 0
      while(chunkLocation<paddedMessage32bit.length){

          //This is what the chunk would look like
          var chunk = paddedMessage32bit.subarray(chunkLocation,chunkLocation+16)
          chunkLocation+=16;

          for(var i=0;i<16;i++){
              words[i] = chunk[i]
          }

          //Create the rest of the words
          for(var wordIndex=16;wordIndex<80;wordIndex++){
              words[wordIndex] = leftRotate32BitWordNtimes(
                  words[wordIndex-3] ^ words[wordIndex-8] ^ words[wordIndex - 14] ^ words[wordIndex - 16] // xor all the words!
              , 1)
          }



          hashTerms[0] = h[0]
          hashTerms[1] = h[1]
          hashTerms[2] = h[2]
          hashTerms[3] = h[3]
          hashTerms[4] = h[4]

          //BIT TWIDDILING
          //Main Loop

          for(var i=0;i<80;i++){
              if (i < 20){
                  hashTerms[5] = (hashTerms[1] & hashTerms[2]) ^ ((~ hashTerms[1]) & hashTerms[3])
              } else if ( i < 40 ) {
                  hashTerms[5] = hashTerms[1] ^ hashTerms[2] ^ hashTerms[3]
              } else if ( i < 60 ) {
                  hashTerms[5] = (hashTerms[1] & hashTerms[2]) ^ (hashTerms[1] & hashTerms[3]) ^ (hashTerms[2] & hashTerms[3]) 
              } else if ( i < 80 ) {
                  hashTerms[5] = hashTerms[1] ^ hashTerms[2] ^ hashTerms[3]
              }

              hashTerms[6] = leftRotate32BitWordNtimes(hashTerms[0],5) + hashTerms[5] + hashTerms[4] + K[Math.floor(i/20)] + words[i]

              hashTerms[4] = hashTerms[3]
              hashTerms[3] = hashTerms[2]
              hashTerms[2] = leftRotate32BitWordNtimes(hashTerms[1],30)
              hashTerms[1] = hashTerms[0]
              hashTerms[0] = hashTerms[6]


          }



          h[0] += hashTerms[0]
          h[1] += hashTerms[1]
          h[2] += hashTerms[2]
          h[3] += hashTerms[3]
          h[4] += hashTerms[4]
      }

      var digest = _.reduce(h, function(memo, num){
        var hex = num.toString(16)
        return memo+(hex.length == 8 ? hex : zeroPad(8-hex.length) + hex)
      }, '')
      return digest


  }

  //Slightly faster implementation (1/1000 of a second on my machine)
  function sha1_array(input) {
        input = new Uint8Array(input)
        var H = new Uint32Array([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0]),
            m = [],
            l = input.length * 8,
            w = [];
      
        for (var i = 0, b = 0, end = l / 8; i < end; i++, b += 8) {
          m[b >>> 5] |= input[i] << (24 - b % 32);
        }
      
        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >>> 9) << 4) + 15] = l;
      
        for (var i = 0, end = m.length; i < end; i += 16) {
          var a = H[0],
              b = H[1],
              c = H[2],
              d = H[3],
              e = H[4];
      
          for (var j = 0; j < 80; j++) {
            if (j < 16) {
              w[j] = m[i + j];
            } else {
              var n = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
              w[j] = (n << 1) | (n >>> 31);
            }
      
            var t = ((H[0] << 5) | (H[0] >>> 27)) + H[4] + (w[j] >>> 0) + (
            j < 20 ? (H[1] & H[2] | ~H[1] & H[3]) + 0x5a827999 : j < 40 ? (H[1] ^ H[2] ^ H[3]) + 0x6ed9eba1 : j < 60 ? (H[1] & H[2] | H[1] & H[3] | H[2] & H[3]) - 0x70e44324 : (H[1] ^ H[2] ^ H[3]) - 0x359d3e2a);
      
            H[4] = H[3];
            H[3] = H[2];
            H[2] = (H[1] << 30) | (H[1] >>> 2);
            H[1] = H[0];
            H[0] = t;
          }
      
          H[0] += a;
          H[1] += b;
          H[2] += c;
          H[3] += d;
          H[4] += e;
        }
      

        var result = new Uint8Array(H.buffer);
        return _.reduce(_.range(0,20,4), function(digest,part){
          return digest + _.reduce(_.range(0,4).reverse(), function(hexTotal,index){
            var hex = result[part+index].toString(16)
            hex = hex.length == 2 ? hex : zeroPad(2-hex.length) + hex
            return hexTotal+hex
          },'')
        }, '')
      }


  var inputs = [
    (new Uint8Array(1000)).buffer
    , (new Uint8Array(1000))
  ]

  _.forEach(inputs[1], function(b, i){if (i%2==0){ inputs[1][i] = 0x13 } else { inputs[1][i] = 0x37 } })
  inputs[1] = inputs[1].buffer


  var hashBenchmark = function(func,input){
    var startTime = new Date()
    , i=1e4

    while(i != 0){
      i--;
      func(input)
    }
    var endTime = new Date()  

    console.log("It took",(endTime-startTime)/1e3, "seconds")
  }

  benchmarkEverything = function(){
    console.log('my thing')
    hashBenchmark(sha1Hash, inputs[0])
    console.log('other')
    hashBenchmark(sha1_array, inputs[0])
    console.log('my thing')
    hashBenchmark(sha1Hash, inputs[1])
    console.log('other')
    hashBenchmark(sha1_array, inputs[1])
  }

  var errors = []
  testEverything = function(){
    _.forEach(_.range(500), function(){
      var input = new Uint8Array(_.range(_.random(4000)));
      _.forEach(input, function(num, index){
        input[index] = _.random(4096)
      })

      if (sha1_array(input.buffer) === sha1Hash(input.buffer)){
      }else{
        errors.push(input)
        console.log('Error: Functions didnt match output')
      }
    })
    if (errors.length === 0) { console.log("Nice! no errors!") }
  }

  return sha1Hash

})

