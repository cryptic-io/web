//returns the file view
define(["models/File","views/Progress", "jade!templates/FileUpload", "jade!templates/FileDownload", "jade!templates/UploadingFileRows", "tools/humanReadableByteLength"], function(FileModel, ProgressView, fileUploadTemplate, fileDownloadTemplate, uploadingFileRowsTemplate, hrByteLength){ 
    return Backbone.View.extend({

        tagName: "div",

        className: "fileIn",

        initialize: function(){

            this.fileList = []

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
            "click #uploadFiles" : "uploadFiles",
            "click #uploadAnother" : "render",
            "click #removeFiles" : "removeFiles",
            "click #cancelUpload" : "removeFiles",

            "change #topCheckbox":"changeAllCheckboxes",
            "change .open input" : "addFilesThroughInput",

            "drop #upload": "handleFileDrop",
            "dragenter #upload": "handleDragEnter",
            "dragleave #upload": "handleDragLeave",
            "dragover #upload": "handleDragOver",
        },

        cancelUpload: function(){
            if (this.fileModels){
                _.each(this.fileModel, function(fileModel){ fileModel.destroy() })
            }
        },

        changeAllCheckboxes: function(){
            var rows = this.$el.find('.file-table > .files > .row')
            , checkState = this.$el.find('#topCheckbox').prop('checked')

            _.each(rows, function(row){$(row).find('input').prop('checked',checkState)})
        },

        removeFiles: function(){
            var rows = this.$el.find('.file-table > .files > .row')

            this.fileList = _.reject(this.fileList, function(file, index){
                //check the rows see which are marked for deletion
                return rows.eq(index).find('input').prop('checked')
            })

            this.showFilesToBeUploaded(this.fileList)
        },

        addFilesThroughInput: function(evt){
            var files = evt.target.files
            this.processFiles(files);
        },

        processFiles: function(files){

            //concat the files, we need to use map in order to convert fileList into array
            this.fileList = this.fileList.concat(_.map(files, function(f){return f}))

            this.showFilesToBeUploaded(this.fileList)
        },

        handleFileDrop: function(evt){
            evt.stopPropagation();
            evt.preventDefault();
            $(evt.target).removeClass("dragEnter");


            var files = evt.dataTransfer.files
            this.processFiles(files)

        },

        showFilesToBeUploaded: function(files){

            //render the file rows
            files = _.map(files, function(file){ 
                file.humanReadableSize=hrByteLength.prettyFormat(file.size)
                if (file.name.length > 20){
                    file.shortName = file.name.substr(0,20)+'...'
                } else { 
                    file.shortName = file.name 
                }

                return file 
            })
            
            this.$el.find('.file-table > .files').html(uploadingFileRowsTemplate({files:files}))


            
            if (!this.animated){
                this.$el.find(".upload").animate({ "height" : 150 }, 300);
                this.$el.find(".upload-message").animate( { "top" : 90 }, 300);
                this.$el.find(".upload-status").animate( { "height" : 150 }, 300);
                this.$el.find(".upload-panel").animate( { "left" : 20 }, 300);
                this.$el.find(".upload-add-files").animate( { "left" : $(".page").width() - $(".open").width() - 20 }, 300);
                this.$el.find(".file-table").slideDown(300);
            }

            this.animated=true
        },

        handleDragOver: function(evt){
            evt.stopPropagation();
            evt.preventDefault();
            //evt.dataTransfer.dropEffect = 'copy'; //show it is a copy 
        },

        handleDragEnter: function(e){
            console.log("dragenter");
            $(e.target).addClass("dragEnter");
        },

        handleDragLeave: function(e){
            console.log("dragleave");
            $(e.target).removeClass("dragEnter");
        },


        //read the file from the input
        loadFile: function(event){
            var fileObj = this.fileInput.files[0];
            this.model = new FileModel({file: fileObj, user:this.options.user});
            model = this.model;
        },

        uploadFiles: function(){
            var files = _.map(this.fileList, _.bind(function(file){ return (new FileModel({file:file, user:this.options.user}))},this))
            , progressBars = this.$el.find('.files > .row .progress')

            //remember the filemodels so we can destroy them if we want to cancel the upload
            this.fileModels = files

            this.uploadFilesRecursively(files, progressBars)
        },

        uploadFilesRecursively: function(files, progressBars){
            if (files.length != progressBars.length){
                console.error('Files length and progress bars length do not match')
                return 
            }

            if (files.length == 0){
                return 
                //Finished uploading 
            }

            this.uploadFile(files[0], progressBars[0], _.bind(this.uploadFilesRecursively, this, _.rest(files), _.rest(progressBars)))
        },

        uploadFile: function(fileModel, progressBarEl, callback){

            var progressView = new ProgressView({container:$(progressBarEl)})
            fileModel.set('progressView',progressView)
            progressView.render()
            fileModel.upload(_.bind(function(linkData){
                console.log('an alert would have happened here','#download/'+linkData.linkName+'/'+linkData.IVKey)
                fileModel.destroy()

                console.log('download link',location.origin+'/#download/'+linkData.linkName+'/'+linkData.IVKey)
                progressView.displayLink(location.origin+'/#download/'+linkData.linkName+'/'+linkData.IVKey)

                //trigger the file uploaded event
                this.trigger('fileUploaded',
                             {link:linkData.linkName+'/'+linkData.IVKey
                             , filename:fileModel.get('file').name
                             , size: fileModel.get('file').size
                             , type: fileModel.get('file').type
                })

                callback()
            },this))
        },

        downloadFile: function(linkName, passcode, callback){
            $('#progressBarContainer').css({
                width: "100%"
                , height: "20px"
            })

            var progressView = new ProgressView({container:$("#progressBarContainer")})
            progressView.render()
            this.model = new FileModel()
            this.model.set('progressView',progressView)
            this.model.download(linkName, passcode, callback)
        },


        createDownloadLink: function(){
            this.model.getFileEntry(_.bind(function(fileEntry){
                var a = document.createElement('a')
                a.download = this.model.manifest.get('name')
                a.href = fileEntry.toURL()
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
