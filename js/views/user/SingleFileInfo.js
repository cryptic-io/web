//returns the single file info view, responsible for the look of the info of a file, gives you options to download the file, delete the file, or move the file
define(["jade!templates/user/SingleFileInfo", "tools/humanReadableByteLength"], function(fileTemplate, hrByteLength){ 
    var api = {
    }

    return Backbone.View.extend({
        template: fileTemplate,

        id : "SingleFileInfoContainer",
        className : "floatingContainer",

        initialize: function(){
        },

        render: function(args) {
            this.file = args.file

            var bytes = args.file.size
            , sizeUnit = hrByteLength.calcHumanReadableSize(bytes)
            , size = hrByteLength.truncateBytes(bytes)
            , origin = window.location.protocol + "//" + window.location.host
            , downloadLink = origin+'/#download/'+this.file.link

            this.downloadLink = downloadLink

            this.$el.html(this.template({file:args.file, size:size, sizeUnit:sizeUnit, downloadLink:downloadLink}));

        },

        events: {
            "click .downloadBtn": "downloadFile"
            , "click .deleteBtn": "deleteFile"
            , "click .shareBtn" : "toggleShareOptions"
            , "click #normalLink":"createNormalLink"
        },

        downloadFile : function(){
            window.open(this.downloadLink)
        },

        deleteFile : function(){
            var fsLocation = this.model.get('fsLocation')
            , userBlob = this.model.get('userBlob')
            , parentLocation = userBlob.getParentFsLocation(fsLocation)
            this.model.removeFile(this.file.location, this.file.filename)
            this.model.set('fsLocation', parentLocation)
            this.trigger("fs:file:delete",fsLocation)
        },

        toggleShareOptions : function(){
            this.$el.find("#sharing .subItems").toggleClass("open")
        },

        createNormalLink : function(){
            //we already created the link
            if ( this.$el.find("#normalLink input").length > 0) return

            this.$el.find("#normalLink p").hide()
            this.$el.find("#normalLink").append($("<input type=text onclick='this.select()'>"))
            this.$el.find("#normalLink input").val(this.downloadLink)

        },



    })
})
