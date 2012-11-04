//helper tool to upload files 
var Uploader = function() {
};

Uploader.prototype = {

    send : function(location, arraybuffer, fileName, progressListener, callback) {
        var xhr = new XMLHttpRequest();

        xhr.open("POST", location, true);
        xhr.responseType = 'text';
        xhr.onload = function(e) {
            if (this.status == 200) {
                callback(xhr.responseText);
            }
        };

        //setup the progressListener
        xhr.upload.onprogress = function(e){
            if (e.lengthComputable){
                debugger;
                var progress = (e.loaded / e.total) * 100;
                if (progressListener) progressListener(progress);
            }
        }

        // finally send the request as binary data (really an arraybuffer)
        xhr.send(new Blob([arraybuffer], {type: 'application/octet-stream'}))
        debugger;
    },

};

//define for requirejs
define(function(){return Uploader});
