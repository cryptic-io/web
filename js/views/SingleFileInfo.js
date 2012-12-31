//returns the single file info view, responsible for the look of the info of a file, gives you options to download the file, delete the file, or move the file
define(["jade!templates/SingleFileInfo", "models/UserBlob"], function(fileTemplate, UserBlob){ 
    var api = {
    }

    return Backbone.View.extend({
        template: fileTemplate,

        initialize: function(){
        },

        render: function(args) {
            var bytes = args.file.size
            , sizeUnit = this.calcHumanReadableSize(bytes)
            , size = this.truncateBytes(bytes)
            this.$el.html(this.template({file:args.file, size:size, sizeUnit:sizeUnit}));

            this.file = args.file
        },

        events: {
            "click #downloadButton": "downloadFile"
        },

        downloadFile : function(){
            window.open(location.origin+'/#download/'+this.file.link)
        },

        calcHumanReadableSize: function(bytes){
            var sizeMap = {
                3 : "KB"
                , 6 : "MB"
                , 9 : "GB"
                , 12: "TB"
                , 15: "PB"
            }

            var placeCount = bytes.toString().length
            , humanReadableSizes = _.filter(sizeMap, function(name, key){ return placeCount > key })

            if (humanReadableSizes.length > 0) return _.last(humanReadableSizes)
            else return "Bytes"
        },

        //only return the top 3 numbers of the bytes so 123456 would just be 123
        truncateBytes: function(bytes){
            return bytes.toString().substr(0,3)
        }
    })
})
