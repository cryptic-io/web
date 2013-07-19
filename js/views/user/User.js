//returns the User View, this contains the fs and is the parent to the userLogin
define(["jade!templates/user/User", "models/user/User", "views/user/Userlogin", "views/user/UserFiles", "views/user/UserSpaceInfo", "views/user/UserOptions","views/user/SingleFileInfo"], function(userTemplate, User, UserLoginView, UserFileView, UserSpaceInfo, UserOptions, SingleFileInfo){ 
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
            this.singleFileInfo = new SingleFileInfo({model:this.model})

            this.setupListeners()

            this.setupPassThroughEvents()
        },

        destroy: function(){
            //destroy all bound events
            this.userLoginView.off()
            this.userFileView.off()
            this.singleFileInfo.off()
            this.off()

            this.userLoginView.remove()
            this.userFileView.remove()
            this.singleFileInfo.remove()
            this.remove()
        },


        setupListeners: function(){
            this.on('error', this.errorHandler)

            this.listenTo(this.userFileView, "fs:folder:open", function(filename){this.model.cd(filename)})
        },

        //Sometimes we want to pass up an event from a child view to whoever is listening to this view
        setupPassThroughEvents: function(){
          this.listenTo(this.userFileView, "fs:file:open", _.bind(this.trigger, this, "fs:file:open"))
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
