//Define the User Blob model
define(['apiEndPoints', 'models/UserBlob'],function(api, UserBlob){ 
    return Backbone.Model.extend({
        defaults: {
            userBlob : new UserBlob()
            , fsLocation : '/' // keep track of where the user is currently looking
            , loggedIn : false
            , username : ""
        }


      , register: function(username, password){
  
          this.userBlob = new UserBlob(
              {username:username
               , password: password
          })
          this.userBlob.generateRSA()
  
          var userBlob = this.userBlob.getBlob()
          , publickey_n = userBlob.pub_key
          , publickey_e = userBlob.rsa_e
          , encryptedBlob = this.userBlob.encryptBlob(userBlob, password)
  
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
          this.userBlob = new UserBlob({username:username, password:password})
  
          $.post(api.getUserBlobs 
                 , JSON.stringify(
                     { username: username})
                 , _.bind(this.loginCallback,this))
      }
  
      , loginCallback: function(response){
          var password = this.userBlob.get('password')
  
          //debug
          password = "sinatra"
  
          var userBlobs = response.return.blobs
          userBlobs = _.map(userBlobs, _.bind(this.userBlob.decryptBlob,this, password))
  
          var userBlob = this.userBlob.consolidateBlobs(userBlobs)
  
          //save the id
          userBlob.id = response.return.id
          this.userBlob.setBlob(userBlob)
  
          this.set('loggedIn', true)

      }


      //interface for showing off the files
      , getFile : function(){
          var fs = this.userBlob.get("fs")
          , fsLocation = this.get("fsLocation")

          return this.userBlob.getFile(fs, fsLocation)
      }

      , ls : function(){
          var fs = this.userBlob.get("fs")
          , fsLocation = this.get("fsLocation")

          return this.userBlob.ls(fs, fsLocation)
      }

      , addFile : function(fileObj, fsLocation){
          var fs = this.userBlob.get("fs")
          fs = _.clone(fs) //get a copy so we don't modify the original

          fs = this.userBlob.addFile(fs, fsLocation, fileObj)
          this.userBlob.set('fs',fs)

          this.userBlob.saveBlob()

          //let listeners know that the fs has changed
          this.trigger('change:fs')
      }

  })
})
