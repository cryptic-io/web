define([ "views/About" ], function(About){
  return function(viewport, topBar){
    return function(){
      console.log('Entering About')
      var about = new About()
      about.render()
      topBar.select('about')

      viewport
      .exeunt()
      .introduce(about,0)
      .moveToPage(0)
      .placeCenter(about.el, 0)
    }
  }
})

