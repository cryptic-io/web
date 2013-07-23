define([ "views/user/UserOptions" ], function(UserOptions){
  return function(viewport, topBar, userModel, router){
    return function(){
      //check if logged in
      if (!userModel.get("loggedIn")){
        router.navigate("/login",{trigger:true})
        return
      }

      console.log("Entering settings")

      topBar.select('settings')

      var userSettings = new UserOptions({model:userModel})
      userSettings.render()

      viewport.exeunt()
              .moveToPage(2)
              .introduce(userSettings, 2)
              .placeCenter(userSettings.el, 2)
    }
  }
})

