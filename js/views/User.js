//returns the User View, this contains the fs and is the parent to the userLogin
define(["jade!templates/User", "views/Userlogin", "views/UserFiles", "views/SingleFileInfo"], function(userTemplate, UserLoginView, UserFileView, SingleFileInfo){ 

    var api = {
      updateUserBlob : "/api/updateUserBlob"
    }

    return Backbone.View.extend({
        template: userTemplate,

        errorHandler: function(errorObj){
            console.error(errorObj.error)
        },

        initialize: function(){

            this.on('error', this.errorHandler)
            
            if (this.options.userBlob){
                this.userBlob = this.options.userBlob
            }else{

                this.userLoginView = new UserLoginView({
                  el : this.options.userLoginContainer
                })
                //debug
                this.userLoginView.login()

                this.userLoginView.render()


                this.trigger('error',{error:"You need to login"})
            }
        },


        render: function(args) {
            args = args || {}

            this.userLoginView = new UserLoginView({
              el : this.options.userLoginContainer
            })
            this.userLoginView.render()

            //debug
            this.userLoginView.login()

            if (args.fileLocation){
                this.openFileLocation(args.fileLocation)
            }

            lolTEST=this
            this.userLoginView.on('loggedIn', this.userLoggedIn, this)

            //this.$el.html(this.template());
        },

        //File location should be in the form of /coolPics/me.jpg or /coolPics
        showFileInfo: function(fileLocation){
            var fs = this.userBlob.get('fs')
            , file = this.userBlob.getFile(fs, fileLocation)

            if (file && file.type != "folder"){
                var singleFileInfo = new SingleFileInfo({el:this.options.userFilesContainer})
                singleFileInfo.render({file:file})
            }
        },

        userLoggedIn: function(){
            //get the userBlob from the userLogin view
            this.userBlob = this.userLoginView.userBlob

            this.showUserFiles(userBlob)
        },

        showUserFiles: function(){
            loc = "/"

            var fs = this.userBlob.get('fs')
            , files = this.userBlob.ls(fs, loc)

            this.userFileView = new UserFileView({el:this.options.userFilesContainer})
            this.userFileView.render({files:files})

            return files

        },

        //call this function when the file has been uploaded succefully
        fileUploaded: function(fileObj){
            console.log('Saving',filename,'to userblob')

            var loc = "/"
            , fs = this.userBlob.get('fs')

            fs = _.clone(fs) //get a copy so we don't modify the original

            fs = this.userBlob.addFile(fs, loc, fileObj)
            this.userBlob.set('fs',fs)

            this.saveBlob()
        },

        resetFS: function(){
            this.userBlob.set('fs',{name:"root", value:{}})
            this.saveBlob()
        },

        saveBlob: function(){

            var userBlob = this.userBlob.getBlob()
            , username = this.userBlob.get('username')
            , password = this.userBlob.get('password')
            , id = userBlob.id
            , encryptedBlob = this.userBlob.encryptBlob(userBlob, password)
            , signature = this.userBlob.signMessage(encryptedBlob)

            $.post(api.updateUserBlob
                , JSON.stringify(
                    { username:username
                      , id: id
                      , newBlob : encryptedBlob
                      , signature : signature} )
                , _.bind(this.saveBlobCallback, this))
        },

        saveBlobCallback: function(){
        }


    })
});
