//returns the User View, this contains the fs and is the parent to the userLogin
define(["jade!templates/user/User", "models/user/User", "views/user/Userlogin", "views/user/UserFiles", "views/user/UserSpaceInfo", "views/user/UserOptions"], function(userTemplate, User, UserLoginView, UserFileView, UserSpaceInfo, UserOptions){ 
    return Backbone.View.extend({
        template: userTemplate,

        errorHandler: function(errorObj){
            console.error(errorObj.error)
        },

        initialize: function(){

            //set up subordinate views
            //userFileView
            this.userFileView = new UserFileView({model: this.model})
            this.userLoginView = new UserLoginView({model: this.model})
            this.userSpace = new UserSpaceInfo({model: this.model})
            this.userOptions = new UserOptions({model:this.model})


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
        fileUploaded : function(fileIndex, fileObj){
            console.log('Saving',fileObj.name,'to userblob at', fileObj.location)

            this.model.addFile(fileObj)
        },

    })
});
