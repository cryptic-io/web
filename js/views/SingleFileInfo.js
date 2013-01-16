//returns the single file info view, responsible for the look of the info of a file, gives you options to download the file, delete the file, or move the file
define(["jade!templates/SingleFileInfo", "tools/humanReadableByteLength"], function(fileTemplate, hrByteLength){ 
    var api = {
    }

    return Backbone.View.extend({
        template: fileTemplate,

        initialize: function(){
        },

        render: function(args) {
            this.file = args.file

            debugger;
            var bytes = args.file.size
            , sizeUnit = hrByteLength.calcHumanReadableSize(bytes)
            , size = hrByteLength.truncateBytes(bytes)
            , fileLocation = args.fileLocation
            , downloadLink = location.origin+'/#download/'+this.file.link

            fileLocation = ['/'].concat(_.without(fileLocation.split('/'), "")) //array of the parts of the file

            this.$el.html(this.template({file:args.file, size:size, sizeUnit:sizeUnit, fileLocation:fileLocation, downloadLink:downloadLink}));

        },

        events: {
            "click #downloadButton": "downloadFile"
            , "click #deleteButton": "deleteFile"
        },

        downloadFile : function(){
            window.open(location.origin+'/#download/'+this.file.link)
        },

        deleteFile : function(){
            var fsLocation = this.model.get('fsLocation')
            , userBlob = this.model.get('userBlob')
            , parentLocation = userBlob.getParentFsLocation(fsLocation)
            this.model.removeFile(this.file.location, this.file.filename)
            this.model.set('fsLocation', parentLocation)
        },

    })
})
