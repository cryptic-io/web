//returns the file view
define(["models/File","views/Progress", "jade!templates/FileUpload"], function(FileModel, ProgressView, template){ 
    return Backbone.View.extend({

        tagName: "div",

        className: "fileIn",

        initialize: function(){
            this.on("fileLoaded", this.fileLoaded);
        },

        template: template,

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
            var progressView = new ProgressView({container:$("body")})
            progressView.render()
            model.set('progressView',progressView)
            model.upload(function(linkData){
                //alert('#download/'+linkData.linkName+'|'+linkData.IVKey)
                console.log('an alert would have happened here','#download/'+linkData.linkName+'|'+linkData.IVKey)
                progressView.remove()
                model.destroy()
            })
        },

        downloadFile: function(linkName, passcode, callback){
            var progressView = new ProgressView({container:$("body")})
            progressView.render()
            this.model = new FileModel();
            this.model.set('progressView',progressView)
            this.model.download(linkName, passcode, callback);
        },

        fileLoaded: function(){
            console.log('file has been loaded!');
        },

        createDownloadLink: function(){
            this.model.getFileEntry(_.bind(function(fileEntry){
                var a = document.createElement('a')
                a.download = this.manifest.get('name')
                a.href = fileEntry.toURL();
                a.innerText='DOWNLOAD FILE'
                document.body.appendChild(a)
            },this.model))

        }


    })
});
