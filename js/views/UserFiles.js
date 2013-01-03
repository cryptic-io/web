//returns the Userfiles view, responsible for the look of the fs
define(["jade!templates/UserFiles", "views/SingleFileInfo"], function(filesTemplate, SingleFileInfo){ 
    return Backbone.View.extend({
        template: filesTemplate,

        initialize: function(){
            //react to the changes in the fsLocation
            this.listenTo(this.model,'change:fsLocation',this.updateView)
            this.listenTo(this.model,'change:loggedIn',this.updateView)
            //check if the fs has changed
            this.listenTo(this.model,'change:fs',this.updateView)


        },

        updateView: function(){
            //make sure we only draw the view if the user is logged In
            if (this.model.get('loggedIn') == false) return

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
            this.$el.html(this.template({files:files}));
        },

        showFiles: function(loc){
            loc = loc ||  "/"

            var files = this.model.ls()

            this.render({files:files})
            return files
        },


        //File location should be in the form of /coolPics/me.jpg or /coolPics
        showFileInfo: function(){
            var file = this.model.getFile()
            , fsLocation = this.model.get('fsLocation')

            if (file && file.type != "folder"){
                var singleFileInfo = new SingleFileInfo({el:this.el})
                singleFileInfo.render({file:file, fileLocation:fsLocation})
            }
        },

    })
})
