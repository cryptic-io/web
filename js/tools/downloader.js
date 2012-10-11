//helper tool to download
var debug = false;
var Downloader = function() {
};

Downloader.prototype = {
    getFileKeys: function(linknames, callback){
        var request = {filenames:linknames}

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/getFileKeys', true);
        xhr.responseType = 'text';
        xhr.onload = function(e) {
          if (this.status == 200) {
            console.log(this.response);
            try {
                var fileKeys = JSON.parse(this.response).return
                var fileKeysObj = {}
                fileKeys.forEach(function(fileKey){ fileKeysObj[fileKey.filename] = fileKey.key })
                if (typeof callback != 'undefined') callback(fileKeysObj)
            }catch(err){
                //I really shouldn't have to this so often, so call stack should be fine
                console.error('There was an error',err)
                Downloader.prototype.getFileKeys(linknames, callback);
                return;
            }
          }
        };
        xhr.send(JSON.stringify(request));
    },

    downloadFile: function(linkname, key, callback){
        request = {command:"downloadFile",filename:linkname,key:key,"meta":{"http":true}}

        var xhr = new XMLHttpRequest();
        var nemo = debug ? "http://localhost:8888" : "http://crypticcandy.com:8888";
        xhr.open('POST', nemo, true);

        xhr.responseType = 'arraybuffer';
        xhr.setRequestHeader('Content-Type','text/plain')

        xhr.onload = function(e) {
          if (this.status == 200) {
            //console.log(this.response);
            if (callback) callback(this.response)
          }
        };

        xhr.send( JSON.stringify(request) );
        //$.post(nemo,request, xhr.onload); 
        
    },

    //a helper function
    getKeyAndDownload: function(linkname, callback){
        this.getFileKeys([linkname], _.bind(function(fileKeyObj){
            var key = _.values(fileKeyObj)[0]
            this.downloadFile(linkname,key, callback)
        },this))
    }
}

//define for requirejs
define(function(){return Downloader});
