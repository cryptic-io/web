//helper tool to upload files 
var Uploader = function() {
};

Uploader.prototype = {
    headers : {
        //"Accept-Charset":"utf-8"
    },

    send : function(location, arraybuffer, fileName, callback) {
        var xhr = new XMLHttpRequest();

        xhr.open("POST", location, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                callback(xhr.responseText);
            }
        };

        for (var header in this.headers) {
            xhr.setRequestHeader(header, this.headers[header]);
        }

        // finally send the request as binary data (really an arraybuffer)
        xhr.send(arraybuffer);
    },

};

//define for requirejs
define(function(){return Uploader});
