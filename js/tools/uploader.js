//define for requirejs
define(["tools/Multipass"], function(Multipass){
  var multipass = new Multipass()

  //helper tool to upload files 
  var Uploader = function() {
  };

  Uploader.prototype = {

      // Extra options will be thrown into the X-Extra-Data header
      send : function(location, arraybuffer, fileName, progressListener, callback, extraOptions) {
          if (progressListener) progressListener({event:"Uploading", progress:0});

          var xhr = new XMLHttpRequest();

          xhr.open("POST", location, true);
          xhr.responseType = 'text';
          xhr.onload = function(e) {
              if (this.status == 200) {
                  if (progressListener) progressListener({event:"Uploading", progress:100});
                  callback(xhr.responseText);
              }
          };

          var send = this.send
          , that = this;
          xhr.onerror = function(e) {
              console.error("there was an error",e)
              send.apply(that,[location, arraybuffer, fileName, progressListener, callback])
          }

          //setup the progressListener
          xhr.onprogress = function(e){
              if (e.lengthComputable){
                  var progress = (e.loaded / e.total) * 100;
                  if (progressListener) progressListener({event:"Uploading", progress:progress});
              }
          }

          

          // finally send the request as binary data (really an arraybuffer)
          multipass.checkMultipass()
            .then(function(multipassData){
              // Put in the extra data!!!
              extraOptions.multipass = JSON.parse(multipassData).multipass
              xhr.setRequestHeader("X-Extra-Data", JSON.stringify(extraOptions))
              xhr.send(arraybuffer)
            })
      },

  };

  return Uploader
});
