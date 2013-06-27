//Define the User Blob model
define(["apiEndPoints", "models/File", "models/RSA"],function(api, File, RSAModel){ 
  return Backbone.Model.extend({
    initialize: function(){
      this.set('rsa', new RSAModel())
    }

    , generateRSA: function(){
      this.get("rsa").generateRSA()
    }

    , isIVKeySet: function(){
      return (this.chunk.has('iv') && this.chunk.has('key'))
    }

    , getBlob: function(){
        var userBlob = _.pick(this.toJSON(),["fs", "version", "id", "username"])

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
        //TODO actually do something here
        return userBlobs[0]
    }

    // Simple shortcut, we are just gonna use the excellent work in the sjcl library
    // Returns an JSON string with ciphertext and some info to decrypt (iv, salt)
    , encryptBlob: function(password, userBlob){
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

      contents = _.defaults(contents, {
          created: +(new Date()), modified: +( new Date() ), type: "file", location: loc, size:"Unknown", value: contents.link})

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

    , deleteFolder : function(fs, loc, filename){
        return this.removeFile(fs, loc, filename, true)
    }

    , removeFile: function(fs, loc, filename, isFolder){
      var folder = this.getFile(fs, loc)
      , currentFolder = folder.value //the value of the folder is the object that contains all the other files
      , file = folder.value[filename]

      //remove the file from the folder
      currentFolder = _.omit(currentFolder, filename)

      folder.value = currentFolder

      if (isFolder){
          return fs
      }

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
            $.post(api.removeFile,
                JSON.stringify(
                    { username: this.get('username')
                      , filenames : links
                      , signature : sig
                    }
                )
            )
        }, this))


    }

    , getParentFsLocation: function(fsLocation){
          var  parentFsLocation = fsLocation.split('/')
          parentFsLocation.splice(1) //get rid of the current folder in the fsLocation
          parentFsLocation = '/' + _.without(parentFsLocation,"").join('/') // recreate the original path

          return parentFsLocation
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

      $.post(api.updateUserBlob
        , JSON.stringify(
          { username:username
            , id: id
            , newBlob : encryptedBlob
            , signature : signature} )
        , _.bind(this.saveBlobCallback, this))
    }

    , saveBlobCallback: function(){
    }

    , resetFS: function(){
      this.set('fs',{name:"root",type:"folder", value:{}})
      this.saveBlob()
    }

    , calcSpaceUsed: function(){
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

