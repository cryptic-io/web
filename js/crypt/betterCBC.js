/** @fileOverview better CBC implementation designed to be fast
 *
 * @author Marco
 */


/*********************\
|*      START        *|

You need to supply an IV and a key to use the crypt functions
Everything as an object to make things simple

settings = {
buffer : ArrayBuffer
key : 4 word key
iv : 4 word iv
}

\*********************/

sjcl.mode.betterCBC= {



    encryptChunk: function(settings){
        var key = settings.key
        , buffer = settings.buffer
        , iv = settings.iv

        , aes = new sjcl.cipher.aes(key)

        , data = new Int32Array(buffer)
        , outputStruct = new OutputStruct(data.length)
        , temp = new TempChainingStruct();

        temp.setSubArray(iv);

        //Use the encryption algorithm 4 bytes at a time
        for (var i=0; i<data.length; i+=4){

            var inputDataForEncryption = data.subarray(i,i+4);

            this.xorArray(temp.tempArray,inputDataForEncryption, temp.tempArray)

            var encryptedArray = temp.setSubArray(aes.encrypt(temp.tempArray)); 

            outputStruct.setSubArray(encryptedArray, i)
        }

        return outputStruct.output;
    },

    decryptChunk: function(settings){
        var key = settings.key
        , buffer = settings.buffer
        , iv = settings.iv

        , aes = new sjcl.cipher.aes(key)

        , data = new Int32Array(buffer)
        , outputStruct = new OutputStruct(data.length)
        , temp = new TempChainingStruct();

        temp.setSubArray(iv)

        //Use the encryption algorithm 4 bytes at a time
        for (var i=0; i<data.length; i+=4){

            var inputDataForDecryption = data.subarray(i,i+4)
            , decryptedArray = aes.decrypt(inputDataForDecryption); 

            this.xorArray(temp.tempArray,decryptedArray, temp.tempArray)

            outputStruct.setSubArray(temp.tempArray, i)

            //key the key for future use
            temp.setSubArray(inputDataForDecryption);
        }

        return outputStruct.output;
    },


    //xor's two arrays and outputs it into array3: array1 ^ array2  => array3
    xorArray:function(array1, array2, array3){
        for (var i=0;i<array1.length && i<array2.length;i++){
            array3[i]=array1[i]^array2[i]
        }
        return array3;

    }

}

/*
 *  Datastructure for the data in and data out
 *  Using only one buffer to speed up processing
 *  
 *  Uses and Int32 Array viewer so each item in the array is 4 bytes 
 */
var DataStruct = function(buffer){
    this.buffer = buffer;
    var halfLength = buffer.byteLength/2;
    var halfIntCount = halfLength/4; //each item in the array is 4 bytes
    this.dataIn = new Int32Array(buffer,0, halfIntCount)
    this.dataOut = new Int32Array(buffer,halfLength, halfIntCount)
}

/*
 *  Data structure for the output array
 */
var OutputStruct = function(length){
    var byteSize = length*4;
    var buf = new ArrayBuffer(byteSize);
    this.output = new Int32Array(buf) //Start at byte 16 since temp already got the first 4 bytes
}

OutputStruct.prototype.setSubArray = function(array, startIndex){
    for (var j=0;j<array.length;j++){
        this.output[startIndex+j] = array[j];
    }
    return array;
}

/*
 * Data structure for a very commonly used temp array
 * Used alot in the chaining methods so it needs to be fast
 */

var TempChainingStruct = function(){
    this.tempArray = new Int32Array(4);
}

TempChainingStruct.prototype.setSubArray = function(array){
    for (var j=0;j<4;j++){
        this.tempArray[j] = array[j];
    }
    //for chaining commands together
    return array;
}
