//defines what the Home route will do
define(["views/File", "views/ProgressBars", "views/Progress"], function(FileView, ProgressBars, ProgressBar){ 
  // Return a function that takes in three pieces of state: 
  // the viewport: So it can draw things on the screen
  // the topBar: So it can change the indicator of the top bar
  return function(viewport, topBar){
    return function(){
      console.log('starting home')
      var home = this.home
      //var barsContainer = home.$el.find("#barsContainer")[0]
      , viewport = this.viewport
      , barsContainer = new ProgressBars({title: "Uploading"})
      barsContainer.render()

      this.topBar.select('upload')

      var fileView = new FileView();
      fileView.render()

      // All the progress bars are going to be in this array soon enough
      progressBars = []

      //Create the list of files
      fileView.on("file:list",function(files){
        //update the title of the bars container
        barsContainer.setTitle("Uploading")

        //create a new progress bar for each file, and store it in an array
        progressBars = _.map(files, function(fileModel){
          var progressBar = new ProgressBar()
          progressBar.render()
          progressBar.text(fileModel.get("file").name)
          return progressBar
        })

        barsContainer.insertProgressBars(_.map(progressBars, function(view){return view.el}))
      })

      //update the progress of each file
      fileView.on("file:progress", function(fileIndex,percentage){
        console.log("progress:",percentage,"for file:",fileIndex)
        progressBars[fileIndex].percentage(percentage+"%")
      })

      fileView.on("file:uploaded", function(fileIndex, fileObj){
        var origin = window.location.protocol + "//" + window.location.host
        var downloadLink = origin+'/#download/'+fileObj.link
        var progressBar = progressBars[fileIndex]

        progressBar.link( downloadLink, fileObj.filename )
        progressBar.markSuccess()
      })

      fileView.on("file:uploaded:all", function(){
        barsContainer.setTitle("Done!")
      })

      viewport
        .exeunt()
        .introduce(fileView, 1)
        .introduce(barsContainer, 1)
        .moveToPage(1)
        .placeCenter(fileView.el, 1)
        .hide(barsContainer.el)
        .placeCenter(barsContainer.el,1)

      //this promise will be resolved when the user uploads a file
      fileView.on("file:start:upload",function(){
        viewport.show(barsContainer.el)
                .delay(0.5e3) //delay the animation by a bit so the user sees the upload bar is coming "from" the vault
                .placeLeftOfCenter(fileView.el, 1)
                .placeRightOfCenter(barsContainer.el, 1)
      })
    }
  }
})
