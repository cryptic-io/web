//helper tool to upload files 
var Uploader = function() {
};

Uploader.prototype = {

    send : function(location, arraybuffer, fileName, callback) {
        var xhr = new XMLHttpRequest();

        xhr.open("POST", location, true);
        xhr.responseType = 'text';
        xhr.onload = function(e) {
            if (this.status == 200) {
                callback(xhr.responseText);
            }
        };

        // finally send the request as binary data (really an arraybuffer)
        xhr.send(arraybuffer);
    },

};

//define for requirejs
define(function(){return Uploader});
