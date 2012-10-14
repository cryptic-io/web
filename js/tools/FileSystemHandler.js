/**
 * 
 * Simple wrapper for Chrome's Filesystem api
 * 
 * The name should be the original filename not the linkname (aka the random long string) ( e.g. bitchesLoveBitcoins.txt )
 *
 */





FSHelper = {
    requestFS:function(options){
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
        var fs = options.fs;
        , name = options.name;

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
        var fs = options.fs;
        , name = options.name;

        fs.root.getFile(name, {create:false}, function(fileEntry){
            fileEntry.createWriter(function(fileWriter) {
                fileWriter.seek(fileWriter.length)
                var blob = new Blob([options.data], {type: options:type})

                fileWriter.write(blob)

            }, options.errorCallback)
        }, options.errorCallback)
    },

}
    
//define for requirejs
define(function(){return FSHelper});
