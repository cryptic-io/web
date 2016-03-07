//returns the file view
define(
    ["core/q", "models/File","views/ProgressBars", "jade!templates/FileUpload", "tools/humanReadableByteLength", "tools/errors"]
    , function(Q, FileModel, ProgressBarsView, fileUploadTemplate, hrByteLength, errors){ 
    return Backbone.View.extend({

        id : "uploadBoxContainer",
        className : "floatingContainer",

        initialize: function(){

            this.fileList = []

            //because the progress bars are rendered inside here, lets keep a promise when the user begins to upload a file
            //this is so that we can easily know when a user begins uploading
            
            this.uploadDeffered = Q.defer()

            // do the same thing as above but for download
            this.downloadDeffered = Q.defer()

            this.template = fileUploadTemplate

        },

        template: fileUploadTemplate,

        render: function(){
            this.$el.html(this.template());

            //lets make the handleFilePicker a global reference so that the filepicker can call it on its onchange attribute
            _fileView_handleFilePicker = _.bind(this.handleFilePicker, this)
            this.$el.find('#filePicker').attr("onchange", "_fileView_handleFilePicker(this.files)")

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
            "click #filePickerBtn" : "openFilePicker",

        },

        handleFilePicker: function(files){
          this.uploadFiles(files)
        },

        openFilePicker:function(){
          console.log("opening file picker")
          this.$el.find("#filePicker")[0].click()
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
            console.log("drag dropped")
            evt.stopPropagation();
            evt.preventDefault();
            $(evt.target).parent().removeClass("dragEnter");


            var files = (evt.dataTransfer || evt.originalEvent.dataTransfer).files
            this.uploadFiles(files)

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
            // It references the p elem instead of the inner border elem we want
            $(e.target).parent().addClass("dragEnter");
        },

        handleDragLeave: function(e){
            console.log("dragleave");
            // It references the p elem instead of the inner border elem we want
            $(e.target).parent().removeClass("dragEnter");
        },


        //read the file from the input
        loadFile: function(event){
            var fileObj = this.fileInput.files[0];
            this.model = new FileModel({file: fileObj, user:this.options.user});
            model = this.model;
        },

        uploadFiles: function(files){
            files = _.map(files, _.bind(function(file){ return (new FileModel({file:file, user:this.options.user}))},this))

            //broadcast that we are starting to upload
            this.trigger("file:start:upload")

            //remember the filemodels so we can destroy them if we want to cancel the upload
            this.fileModels = files
            this.trigger("file:list", files)

            this.uploadFilesRecursively(files, 0)
        },

        uploadFilesRecursively: function(files, fileIndex){
            if (files.length == 0){
                this.trigger("file:uploaded:all")
                return 
                //Finished uploading 
            }

            this.uploadFile(files[0], fileIndex, _.bind(this.uploadFilesRecursively, this, _.rest(files), fileIndex+1))
        },

        uploadFile: function(fileModel, fileIndex, callback){

            var origin = window.location.protocol + "//" + window.location.host

            //listen to the progress of the file, and pass it up with the fileIndex attached
            this.listenTo(fileModel,'file:progress',function(progress){ this.trigger("file:progress",fileIndex, progress) })

            fileModel.upload(_.bind(function(linkData){
                console.log('an alert would have happened here','#download/'+linkData.linkName+'/'+linkData.IVKey)
                fileModel.destroy()
                var downloadLink = origin+'/#download/'+linkData.linkName+'/'+linkData.IVKey

                console.log('download link',downloadLink)
                //trigger the file uploaded event
                this.trigger("file:uploaded",fileIndex, 
                             {link:linkData.linkName+'/'+linkData.IVKey
                             , filename:fileModel.get('file').name
                             , size: fileModel.get('file').size
                             , type: fileModel.get('file').type})

                callback()
            },this), _.bind(function(error){
              alert(errors[error.error])
              this.trigger("file:error",error)
            }, this))
        },

        downloadFile: function(linkName, passcode, callback){

            this.model = new FileModel({user:this.options.user})

            this.trigger("file:start:download")

            this.listenTo(this.model,'file:progress',function(progress){ this.trigger("file:progress",0, progress) })
            this.listenTo(this.model,'file:name',_.bind(function(name){this.trigger("file:name",name)},this))

            this.model.download(linkName, passcode, _.bind(function(){this.trigger("file:downloaded");callback()},this))
        },


        createDownloadLink: function(){
            this.model.getFileEntry(_.bind(function(fileEntry){
                this.trigger("file:url",{url:fileEntry.toURL(), name: fileEntry.name})
                //var filename = this.downloadProgressView.text()
                //this.downloadProgressView.link(fileEntry.toURL(), "Save "+filename)
                //clear the old text
                //this.downloadProgressView.text("")
            },this))

        },

    })
});
