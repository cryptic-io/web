//returns the Userfiles view, responsible for the look of the fs
define(["jade!templates/UserFiles", "models/UserBlob"], function(filesTemplate, UserBlob){ 
    var api = {
    }

    return Backbone.View.extend({
        template: filesTemplate,

        initialize: function(){
            this.currentDirectory = "/"
        },

        render: function(args) {
            var userBlob = this.options.userBlob
            , files = args.files
            this.$el.html(this.template({files:files}));
        },
    })
})
