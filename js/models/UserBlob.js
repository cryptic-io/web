//Define the User Blob model
define(['tools/uploader','tools/downloader','tools/FileSystemHandler', 'models/FileSystem'],function(Uploader, Downloader, FileSystemHandler, FileSystem){ 
  return Backbone.Model.extend({
    defaults: {
      e_rsa: "1337"
      , bits_rsa: 512
      , iterations_hash: 1337
      , bytes_hash: 16
      , debug: true
      , fs : {"/":[]}
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

    , hashPassword: function(password, callback){
      var salt = this.get('pub_key').toByteArray()
      , iterations = this.get('iterations_hash')
      , bytes = this.get('bytes_hash')
      , hash = sjcl.misc.pbkdf2(password, salt)
      this.set('hashed_password', hash)
    }

    //generic crypt funciton for (en/de)crypting
    , cryptBlob: function(arrayBuffer, cryptFunction){
      if ( !this.has('hashed_password') ) {
        console.error("No password hash in memory")
        return
      }

      //split the hashed_password into 8 delicious pieces in an array
      //So that we can encrypt the userBlob using the hashed password 
      var hashed_password = this.get('hashed_password')

      var cryptedBuffer = cryptFunction( {
          buffer: arrayBuffer
          , iv: hashed_password.slice(0,4) //get the first 4 parts of the hashed password array
          , key: hashed_password.slice(4) //get the last 4 parts of the hashed password array
      })

      return cryptedBuffer.buffer
    }

    //reads the hashed password from the model, encrypts the arrayBuffer using the hashedPassword
    , encryptBlob: function(arrayBuffer){
      return this.cryptBlob(arrayBuffer, _.bind(sjcl.mode.betterCBC.encryptChunk,sjcl.mode.betterCBC))
    }

    , decryptBlob: function(arrayBuffer){
      return this.cryptBlob(arrayBuffer, _.bind(sjcl.mode.betterCBC.decryptChunk,sjcl.mode.betterCBC))
    }

    , fetchBlob: function(username){
    }

    , addFile: function(folder, filename, link){
      var fs = this.get('fs')
      , currentFolder = fs

      folder = folder.split('/')
      folder = _.filter(folder, function(part) {return part != ""})

      _.each(folder, function(folderName){currentFolder=currentFolder[folderName]})

      currentFolder.push({name:filename,link:link})

    }

    , signMessage: function(messageString){
      return rsa.encrypt(messageString)
    }

    //TODO implemented hashing of the array buffer
    , hashArrayBuffer: function(arrayBuffer){

    }
      
  })
}) 

