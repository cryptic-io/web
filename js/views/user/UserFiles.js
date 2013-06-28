//returns the Userfiles view, responsible for the look of the fs
define(["jade!templates/user/UserFiles", "views/user/SingleFileInfo"], function(filesTemplate, SingleFileInfo){ 
    return Backbone.View.extend({
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

            if (file.type === "folder"){
                this.showFiles()
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
            , "change #folderNameInput": "createNewFolder"
            , "click #deleteFolder":"deleteFolder"
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
            debugger

            var folderName = evt.target.value

            this.model.addFolder(folderName)

            this.$el.find('#folderNameInput').hide()
        },



        showFiles: function(loc){
            loc = loc ||  "/"

            var files = this.model.ls()
            , fsLocation = this.model.get('fsLocation')

            //location that can be put with a filename something like /a.file and /afolder/b.file so / and /afolder/ respectively
            fsLocation = '/' == fsLocation ? '/' : fsLocation + '/'

            this.render({files:files, folder: this.model.getFile(), fsLocation:fsLocation})
            return files
        },


        //File location should be in the form of /coolPics/me.jpg or /coolPics
        showFileInfo: function(){
            var file = this.model.getFile()
            , fsLocation = this.model.get('fsLocation')

            if (file && file.type != "folder"){
                var singleFileInfo = new SingleFileInfo({el:this.el, model:this.model})
                singleFileInfo.render({file:file, fileLocation:fsLocation})
            }
        },

    })
})
