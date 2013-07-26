define(["views/ProgressBars", "views/Progress", "views/File"], function(ProgressBars, ProgressBar, FileView){
  return function(viewport){
    return function(linkNameAndPasscode){
      //reference the barsContainer div
      var barsContainer = new ProgressBars({title: "Downloading"})
      progressBar = new ProgressBar()
      fileView = new FileView();

      barsContainer.render()
      progressBar.render()

      barsContainer.insertProgressBars([progressBar.el])

      var linkName = linkNameAndPasscode.split('/')[0]
      var passcode = linkNameAndPasscode.split('/')[1]




      //this will be called when the file begins to download
      fileView.on("file:start:download",function(){
        viewport.exeunt()
                .introduce(barsContainer,0)
                .placeCenter(barsContainer.el,0)
                .moveToPage(0)
      })

      fileView.on("file:name", function(name){
        progressBar.text(name)
      })

      fileView.on("file:progress", function(fileIndex,progress){
        progressBar.percentage(progress+"%")
      })

      fileView.on("file:url", function(urlObj){
        progressBar.link(urlObj.url, urlObj.name)
        progressBar.markSuccess()
        progressBar.clickLink()
        barsContainer.setTitle("Done!")
      })


      fileView.downloadFile(linkName, passcode, function(){
          console.log('woohoo downloaded the file!');
          fileView.createDownloadLink();
      });
    }
  }
})
