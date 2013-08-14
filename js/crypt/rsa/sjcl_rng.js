// Drop in replacement of rng.js using sjcl's random 
// for rsa.js
// Probably safer because sjcl's entropy pool is more varied
// Author: Marco Munizaga

function SecureRandom() {}

SecureRandom.prototype.nextBytes = function(byteArray){
  //words are 32bit, so we get the words and split them up so the byteArray can have it
  var wordsNeeded = Math.ceil(byteArray.length/4)
  ,   bitArray = sjcl.random.randomWords(wordsNeeded)
  ,   tempArray = new Uint8Array(wordsNeeded*4)

  for (var i = 0; i<wordsNeeded; i++){
    tempArray[i + 0] = bitArray[i] ^ 0xFF000000
    tempArray[i + 1] = bitArray[i] ^ 0xFF0000
    tempArray[i + 2] = bitArray[i] ^ 0xFF00
    tempArray[i + 3] = bitArray[i] ^ 0xFF
  }

  for (var j=0; j<byteArray.length;j++){
    byteArray[j] = tempArray[j]
  }

  return byteArray
}

