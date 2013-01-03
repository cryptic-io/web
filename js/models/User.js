//Define the User Blob model
define(['apiEndPoints', 'models/UserBlob'],function(api, UserBlob){ 
    return Backbone.Model.extend({
        defaults: {
            userBlob : new UserBlob()
            , fsLocation : '/' // keep track of where the user is currently looking
            , loggedIn : false
            , username : ""
            , totalSpace : 10e6 // That's 10 MB
        }


      , register: function(username, password){
          var userBlob = this.get('userBlob')
  
          userBlob = new UserBlob(
              {username:username
               , password: password
          })
          userBlob.generateRSA()
  
          var userBlobJSON = userBlob.getBlob()
          , publickey_n = userBlobJSON.pub_key
          , publickey_e = userBlobJSON.rsa_e
          , encryptedBlob = userBlob.encryptBlob(userBlobJSON, password)
  
          $.post(api.createUser 
              , JSON.stringify(
                  { username:username
                    , publickey_n: publickey_n
                    , publickey_e: publickey_e
                    , blob : encryptedBlob} )
              , _.bind(this.registerCallback, this))
      }
  
      , registerCallback : function(){
      }
  
  
      , login: function(username, password){
          this.set('username',username)
          var userBlob = new UserBlob({username:username, password:password})
          this.set('userBlob', userBlob)
  
          $.post(api.getUserBlobs 
                 , JSON.stringify(
                     { username: username})
                 , _.bind(this.loginCallback,this))
      }
  
      , loginCallback: function(response){
          var userBlob = this.get('userBlob')
          , password = userBlob.get('password')
  
          var userBlobs = response.return.blobs
          userBlobs = _.map(userBlobs, _.bind(userBlob.decryptBlob,this, password))
  
          var userBlobFromServer = userBlob.consolidateBlobs(userBlobs)
  
          //save the id
          userBlobFromServer.id = response.return.id

          userBlob.setBlob(userBlobFromServer)
  
          this.set('loggedIn', true)

      }


      //interface for showing off the files
      , getFile : function(){
          var userBlob = this.get('userBlob')
          , fs = userBlob.get("fs")
          , fsLocation = this.get("fsLocation")

          return userBlob.getFile(fs, fsLocation)
      }

      , ls : function(){
          var userBlob = this.get('userBlob')
          , fs = userBlob.get("fs")
          , fsLocation = this.get("fsLocation")

          return userBlob.ls(fs, fsLocation)
      }

      , addFile : function(fileObj, fsLocation){
          var userBlob = this.get('userBlob')
          , fs = userBlob.get("fs")
          fs = _.clone(fs) //get a copy so we don't modify the original

          fs = userBlob.addFile(fs, fsLocation, fileObj)
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
