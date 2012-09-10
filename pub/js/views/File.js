//returns the file view
define(["models/File"], function(FileModel){ 
    return Backbone.View.extend({

        tagName: "div",

        className: "fileIn",

        initialize: function(){
            this.on("fileLoaded", this.fileLoaded);
        },

        template: _.template($('#file-input-template').html()),

        render: function(){
            this.$el.html(this.template());
            this.fileInput = this.$el.find('#file-input')[0];
            return this.$el;
        },

        //might want to change this to get rid of jquery completely
        events: {
            "change #file-input" : "loadFile",
            "click #uploadFile" : "uploadFile",
        },

        //read the file from the input
        loadFile: function(event){
            var fileObj = this.fileInput.files[0];
            this.model = new FileModel({file: fileObj});
            model = this.model;
            this.trigger('fileLoaded');
        },

        uploadFile: function(){
            var model = this.model;
            model.upload(function(linkData){
                alert('linkName: '+linkData.linkName+'. Passcode:  '+linkData.IVKey)
            })
        },

        fileLoaded: function(){
            console.log('file has been loaded!');
        }


    })
});
