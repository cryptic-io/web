define([ "views/user/UserOptions" ], function(About){
  return function(userModel, router){
    return function(fileLocation){
      if (!userModel.get("loggedIn")){
        router.navigate("/login",{trigger:true})
        return
      }

      if (fileLocation === null || _.isUndefined(fileLocation)) fileLocation = ""

      userModel.set('fsLocation', "/"+fileLocation)
    }
  }
})

