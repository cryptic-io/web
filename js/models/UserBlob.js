//Define the User Blob model
define(["apiEndPoints"],function(api){ 


  return Backbone.Model.extend({
    defaults: {
      version : 1.0
      , e_rsa: "1337" //this is actually hex for 4919
      , bits_rsa: 512
      , iterations_hash: 1337
      , bytes_hash: 16
      , debug: true
      , fs : {name:"root", type:"folder", value:{}}
      , sane: true //simple check to see if a blob has been decrypted
    }

    , initialize: function(){
    }

    , generateRSA: function(){
      var rsa = new RSAKey()
      rsa.generate(this.get('bits_rsa'), this.get('e_rsa'))
      this.set('rsa',rsa)
      this.set('pub_key', rsa.n)

    }

    , isIVKeySet: function(){
      return (this.chunk.has('iv') && this.chunk.has('key'))
    }

    , getBlob: function(){
        var userBlob = _.pick(this.toJSON(),["fs", "version", "id"])

        //store RSA values in base64 likaboss
        userBlob["pub_key"] = hex2b64(this.get('rsa').n.toString(16))
        userBlob["private_key"] = hex2b64(this.get('rsa').d.toString(16))
        userBlob["rsa_e"] = hex2b64(this.get('rsa').e.toString(16))

        return userBlob
    }

    , setBlob: function(userBlob){
        
        this.set(userBlob)
        var rsa = new RSAKey()
        //keys for the N, E, D components of the rsa
        var NEDkeys = [userBlob.pub_key, userBlob.rsa_e, userBlob.private_key]
        //transform the keys to hex from b64
        NEDkeys = _.map(NEDkeys, b64tohex)

        //set the value to the rsa
        rsa.setPrivate.apply(rsa, NEDkeys)
        this.set('rsa',rsa)
    }

    //Merge multiple userBlobs into one, prevents a user from accidently overwriting his data
    , consolidateBlobs: function(userBlobs){
        //TODO actually do something here
        return userBlobs[0]
    }

    // Simple shortcut, we are just gonna use the excellent work in the sjcl library
    // Returns an JSON string with ciphertext and some info to decrypt (iv, salt)
    , encryptBlob: function(userBlob, password){
      if (password){
        userBlob = JSON.stringify(userBlob)
        return sjcl.encrypt(password, userBlob)
      }else{
          this.errorHandler({error:"password not set yet"})
          return
      }
    }

    , decryptBlob: function(password, encryptedUserBlob){
      if (password){
        var userBlob = sjcl.decrypt(password, encryptedUserBlob)
        return userBlob = JSON.parse(userBlob)
      }else{
          this.errorHandler({error:"password not set yet"})
          return
      }
    }

    , fetchBlob: function(username, callback){
      //TODO Connect this to a backend service like riak
      userblob = localStorage[username]
      if (_.isUndefined(userblob)){
        this.errorHandler({error:"User does not exist"})
        return
      }
    }

    , errorHandler: function(errorObj){
      console.error(errorObj)
      alert("Error: "+errorObj.error)
    }

    , addFile: function(fs, loc, fileObj){

      var contents = fileObj
      , filename = fileObj.filename
      contents.value = contents.link

      contents = _.defaults(contents, {
          created: +(new Date()), modified: +( new Date() ), type: "file", location: loc, size:"Unknown"})

      var folder = this.getFile(fs, loc)
      , currentFolder = folder.value //the value of the folder is the object that contains all the other files

      if (_.isUndefined(currentFolder[filename]) ){
          currentFolder[filename]=contents
      }else{
        
        //increment through filenames if the file already exists
        (function(filename, copyNumber){
          if( _.isUndefined(currentFolder[filename+' ('+copyNumber+')']) ){
            contents.filename = filename + ' ('+copyNumber+')'
            currentFolder[filename + ' ('+copyNumber+')']=contents
          }else{
            //we need to increment the number
            arguments.callee(filename, ++copyNumber)
            return
          }
        })(filename, 1)
      }

      return fs
    }

    , addFolder: function(fs, loc, folderName){
      this.addFile(fs, loc, folderName, {}, { type: "folder" })
    }
    
    // Given a fs and location, return an array of all the files inside
    , getFile: function(fs, loc){
        var locationArray = _.without(loc.split('/'), "")
        , file = fs

        _.each(locationArray, function(location){
          //navigate inside folders 
          file = file.value[location]
        })

        return file
    }

    , ls: function(fs, loc){
      //we return a list of files from a folder
      return _.values(this.getFile(fs, loc).value)
    }
    
    // given an array, and an  object, navigate the object given the array
    , getIn: function(object, loc){
        var tempObj = object
        _.each(loc, function(part){
            tempObj = tempObj[part]
        })

        return tempObj
    }
    
    , signMessage: function(messageString){
      //first lets hash the message
      var hash = sjcl.hash.sha256.hash(messageString)
      , rsa = this.get('rsa')
      hash = sjcl.codec.base64.fromBits(hash) //convert to b64

      //Sign the hash
      //We sign the hash by encrypting the hash with the private key, so it will later be decrypted with a public key to compare
      //the computed hash with the given, signed hash
      //Place the padding
      padded_hash = pkcs1pad2(hash, (rsa.n.bitLength()+7)>>3)
      //Encrypt the hash using the private key
      signed_hash = padded_hash.modPow(rsa.d, rsa.n)
      
      //b64 encode
      var sig = hex2b64(signed_hash.toString(16))

      return sig
    }

    , hashArrayBuffer: function(arrayBuffer){
      var arrayBufferView = new Uint8Array(arrayBuffer)
      //need to convert the array buffer View into an actual array so we can hash it
      var actualArray = _.map(arrayBufferView, function(item){return item})
      
      return sjcl.codec.base64.fromBits(
        sjcl.hash.sha256.hash(actualArray)
      )
    }

    , saveBlob: function(){

      var userBlob = this.getBlob()
      , username = this.get('username')
      , password = this.get('password')
      , id = userBlob.id
      , encryptedBlob = this.encryptBlob(userBlob, password)
      , signature = this.signMessage(encryptedBlob)

      debugger
      $.post(api.updateUserBlob
        , JSON.stringify(
          { username:username
            , id: id
            , newBlob : encryptedBlob
            , signature : signature} )
        , _.bind(this.saveBlobCallback, this))
    }

    , saveBlobCallback: function(){
      debugger
    }

    , resetFS: function(){
      this.set('fs',{name:"root",type:"folder", value:{}})
      this.saveBlob()
    }


      
  })
}) 

