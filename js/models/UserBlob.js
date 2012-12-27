//Define the User Blob model
define(['tools/uploader','tools/downloader','tools/FileSystemHandler', 'models/FileSystem', "models/Chunk"],function(Uploader, Downloader, FileSystemHandler, FileSystem, Chunk){ 
  return Backbone.Model.extend({
    defaults: {
      version : 1.0
      , e_rsa: "1337"
      , bits_rsa: 512
      , iterations_hash: 1337
      , bytes_hash: 16
      , debug: true
      , fs : {"/":[]}
      , sane: true //simple check to see if a blob has been decrypted
      , chunk : new Chunk()
    }

    , initialize: function(){
    }

    , generateRSA: function(){
      var rsa = new RSAKey()
      rsa.generate(this.get('bits_rsa'), this.get('e_rsa'))
      this.set('rsa',rsa)
      this.set('pub_key', rsa.n)
    }

    , hashPassword: function(password){
      var salt = this.get('pub_key').toByteArray()
      , iterations = this.get('iterations_hash')
      , bytes = this.get('bytes_hash')
      , hash = sjcl.misc.pbkdf2(password, salt)
      this.set('hashed_password', hash)

      this.chunk.set('iv',hashed_password.slice(0,4))
      this.chunk.set('key',hashed_password.slice(4))
    }


    , isIVKeySet: function(){
      return (this.chunk.has('iv') && this.chunk.has('key'))
    }

    //generic crypt funciton for (en/de)crypting
    //reads the hashed password from the model, encrypts the arrayBuffer using the hashedPassword
    , encryptBlob: function(){
      if (this.isIVKeySet){
        chunk.encryptChunk()
        return chunk.buffer
      }else{
        this.errorHandler({error:"password not set yet"})
        return
      }
    }

    , decryptBlob: function(arrayBuffer){
      try{
        if (this.isIVKeySet){
          chunk.decryptChunk()
          return chunk.buffer
        }else{
          this.errorHandler({error:"password not set yet"})
          return
        }
      }catch(err){
        this.errorHandler({error:"Invalid password"})
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

    , addFile: function(location, filename, link){
      var fs = this.get('fs')
      , currentFolder = fs

      folder = location.split('/')
      folder = _.filter(folder, function(part) {return part != ""})

      _.each(folder, function(folderName){currentFolder=currentFolder[folderName]})

      if (_.isUndefined(currentFolder[filename]) ){
          currentFolder[filename]=link
      }else{
        
        //increment through filenames if the file already exists
        (function(filename, copyNumber){
          if( _.isUndefined(currentFolder[filename+' ('+copyNumber+')']) ){
            currentFolder[filename]=link
          }else{
            //we need to increment the number
            arguments.callee(filename, ++copyNumber)
            return
          }
        })(filename, 1)
      }
    }

    , addFolder: function(location, folderName){
      this.addFile(location, folderName, {})
    }
    
    
    //serialize the current state of the blob and save it to the blob's chunk's arrayBuffer
    , serializeBlob : function(){
      var userBlob = _.pick(this.toJSON(),["pub_key","rsa","fs", "version"])
      userBlob = JSON.stringify(userBlob)
      this.chunk.deserializeChunk(userBlob)
    }

    //read the array buffer and try to set the appropriatte values from it
    , deserializeBlob : function(){
      userArrayBuffer = this.chunk.get('buffer')
      userblobJSON = JSON.parse(this.chunk.serializeBlob(userArrayBuffer))
      this.set(userblobJSON) //reads the version, pub_key, rsa, and fs
    }

    , signMessage: function(messageString){
      return rsa.encrypt(messageString)
    }

    , hashArrayBuffer: function(arrayBuffer){
      var arrayBufferView = new Uint8Array(arrayBuffer)
      //need to convert the array buffer View into an actual array so we can hash it
      var actualArray = _.map(arrayBufferView, function(item){return item})
      
      return sjcl.codec.base64.fromBits(
        sjcl.hash.sha256.hash(actualArray)
      )
    }
      
  })
}) 

