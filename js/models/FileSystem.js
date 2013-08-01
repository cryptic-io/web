//returns a filesystem singleton, this is for chrome's filesystem api, not to be confused with the user's filesystem
define([],function(){ 
    //precent webworkers from crashing because they try to access the filesystem
    if (typeof(window) === "undefined"){
      return {}
    }

    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem



    FileSystem = function(){
        if ( arguments.callee._singletonInstance ){
            return arguments.callee._singletonInstance
        }
        arguments.callee._singletonInstance = this;
    };

    FileSystem.prototype = {

        size:0,

        fileSystemLoaded: false,
        
        defaultErrCallback: function(e){
            var msg = '';

            switch (e.code) {
              case FileError.QUOTA_EXCEEDED_ERR:
                msg = 'QUOTA_EXCEEDED_ERR';
                break;
              case FileError.NOT_FOUND_ERR:
                msg = 'NOT_FOUND_ERR';
                break;
              case FileError.SECURITY_ERR:
                msg = 'SECURITY_ERR';
                break;
              case FileError.INVALID_MODIFICATION_ERR:
                msg = 'INVALID_MODIFICATION_ERR';
                break;
              case FileError.INVALID_STATE_ERR:
                msg = 'INVALID_STATE_ERR';
                break;
              default:
                msg = 'Unknown Error';
                break;
            };

            console.error('Error: ' + msg);
        },

        //This should only be called once, with the requested filesystem being cached under this.fs
        initializeFileSystem: function(requestedSizeInBytes, callback, errCallback){
            var that = this
            errCallback = errCallback || this.defaultErrCallback
            this['size']=requestedSizeInBytes

            //First lets ask for space, please!
            navigator.webkitTemporaryStorage.requestQuota(requestedSizeInBytes*10,
              function(grantedBytes){
                //We got the space, nice! now we ask for the filesystem, with a pretty please
                requestFileSystem(TEMPORARY, requestedSizeInBytes*10, 
                function(fs){ 
                  //we got the fs, now let's cache that sucker
                  that.fileSystemLoaded = true
                  that.fs = fs
                  if (typeof(callback) !== "undefined") callback(fs)
                }, 
                errCallback )
              },
              errCallback)
        },

        requestMoreSpace:function(spaceInBytes, callback, errCallback){
            var newSize = this['size'] + spaceInBytes;
            errCallback = errCallback || this.defaultErrCallback
            this.initializeFileSystem(newSize, callback, errCallback)
        },

        getFileSystem: function(callback, errCallback, size){
            size = size || this.size
            //console.log('this size is gonna be', size)
            errCallback = errCallback || this.defaultErrCallback
            if (this.fileSystemLoaded){
              callback(this.fs)
            }else{
              this.initializeFileSystem(size, callback, errCallback)
            }
        },

    }

    return FileSystem;

});
