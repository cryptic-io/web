//Define the User's filesystem
//This won't harbor any state, ever.
define([],function(){ 
  var FS = {
    ls: function(fs, loc){
      //we return a list of files from a folder
      return _.values(FS.getFile(fs, loc).value)
    },

    //Returns a path with extra forward slashes removed
    cleanPath: function(path){
      return "/"+FS.splitPath(path).join("/")
    },

    //escapes any forwards slashes, or other bad characters
    cleanFilename: function(filename){
      return filename.replace(/\//g,"\\/")
    },

    splitPath : function(path){
      var splitBy = "/"
      , unlessPrecededBy = "\\"
      , pathArray = []
      , indexInString = 0

      while (path.length && indexInString < path.length) {
        var char = path.charAt(indexInString)
        var prevChar = ""
        if (indexInString > 0) prevChar = path.charAt(indexInString-1);

        if ( char === splitBy && prevChar !== unlessPrecededBy ) {
          pathArray.push(path.substr(0,indexInString))
          path = path.substr(indexInString+1)
          indexInString = 0
        }else{
          indexInString++
        }

      }

      return _.without(pathArray.concat([path]),"")

    },

    // Given a fs and location, return an array of all the files inside
    getFile: function(fs, loc){
        var locationArray = FS.splitPath(loc)
        , file = fs

        _.each(locationArray, function(location){
          //navigate inside folders 
          file = file.value[location]
        })

        return file
    },

    addFile: function(fs, loc, fileObj){

      var contents = fileObj
      , filename = fileObj.filename

      //clean the filename
      filename = FS.cleanFilename(filename)
      fileObj.filename = filename

      contents = _.defaults(contents, {
          created: +(new Date()), modified: +( new Date() ), type: "file", location: loc, size:"Unknown", value: contents.link})

      var folder = FS.getFile(fs, loc)
      , currentFolder = folder.value //the value of the folder is the object that contains all the other files

      if (_.isUndefined(currentFolder[filename]) ){
          currentFolder[filename]=contents
      }else{
        
        //increment through filenames if the file already exists
        (function(filename, copyNumber){
          if( _.isUndefined(currentFolder[filename+' ('+copyNumber+')']) ){
            contents.filename = filename + ' ('+copyNumber+')'
            currentFolder[filename + ' ('+copyNumber+')']=contents
          }else{
            //we need to increment the number
            arguments.callee(filename, ++copyNumber)
            return
          }
        })(filename, 1)
      }

      return fs
    },

    deleteFolder : function(fs, loc, filename){
        return FS.removeFile(fs, loc, filename, true)
    },
    
    removeFile: function(fs, loc, filename){
      fs = _.clone(fs)
      var folder = FS.getFile(fs, loc)
      , currentFolder = folder.value //the value of the folder is the object that contains all the other files
      , file = folder.value[filename]

      //remove the file from the folder
      currentFolder = _.omit(currentFolder, filename)

      folder.value = currentFolder

      return fs
    },

    getParentFsLocation: function(fsLocation){
          var parentFsLocation = this.splitPath(fsLocation)
          parentFsLocation.pop()//get rid of the current folder in the fsLocation
          parentFsLocation = '/' +parentFsLocation.join('/') // recreate the original path

          return parentFsLocation
    },
    
  }

  return FS
})
