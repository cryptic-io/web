//returns a filesystem singleton 
define([],function(){ 
    requestFileSystem = webkitRequestFileSystem 


    FileSystem = function(){
        if ( arguments.callee._singleton ){
            return arguments.callee._singleton
        }
        arguments.callee._singletonInstance = this;
    };

    FileSystem.prototype = {

        size:0,
        
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

        initializeFileSystem: function(requestedSizeInBytes, callback, errCallback){
            errCallback = errCallback || this.defaultErrCallback
            this['size']=requestedSizeInBytes
            requestFileSystem(TEMPORARY, requestedSizeInBytes, callback, errCallback )
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
            this.initializeFileSystem(size, callback, errCallback)
        },

    }

    return FileSystem;

});
