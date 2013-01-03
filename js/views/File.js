//returns the file view
define(["models/File","views/Progress", "jade!templates/FileUpload", "jade!templates/FileDownload"], function(FileModel, ProgressView, fileUploadTemplate, fileDownloadTemplate){ 
    return Backbone.View.extend({

        tagName: "div",

        className: "fileIn",

        initialize: function(){
            this.on("fileLoaded", this.fileLoaded);

            if (this.options.template == "download") this.template = fileDownloadTemplate
            else this.template = fileUploadTemplate
        },

        template: fileUploadTemplate,

        render: function(){
            this.$el.html(this.template());
            this.fileInput = this.$el.find('#file-input')[0];
            this.hideUploadAnother()
            return this.$el;
        },

        //might want to change this to get rid of jquery completely
        events: {
            "change #file-input" : "loadFile",
            "click #uploadFile" : "uploadFile",
            "click #uploadAnother" : "render",
            "dragover #dragDropUpload" : "handleDragOver",
            "drop #dragDropUpload" : "handleFileDrop",

        },

        handleFileDrop: function(evt){
            evt.stopPropagation();
            evt.preventDefault();
            var fileObj = evt.dataTransfer.files[0]
            this.model = new FileModel({file: fileObj});
            this.trigger('fileLoaded')
        },

        handleDragOver: function(evt){
            evt.stopPropagation();
            evt.preventDefault();
            evt.dataTransfer.dropEffect = 'copy'; //show it is a copy 
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
            var progressView = new ProgressView({container:$("#progressBarContainer")})
            model.set('progressView',progressView)
            this.convertToProgressBar();
            model.upload(_.bind(function(linkData){
                //alert('#download/'+linkData.linkName+'|'+linkData.IVKey)
                console.log('an alert would have happened here','#download/'+linkData.linkName+'/'+linkData.IVKey)
                progressView.remove()
                model.destroy()
                this.displayDownloadLink(location.origin+'/#download/'+linkData.linkName+'/'+linkData.IVKey)
                this.showUploadAnother()

                //trigger the file uploaded event
                this.trigger('fileUploaded',
                             {link:linkData.linkName+'/'+linkData.IVKey
                             , filename:this.model.get('file').name
                             , size: this.model.get('file').size
                             , type: this.model.get('file').type})

            },this))
        },

        downloadFile: function(linkName, passcode, callback){
            var progressView = new ProgressView({container:$("#progressBarContainer")})
            progressView.render()
            this.model = new FileModel();
            this.model.set('progressView',progressView)
            this.model.download(linkName, passcode, callback);
        },


        fileLoaded: function(){
            console.log('file has been loaded!');
            var filename = this.model.get('file').name;
            this.$el.find('#dragDropUpload > #filename').html(filename);
        },

        createDownloadLink: function(){
            this.model.getFileEntry(_.bind(function(fileEntry){
                var a = document.createElement('a')
                a.download = this.model.manifest.get('name')
                a.href = fileEntry.toURL();
                a.innerText='DOWNLOAD FILE'

                //place it in the html
                this.$el.find('#downloadFile').html(a)


            },this))

        },

        convertToProgressBar: function(){
            var dragDropUpload = this.$el.find('#dragDropUpload')
            , uploadFileButton = this.$el.find('#uploadFile')


            //hide the button no need for it anymore
            uploadFileButton.hide()
            
            
            //clear the text
            dragDropUpload.find('#dndInfo').text('')
            dragDropUpload.find('#filename').text('')
            
            //change the message to tell the user uploading is happening
            this.$el.find('#headerText').text('Encrypting and Uploading the file...')


            var progressView = this.model  ? this.model.get('progressView') : {render:function(){}}
            $(dragDropUpload).anim({height:"5px"}, 1, 'linear',function(){
                progressView.render();
            })
        },

        displayDownloadLink:function(link){
            var dragDropUpload = this.$el.find('#dragDropUpload');
            var downloadLink = this.$el.find('#downloadLink')

            downloadLink.show();

            //set the value of the text
            downloadLink.val(link)

            //set the helpful header text
            this.$el.find('#headerText').text('File has been encrypted and uploaded, the link below is your key to your cryptic goodness!')

            //hide the upload box
            dragDropUpload.css('height','5px')

            downloadLink.focus()
            //run the native DOM code
            downloadLink[0].select()
        },

        showUploadAnother : function(){
            this.$el.find('#uploadAnother').show()
        },

        hideUploadAnother : function(){
            this.$el.find('#uploadAnother').hide()
        }


    })
});
