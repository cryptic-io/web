//Define the User Blob model
define(["apiEndPoints", "models/File", "models/RSA", "models/user/FS"],function(api, File, RSAModel, userFS){ 
  var multipass = new Multipass()
  return Backbone.Model.extend({
    initialize: function(){
      this.set('rsa', new RSAModel())
      this.set("timestamp", +(new Date()))
    }

    , generateRSA: function(){
      this.get("rsa").generateRSA()
    }

    , isIVKeySet: function(){
      return (this.chunk.has('iv') && this.chunk.has('key'))
    }

    , getBlob: function(){
        this.set("timestamp",+(new Date()))
      
        var userBlob = _.pick(this.toJSON(),["fs", "version", "id", "username", "timestamp"])

        if (_.isUndefined(userBlob.fs)) { 
          this.resetFS();
          userBlob.fs = this.get("fs")
        }

        //return a serialized json version of the RSA info
        userBlob["RSAObject"] = this.get("rsa").getRSAObject()
        
        return userBlob
    }

    , checkUserBlobCompat : function(userBlob){
      if (!userBlob.RSAObject) userBlob.RSAObject = _.pick(userBlob, ["pub_key" , "private_key" , "rsa_e" ])
      return userBlob
    }

    , setBlob: function(userBlob){
        this.set(userBlob)
        this.checkUserBlobCompat(userBlob)

        //save the RSA info
        this.get('rsa').setRSAObject(userBlob.RSAObject)
    }

    //Merge multiple userBlobs into one, prevents a user from accidently overwriting his data
    , consolidateBlobs: function(userBlobs){
      //for now I'm just going to get the userblob with the latest timestamp
      return _.max(userBlobs, function(userBlob){return userBlob.timestamp})
    }

    // Simple shortcut, we are just gonna use the excellent work in the sjcl library
    // Returns an JSON string with ciphertext and some info to decrypt (iv, salt)
    , encryptBlob: function(password, userBlob){
      if (password){
        userBlob = JSON.stringify(userBlob)
        //We use the sjcl encrypt defined in convience.js of the sjcl library. it does pbkdf2 hashing on the password and chooses a random salt, everything we would have done! so thanks sjcl! 
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

    , addFile: userFS.addFile

    , deleteFolder : userFS.deleteFolder

    //calls the userFS removeFile as well as remove the file from the server, which requires user info, so that stays here.
    , removeFile: function(fs, loc, filename, isFolder){
      var folder = this.getFile(fs, loc)
      , file = folder.value[filename]

      userFS.removeFile(fs, loc, filename, isFolder)

      this.removeFileFromServer(file.value)

      return fs
    }

    , removeFileFromServer: function(link){
        var linkName = link.split('/')[0]
        , passcode = link.split('/')[1]
        , file = new File()

        file.loadManifest(linkName, passcode, _.bind(function(manifest){
            var links = manifest.getChunkLinks()

            //include the manifest file
            links = links.concat(linkName)

            var sig = this.signMessage(JSON.stringify(links))
            ,   data = JSON.stringify({ username: this.get('username') , filenames : links , signature : sig})

            multipass.checkMultipass()
                     .then(_.bind($.post, $, api.removeFile, data))
        }, this))


    }

    , getParentFsLocation: userFS.getParentFsLocation

    // Given a fs and location, return an array of all the files inside
    , getFile: userFS.getFile

    , ls: userFS.ls
    
    // given an array, and an  object, navigate the object given the array
    , getIn: userFS.getIn
    
    , signMessage: function(messageString){
      //redirect to the rsa model's implementation
      return this.get('rsa').signMessage(messageString)
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
      , encryptedBlob = this.encryptBlob(password, userBlob)
      , signature = this.signMessage(encryptedBlob)
      , data = JSON.stringify( { username:username , id: id , newBlob : encryptedBlob , signature : signature} ) 

      
      multipass.checkMultipass()
               .then(_.bind($.post, $, api.updateUserBlob, data))
               .then(_.bind(this.saveBlobCallback, this))
    }

    , saveBlobCallback: function(){
    }

    , resetFS: function(){
      this.set('fs',{name:"root",type:"folder", value:{}})
      this.saveBlob()
    }

    , calcSpaceUsed: function(){
      if (!this.has("fs")){
        return 0
      }
      var fs = this.get('fs')

      var recursiveReduceSum = function(memo, fileObj){
        if (fileObj.type == "folder"){
         return memo +  _.reduce(_.values(fileObj.value), recursiveReduceSum, 0)
        // it is a file
        }else{
          return memo + fileObj.size

        }
      }

      return _.reduce(_.values(fs.value), recursiveReduceSum, 0)

    }

  })
}) 

