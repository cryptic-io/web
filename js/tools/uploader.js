//helper tool to upload files 
var Uploader = function() {
};

Uploader.prototype = {

    send : function(location, arraybuffer, fileName, progressListener, callback) {
        if (progressListener) progressListener({event:"Uploading", progress:0});

        var xhr = new XMLHttpRequest();

        xhr.open("POST", location, true);
        xhr.responseType = 'text';
        xhr.onload = function(e) {
            if (this.status == 200) {
                callback(xhr.responseText);
                if (progressListener) progressListener({event:"Uploading", progress:100});
            }
        };

        //setup the progressListener
        xhr.upload.onprogress = function(e){
            if (e.lengthComputable){
                var progress = (e.loaded / e.total) * 100;
                if (progressListener) progressListener({event:"Uploading", progress:progress});
            }
        }

        // finally send the request as binary data (really an arraybuffer)
        xhr.send(arraybuffer)
    },

};

//define for requirejs
define(function(){return Uploader});
