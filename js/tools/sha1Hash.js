
sha1Hash =  function(arraybuffer){
    var byteLength = arraybuffer.byteLength

    // The total byte length must be congruent to 56 mod 64
     
    //Increment the byteLength because we are apending the bits 1000 0000 
    ++byteLength

    // Figure out how many bytes of zero we need
    var padding = (64 + (56 - byteLength%64))%64

    var bytes = new Uint8Array(arraybuffer)
    , endMessageByte = new Uint8Array(1)
    , paddingBytes = new Uint8Array(padding)
    
    var originalMessageLength = arraybuffer.byteLength
    , originalMessageLengthHex = originalMessageLength.toString('16')
    , originalMessageLengthHex = originalMessageLengthHex.length == 16 ? originalMessageLengthHex : (_.reduce(_.range(16-originalMessageLengthHex.length),function(m){return '0'+m},''))+originalMessageLengthHex
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

    
    // The reason we shift left 4 times then shift right once is because we need to shift left 3 times in order to convert the byte length to a bit length 
    // Since 8 bits == 1 byte


    endMessageByte[0] = 0x80; // 1000 0000 as a byte


    //fake message struct to get the bytes of the padded message
    var message = function(index){ 
        if (index < byteLength){
            return bytes[index]
        }else if(index > byteLength){
            return endMessageByte[ (index-byteLength)-1 ]
        }else{
            return endMessageByte[0]
        }
    }

    // We need to copy the chunk into another buffer that is padded
    var paddedMessage = new Uint8Array(byteLength+padding+messageLength.byteLength)

    //copy the original message part
    _.forEach(bytes, function(byte, index){
        paddedMessage[index] = byte
    })

    //add the end message byte
    paddedMessage[bytes.byteLength] = endMessageByte[0]

    //The rest are will automatically be zeros so we don't need to explicitly create the padding

    //We will define the end message bytes later

    //32 bit == 4 bytes
    var leftRotate32BitWord = function(word){
        //return (((word<<1) | ((0x80000000&word)>>31)) & 0xFFFFFFFF) // The idea here is to shift the byte to the left, then OR it's previous MSB. We AND 0xFFFFFFFF to keep the correct length
        var bitString = word.toString(2)
        bitString = bitString.length == 32 ? bitString : (_.reduce(_.range(32-bitString.length),function(m){return m+'0'},''))+bitString
        return parseInt(bitString.substring(1)+bitString.charAt(0),2)
    }

    var leftRotate32BitWordNtimes = function(word, times){
        return _.reduce(_.range(times), function(word){ return leftRotate32BitWord(word) }, word)
    }

    var left16BitRotation = function(byte){
    }

    var h = new Uint32Array([0x67452301,0xefcdab89,0x98badcfe,0x10325476,0xc3d2e1f0] )

    var hashTerms = new Uint32Array(8)  //a, b, c, d, e, f, k, temp


    //represent the padded message as 32 bit numbers, we are still sharing the data from the origin padded message
    var paddedMessage32bit = new Uint32Array(paddedMessage.buffer)

    //set the end message bytes
    paddedMessage32bit[paddedMessage32bit.length-1] = messageLength[1]
    paddedMessage32bit[paddedMessage32bit.length-2] = messageLength[0]

    //Create the array for the words
    var words = new Uint32Array(80)

    //get the range of chunks, at 16 step intervals because 32bits*16=512bits which is the chunksize we need
    _.forEach(_.range(0,byteLength+padding,16), function(chunkLocation, chunkIndex){

        //This is what the chunk would look like
        var chunk = paddedMessage32bit.subarray(chunkLocation,chunkLocation+16)

        //create the first 16 words
        _.forEach(_.range(0,16), function(wordIndex){
            words[wordIndex] = chunk[wordIndex]
        })

        //Create the rest of the words
        _.forEach(_.range(16,80), function(wordIndex){
            words[wordIndex] = leftRotate32BitWord(
                words[wordIndex-3] ^ words[wordIndex-8] ^ words[wordIndex - 14] ^ words[wordIndex - 16] // xor all the words!
            )
        })



        hashTerms[0] = h[0]
        hashTerms[1] = h[1]
        hashTerms[2] = h[2]
        hashTerms[3] = h[3]
        hashTerms[4] = h[4]

        //BIT TWIDDILING
        //Main Loop

        _.forEach(_.range(0,80), function(i){
            if (i < 20){
                hashTerms[5] = (hashTerms[1] & hashTerms[2]) | ((~ hashTerms[1]) & hashTerms[3])
                hashTerms[6] = 0x5A827999
            } else if ( i < 40 ) {
                hashTerms[5] = hashTerms[1] ^ hashTerms[2] ^ hashTerms[3]
                hashTerms[6] = 0x6ED9EBA1
            } else if ( i < 60 ) {
                hashTerms[5] = (hashTerms[1] & hashTerms[2]) | (hashTerms[1] & hashTerms[3]) | (hashTerms[2] & hashTerms[3]) 
                hashTerms[6] = 0x8F1BBCDC
            } else if ( i < 80 ) {
                hashTerms[5] = hashTerms[1] ^ hashTerms[2] ^ hashTerms[3]
                hashTerms[6] = 0xCA62C1D6
            }

            hashTerms[7] = 0
            hashTerms[7] += leftRotate32BitWordNtimes(hashTerms[0],5)
            hashTerms[7] += hashTerms[5]
            hashTerms[7] += hashTerms[4]
            hashTerms[7] += hashTerms[6]
            hashTerms[7] += words[i]

            hashTerms[4] = hashTerms[3]
            hashTerms[3] = hashTerms[2]
            hashTerms[2] = leftRotate32BitWordNtimes(hashTerms[1],30)
            hashTerms[1] = hashTerms[0]
            hashTerms[0] = hashTerms[7]


        })



        h[0] += hashTerms[0]
        h[1] += hashTerms[1]
        h[2] += hashTerms[2]
        h[3] += hashTerms[3]
        h[4] += hashTerms[4]
    })

    var digest = _.reduce(h, function(memo, num){return memo+':'+num.toString(16)}, '')
    return digest


}

define(function(){return sha1Hash});
