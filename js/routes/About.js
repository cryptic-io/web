define([ "views/About" ], function(About){
  return function(viewport, topBar){
    return function(){
      window.location.pathname = "/about"
    }
  }
})

