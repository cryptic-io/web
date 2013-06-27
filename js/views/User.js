//returns the User View, this contains the fs and is the parent to the userLogin
define(["jade!templates/User", "models/User", "views/Userlogin", "views/UserFiles", "views/UserSpaceInfo", "views/UserOptions"], function(userTemplate, User, UserLoginView, UserFileView, UserSpaceInfo, UserOptions){ 
    return Backbone.View.extend({
        template: userTemplate,

        errorHandler: function(errorObj){
            console.error(errorObj.error)
        },

        initialize: function(){

            this.model = new User()


            //set up subordinate views
            //userFileView
            this.userFileView = new UserFileView({el:this.options.userFilesContainer, model: this.model})
            this.userLoginView = new UserLoginView({el:this.options.userLoginContainer, model: this.model})
            this.userSpace = new UserSpaceInfo({el:this.options.userSpaceContainer, model: this.model})
            this.userOptions = new UserOptions({el:this.options.userFilesContainer, model:this.model})


            this.setupListeners()
        },

        destroy: function(){
            //destroy all bound events
            this.userLoginView.off()
            this.userFileView.off()
            this.off()

            this.userLoginView.remove()
            this.userFileView.remove()
            this.remove()
        },


        setupListeners: function(){
            this.on('error', this.errorHandler)
        },


        render: function() {
        },

        //call this function when the file has been uploaded succefully
        fileUploaded : function(fileObj){
            console.log('Saving',fileObj.name,'to userblob at', fileObj.location)

            this.model.addFile(fileObj)
        },

    })
});
