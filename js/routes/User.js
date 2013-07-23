//defines what the user route will do
define(
 ["views/File", "views/user/User","views/Progress"], function(FileView, UserView, ProgressBar){ 
  // Return a function that takes in three pieces of state: 
  // the viewport: So it can draw things on the screen
  // the user model: So it can print the user's files
  // the router: So it can navigate to the login page if there is no user, and we can change the route when we go to a folderj
  // the topBar: So it can change the indicator of the top bar
  return function(viewport, topBar, userModel, router){
    return function(){
      if (!userModel.get("loggedIn")){
        router.navigate("/login",{trigger:true})
        return
      }

      console.log('starting user home')

      topBar.select('files')

      userView = new UserView({model:userModel})

      var fileView = new FileView({user:userModel});
      fileView.render()

      var progressBars = []

      userView.listenTo(fileView, 'file:uploaded', userView.fileUploaded)
      userView.render()

      userView.listenTo(fileView,"file:list", function(files){
        progressBars = _.map(files, function(fileModel){
          var progressBar = new ProgressBar()
          progressBar.render()
          progressBar.text(fileModel.get("file").name)
          return progressBar
        })

        _.each(progressBars, function(bar){
          userView.userFileView.$el.find(".bars").append(bar.el)
        })

      })

      //update the progress of each file
      userView.listenTo(fileView,"file:progress", function(fileIndex,percentage){
        console.log("progress:",percentage,"for file:",fileIndex)
        progressBars[fileIndex].percentage(percentage+"%")
      })

      userView.listenTo(fileView, "file:uploaded", function(fileIndex, fileObj){
        var origin = window.location.protocol + "//" + window.location.host
        var downloadLink = origin+'/#download/'+fileObj.link
        var progressBar = progressBars[fileIndex]

        progressBar.link( downloadLink, fileObj.filename )
        progressBar.markSuccess()
      })

      userView.listenTo(fileView, "file:uploaded:all", function(){
        userModel.trigger("change:fs")
      })

      //declare this variable, we'll define it in a bit
      var hideSingleFileAndShowUpload

      userView.listenTo(userView.userFileView, "fs:file:open", function(fileObj){
        userView.singleFileInfo.render({file:fileObj})
        viewport
                .show(userView.singleFileInfo.el, true)
                .placeRightOfCenter(userView.singleFileInfo.el, 1)
                .placeRightOffScreen(fileView.el,1)
                .placeButtonRight(1,"Upload", ["emeraldBtn"])
                .then(hideSingleFileAndShowUpload)
      })

      hideSingleFileAndShowUpload = function(){
        viewport.placeRightUpOffScreen(userView.singleFileInfo.el, 1)
                .placeRightOfCenter(fileView.el, 1)
                .hideButtonRight()
      }



      //change the url according to the fsLocation on the model
      userView.listenTo(userModel, 'change:fsLocation', function(model){
          router.navigate('/user/fs/'+model.get('fsLocation').substr(1))
      })

      //the user is already logged in we can activate the view
      userModel.set("fsLocation","/")
      userView.userFileView.showFiles("/")
      viewport.exeunt()
        .introduce(userView.userFileView, 1)
        .introduce(userView.singleFileInfo, 1)
        .introduce(fileView, 1)
        .moveToPage(1)
        .hide(userView.singleFileInfo.el, true)
        .placeRightUpOffScreen(userView.singleFileInfo.el, 1)
        .placeLeftOfCenter(userView.userFileView.el, 1)
        .placeRightOfCenter(fileView.el, 1)

    }
  }
})
      
