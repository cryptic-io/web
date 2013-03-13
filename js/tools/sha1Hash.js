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
    , hi_length_bits = '0x'+originalMessageLengthHex.substring(4,12)
    , lo_length_bits = '0x'+originalMessageLengthHex.substring(12)+"0000"


    var messageLength = new Uint32Array(2)

    messageLength[0]=parseInt(hi_length_bits)
    messageLength[1]=parseInt(lo_length_bits)

    //bring it back with a one right bit shift
    
    //first lets do the bottom part
    messageLength[1]>>=1
    messageLength[1] = messageLength[1] | ((messageLength[0] & 0x1)<<31) // carry over the lsb of the high bits
    // now we can do the hi bits
    messageLength[0]>>=1


    var message = new Uint32Array(arraybuffer)

    var paddedBuffer = new ArrayBuffer(byteLength+padding+messageLength.byteLength)

    //represent the padded message as 32 bit numbers, we are still sharing the data from the origin padded message
    var paddedMessage32bit = new Uint32Array(paddedBuffer)

    //set the end message bytes
    paddedMessage32bit[paddedMessage32bit.length-1] = messageLength[1]
    paddedMessage32bit[paddedMessage32bit.length-2] = messageLength[0]

    //copy the original message part
    for (var index=0;index<message.length;index++){
        paddedMessage32bit[index] = message[index]
    }

    //add the end message byte
    paddedMessage32bit[arraybuffer.byteLength] = 0x80000000

    //The rest are will automatically be zeros so we don't need to explicitly create the padding

    //We will define the end message bytes later


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

var hashBenchmark = function(){
  var startTime = new Date()
  , i=1e4
  , a = new Uint8Array(1000)

  while(i != 0){
    i--;
    sha1Hash(a)
  }
  var endTime = new Date()  

  console.log("It took",(endTime-startTime)/1e3, "seconds")
}


define(function(){return sha1Hash});
