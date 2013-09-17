//Define the User Blob model
define(['apiEndPoints', 'models/user/UserBlob', 'tools/Multipass'],function(api, UserBlob, Multipass){ 
    var multipass = new Multipass()

    return Backbone.Model.extend({
        defaults: {
            userBlob : new UserBlob()
            , fsLocation : '/' // keep track of where the user is currently looking
            , loggedIn : false
            , inOptions: false
            , username : ""
            , totalSpace : 10e6 // That's 10 MB
        }

      , initialize : function(){
          //debugging
          //this.login("abc", "123",'')
      }

      , createSecretKey : function(){
          var base32 = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","2","3","4","5","6","7"]
          return _.map(sjcl.random.randomWords(16), function(randomNum){ return base32[Math.abs(randomNum)%32] } ).join('');
      }

      addSecretKey: function(secretKey){
          var userBlob = this.get('userBlob')
          var secretKeys = userBlob.get('secretKeys')
          secretKeys.push(secretKey)

          userBlob.set('secretKeys', secretKey)
      },

      revokeSecretKey: function(secretKey){
          var userBlob = this.get('userBlob')
          var secretKeys = userBlob.get('secretKeys')
          secretKeys = secretKeys.filter(function(key){ return key !== secretKey })

          userBlob.set('secretKeys', secretKey)
      },


      , register: function(username, password, testerToken, use2step){
          var userBlob = this.get('userBlob')
          , secretKey = use2step ? this.createSecretKey() : undefined //set the secret to nothing if we arent using it
  

          //tell anyone who cares that the secret key was made 
          this.trigger('secretKeyCreated', secretKey);

          userBlob = new UserBlob(
              {username:username
               , password: password
          })
          userBlob.generateRSA()
          userBlob.resetFS()
  
          var userBlobJSON = userBlob.getBlob()
          , publickey_n = userBlobJSON.RSAObject.pub_key
          , publickey_e = userBlobJSON.RSAObject.rsa_e
          , encryptedBlob = userBlob.encryptBlob(password, userBlobJSON)
          , data = 
                  { username:username
                  , testerToken: testerToken
                  , publickey_n: publickey_n
                  , publickey_e: publickey_e
                  , secret_key : secretKey
                  , blob : encryptedBlob}
  
          multipass.checkMultipass(data)
                   .then(_.bind($.post,$, api.createUser))
                   .then(_.bind(this.registerCallback, this, username, password))
      }
  
      , registerCallback : function(username, password, result){
        if (result.return === "success"){
          this.trigger('register:success')
          this.login(username, password)
        }else{
          this.trigger('register:error',result.return.error)
        }
      }
  
  
      , login: function(username, password, auth_attempt){
          this.set('username',username)
          var userBlob = new UserBlob({username:username, password:password})
          this.set('userBlob', userBlob)
          var loginReq = {username:username}
          if (!_.isUndefined(auth_attempt) && auth_attempt.length !== 0){
              loginReq["auth_attempt"]=auth_attempt
          } 

          multipass.checkMultipass(loginReq)
                  .then(_.bind($.post, $, api.getUserBlobs))
                  .then(_.bind(this.loginCallback, this))
      }
  
      , loginCallback: function(response){
          if (_.has(response.return,"error")){
            this.trigger('login:error',response.return.error)
            return
          }
           
          var userBlob = this.get('userBlob')
          , password = userBlob.get('password')
  
          var userBlobs = response.return.blobs

          try {
            userBlobs = _.map(userBlobs, _.bind(userBlob.decryptBlob,this, password))
          }catch (e){
            //The decryption failed, so they most likely used a wrong password
            console.error(e, ". Probably a Wrong Password")
            this.trigger('login:error', "wrong password")
            return
          }
  
          var userBlobFromServer = userBlob.consolidateBlobs(userBlobs)
  
          //save the id
          userBlobFromServer.id = response.return.id

          userBlob.setBlob(userBlobFromServer)
  
          this.set('loggedIn', true)
          this.trigger('loggedIn')
          this.trigger('login:success')
      }

      , changePassword: function(oldPassword, newPassword){
          if ( oldPassword == this.userBlob.get('password') ){

          }
      }


      //interface for showing off the files located at the current directory, or a single file if we are at the directory of a single file
      , getFile : function(){
          var userBlob = this.get('userBlob')
          , fs = userBlob.get("fs")
          , fsLocation = this.get("fsLocation")

          return userBlob.getFile(fs, fsLocation)
      }

      // similar to the ls -la filename
      , lsla : function(filename){
        var userBlob = this.get('userBlob')
        , fs = userBlob.get("fs")
        , fsLocation = this.get("fsLocation")+"/"+filename

        return userBlob.getFile(fs, fsLocation)
      }


      , ls : function(){
          var userBlob = this.get('userBlob')
          , fs = userBlob.get("fs")
          , fsLocation = this.get("fsLocation")

          return userBlob.ls(fs, fsLocation)
      }

      //like the unix cd, change directory into a folder
      , cd : function(filename){
        var file = this.lsla(filename)
        if (file.type !== "folder"){
          console.error("Trying to cd into a file!")
          return false
        }

        var fsLocation = this.get("fsLocation")
        this.set("fsLocation", fsLocation+"/"+filename)
        return true
      }

      , addFolder : function(folderName){
          this.addFile({filename:folderName, type:"folder", value:{}})
      }

      , addFile : function(fileObj){
          var userBlob = this.get('userBlob')
          , fs = userBlob.get("fs")
          , fsLocation = this.get('fsLocation')
          fs = _.clone(fs) //get a copy so we don't modify the original

          fs = userBlob.addFile(fs, fsLocation, fileObj)
          userBlob.set('fs',fs)

          userBlob.saveBlob()

          //this.trigger('change:fs')
      }

      , deleteFolder: function(fsLocation, filename){
          var userBlob = this.get('userBlob')
          , fs = userBlob.get("fs")
          , parentFolder = userBlob.getFile(fs, fsLocation)
          , folder = parentFolder.value[filename]
          , childFiles = _.values(folder.values)

          //check to see if it is the root 
          if (folder.name && folder.name == "root") {
              console.error("You tried to delete the root, directory. I'm not gonna do that")
              alert("Woah there buddy, looks like you almost deleted your root directory. Don't worry I saved you.")
              return
          }


          //remove all the files inside the folder
          _.each(childFiles, function(fileObj){ this.removeFile(fsLocation, fileObj.filename) }, this)

          fs = userBlob.deleteFolder(fs, fsLocation, folder.filename)
          userBlob.set('fs',fs)
          userBlob.saveBlob()

          this.set('fsLocation', fsLocation)

          //let listeners know that the fs has changed
          this.trigger('change:fs')
           
      }

      , removeFile : function(fsLocation, filename){
          var userBlob = this.get('userBlob')
          , fs = userBlob.get("fs")
          , parentFolder = userBlob.getFile(fs, fsLocation)
          , file = parentFolder.value[filename]

          //use the deleteFolder directive if the file is a fodler
          if (file.type == "folder"){
              return this.deleteFolder(fsLocation, filename)
          }

          fs = _.clone(fs) //get a copy so we don't modify the original

          fs = userBlob.removeFile(fs, fsLocation, filename)
          userBlob.set('fs',fs)
          userBlob.saveBlob()


          //let listeners know that the fs has changed
          this.trigger('change:fs')
      }

      , calcSpaceUsed : function(){
            return this.get('userBlob').calcSpaceUsed()
      }

  })
})
