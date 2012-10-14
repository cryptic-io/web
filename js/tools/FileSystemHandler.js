/**
 * 
 * Simple wrapper for Chrome's Filesystem api
 * 
 * The name should be the original filename not the linkname (aka the random long string) ( e.g. bitchesLoveBitcoins.txt )
 *
 */





FileSystemHandler = {

    defaultErrHandler: function(){
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


    /** 
     *  Fetches the FileSystem if it hasn't been given
     *  
     */

    fetchFS: function(options, callback){

    },


    /**
     * Creates a new file if it doesn't exist. Deletes it, and creates an empty file if it does exist
     * Doesn't do any writing
     *  params:
     *  { successCallback: fn()
     *    errorCallback: fn()
     *    name: 'coolFileBro.txt'
     *    fs: //the filesystem reference
     *  }
     */
    createFile: function(options){
        var fs = options.fs
        , name = options.name;
        
        options.errorCallback = options.errorCallback || this.defaultErrHandler

        fs.root.getFile(name, {create:true, exclusive:true}, options.successCallback, 
            //Error Function, the file might already exist, so we need to delete it
            function(){
                fs.root.getFile(name, {create:false}, function(fileEntry){
                    //lets remove the existing file
                    fileEntry.remove(function(){
                        //now that the file is removed lets create it
                        fs.root.getFile(name, {create:true}, options.successCallback, options.errorCallback);
                    })
                }, options.errorCallback)
            }
       )
    },

    /**
     * Helper method for writing to a file and appending 
     *  params:
     *  { successCallback: fn()
     *    errorCallback: fn()
     *    name: 'coolFileBro.txt'
     *    fs: //the filesystem reference
     *    data: an array buffer
     *    type: the type of the original file
     *  }
     *
     *
     */
    appendToFile: function(options){
        var fs = options.fs
        , name = options.name;

        options.errorCallback = options.errorCallback || this.defaultErrHandler

        fs.root.getFile(name, {create:false}, function(fileEntry){
            fileEntry.createWriter(function(fileWriter) {
                fileWriter.seek(fileWriter.length)
                var blob = new Blob([options.data], {type: options.type})

                fileWriter.write(blob)

            }, options.errorCallback)
        }, options.errorCallback)
    },

}
    
//define for requirejs
define(function(){return FileSystemHandler});
