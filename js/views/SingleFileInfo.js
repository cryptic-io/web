//returns the single file info view, responsible for the look of the info of a file, gives you options to download the file, delete the file, or move the file
define(["jade!templates/SingleFileInfo", "models/UserBlob", "tools/humanReadableByteLength"], function(fileTemplate, UserBlob, hrByteLength){ 
    var api = {
    }

    return Backbone.View.extend({
        template: fileTemplate,

        initialize: function(){
        },

        render: function(args) {
            var bytes = args.file.size
            , sizeUnit = hrByteLength.calcHumanReadableSize(bytes)
            , size = hrByteLength.truncateBytes(bytes)
            , fileLocation = args.fileLocation

            fileLocation = ['/'].concat(_.without(fileLocation.split('/'), "")) //array of the parts of the file

            this.$el.html(this.template({file:args.file, size:size, sizeUnit:sizeUnit, fileLocation:fileLocation}));

            this.file = args.file
        },

        events: {
            "click #downloadButton": "downloadFile"
        },

        downloadFile : function(){
            window.open(location.origin+'/#download/'+this.file.link)
        },

    })
})
