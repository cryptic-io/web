//returns the Userfiles view, responsible for the look of the fs
define(["jade!templates/user/UserFiles" ], function(filesTemplate, SingleFileInfo){ 
    return Backbone.View.extend({

        id : "userFilesContainer",
        className : "floatingContainer",

        template: filesTemplate,

        initialize: function(){
            //react to the changes in the fsLocation
            this.listenTo(this.model,'change:fsLocation',this.updateView)
            this.listenTo(this.model,'change:loggedIn',this.updateView)
            this.listenTo(this.model,'change:inOptions',this.updateView)
            //check if the fs has changed
            this.listenTo(this.model,'change:fs',this.updateView)
        },

        updateView: function(){
            //make sure we only draw the view if the user is logged In
            if (this.model.get('loggedIn') == false) return
            if (this.model.get('inOptions') == true) return
            if (_.isUndefined(this.model.getFile())) return

            //this should return a list of files in the current fsLocation
            var file = this.model.getFile()

            if (file.name === "root" && file.type === "folder"){
                this.showFiles("/")
            }else if (file.type === "folder"){
                this.showFiles(file.location+"/"+file.filename)
            }else{
                this.showFileInfo()
            }
        },

        render: function(args) {
            var files = args.files
            this.$el.html(this.template(args));
        },

        events : {
            "click #newFolder":"showNewFolder"
            , "click #createFolderBtn": "toggleFolderInput"
            , "change #folderNameInput": "createNewFolder"
            , "click #deleteFolder":"deleteFolder"
            , "click .file":"openFile"
            , "click .breadcrumb" : "handleBreadcrumb"
        },

        handleBreadcrumb : function(e){
          var index = this.$el.find("#filePath .breadcrumb").index(e.target)
          , fsParts = _.without(this.model.get('fsLocation').split('/'), "") //clean extra '/' from the string
          fsParts.splice(index+1)

          this.model.set("fsLocation","/"+fsParts.join("/"))
          e.preventDefault()
        },

        toggleFolderInput: function(){
            this.$el.find("#folderNameSub").toggleClass("open")
        },

        openFile : function(e){
          var filename = e.target.textContent
          debugger

          //check if this is a file or a folder
          fileObj = this.model.lsla(filename)

          if (fileObj.type === "folder"){
            //someone will deal with this, they need to change the fsLocation of the model and this view should automatically update
            this.trigger("fs:folder:open", fileObj.filename)
          }else{
            //tell someone to focus on this file!
            this.trigger("fs:file:open", fileObj)
          }

          this.$el.find(".file").removeClass("selectedFile")
          $(e.target).parent().addClass('selectedFile')

            
        },

        deleteFolder : function(){
            //TODO show warning
            
            
            var parentFsLocation = this.model.get('userBlob').getParentFsLocation(this.model.get('fsLocation'))
            , folder = this.model.getFile()


            this.model.deleteFolder(parentFsLocation, folder.filename)

            //this.model.set('fsLocation',this.file.location)
        },

        showNewFolder : function(){
            this.$el.find('#folderNameInput').show()
        },

        createNewFolder : function(evt){
            var folderName = evt.target.value

            this.model.addFolder(folderName)

            evt.target.value = ""
            this.toggleFolderInput()

            this.updateView()

        },



        showFiles: function(loc){
            loc = loc ||  "/"

            var files = this.model.ls()
            , inRoot = false
            , fsParts = _.without(loc.split('/'), "") //clean extra '/' from the string
            , fsLocation = "/" + fsParts.join("/")

            if (fsLocation === "/"){
              inRoot = true
            }

            this.render({files:files, folder: this.model.getFile(), fsLocation:fsLocation, inRoot: inRoot, fsParts: fsParts})
            return files
        },


        //File location should be in the form of /coolPics/me.jpg or /coolPics
        showFileInfo: function(){
            var file = this.model.getFile()
            , fsLocation = this.model.get('fsLocation')

            if (file && file.type != "folder"){
                //var singleFileInfo = new SingleFileInfo({el:this.el, model:this.model})
                //singleFileInfo.render({file:file, fileLocation:fsLocation})
            }
        },

    })
})
