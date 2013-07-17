/**
 * 
 * Simple wrapper for Chrome's Filesystem api
 * 
 * The name should be the original filename not the linkname (aka the random long string) ( e.g. bitchesLoveBitcoins.txt )
 *
 */





var FileSystemHandler = {

    defaultErrHandler: function(e){
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
     * Creates a new file if it doesn't exist. Deletes it, and creates an empty file if it does exist
     * Doesn't do any writing
     *  params:
     *  { successCallback: fn()
     *    errorCallback: fn()
     *    name: 'coolFileBro.txt'
     *    fileSystem: //the filesystem reference
     *  }
     */
    createFile: function(options){
        var fileSystem = options.fileSystem
        , name = options.name;
        
        options.errorCallback = options.errorCallback || this.defaultErrHandler

        fileSystem.getFileSystem(function(fs){
            fs.root.getFile(name, {create:true, exclusive:true}, options.successCallback, 
                //Error Function, the file might already exist, so we need to delete it
                //
                function(error){
                    //check to make sure the error is that is already exists
                    if (error.code === FileError.PATH_EXISTS_ERR || error.code === FileError.INVALID_MODIFICATION_ERR){
                        fs.root.getFile(name, {create:false}, function(fileEntry){
                            //lets remove the existing file
                            fileEntry.remove(function(){
                                //now that the file is removed lets create it
                                fs.root.getFile(name, {create:true}, options.successCallback, options.errorCallback);
                            })
                        }, options.errorCallback)
                    }else{
                      console.error("There was something wrong with the filesystem",error)
                    }
                }
           )
        })
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
     *    start: //byte postion to start writing
     *  }
     *
     *
     */
    appendToFile: function(options){
        var fileSystem = options.fileSystem
        , name = options.name;

        options.errorCallback = options.errorCallback || this.defaultErrHandler

        fileSystem.getFileSystem(function(fs){
            fs.root.getFile(name, {create:false}, function(fileEntry){
                fileEntry.createWriter(function(fileWriter) {
                    fileWriter.seek(options.start)
                    //console.log('starting at', options.start)
                    var blob = new Blob([options.data], {type: options.type})

                    fileWriter.write(blob)
                    
                    //execute callback when done writing file
                    fileWriter.onwriteend = options.successCallback

                }, options.errorCallback)
            }, options.errorCallback)
        }, options.errorCallback, options.size)
    },

    readFile: function(fileName, size){
        var errorHandler = this.defaultErrHandler;
        var onInitFs = function (fs) {

            fs.root.getFile(fileName, {}, function(fileEntry) {

                // Get a File object representing the file,
                // then use FileReader to read its contents.
                fileEntry.file(function(file) {
                    var reader = new FileReader();

                    reader.onloadend = function(e) {
                     console.log("File contents:")
                     console.log(this.result)
                    };

                    reader.readAsText(file);
                }, errorHandler);

            }, errorHandler);

        }

        window.requestFileSystem(window.TEMPORARY, size, onInitFs, this.defaultErrHandler);
    },

}
    
//define for requirejs
define(function(){return FileSystemHandler});
