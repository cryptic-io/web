define([ "views/user/UserRegister" ], function(UserRegisterView){
  return function(viewport, topBar, userModel){
    return function(){
      var userRegister = new UserRegisterView({model : this.userModel})

      topBar.select('register')

      viewport.exeunt()
              .introduce(userRegister,2)
              .moveToPage(2)
              .placeCenter(userRegister.el,2)
    }
  }
})
