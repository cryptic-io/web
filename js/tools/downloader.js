//helper tool to download
var debug = true;
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
            if (callback) callback(JSON.parse(this.response).return)
          }
        };
        xhr.send(JSON.stringify(request));
    },

    downloadFile: function(linkname, key, callback){
        var request = {command:"downloadFile",filename:linkname,key:key,"meta":{"http":true}}

        var xhr = new XMLHttpRequest();
        var nemo = debug ? "http://localhost:8888/" : "http://crypticcandy.com:8888";
        xhr.open('POST', nemo, true);

        xhr.responseType = 'text';
        //xhr.setRequestHeader('Content-Type','text/plain')
        xhr.setRequestHeader('Content-Type','application/octet-stream')

        xhr.onload = function(e) {
          if (this.status == 200) {
            console.log(this.response);
            if (callback) callback(this.response)
          }
        };

        xhr.send( JSON.stringify(request) );
        //$.post(nemo,request, xhr.onload); 
        
    },

    //a helper function
    getKeyAndDownload: function(linkname, callback){
        this.getFileKeys([linkname], _.bind(function(response){
            var key = response[0].key
            this.downloadFile(linkname,key, callback)
        },this))
    }
}

//define for requirejs
define(function(){return Downloader});
