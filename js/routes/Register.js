define([ "views/user/UserRegister" ], function(UserRegisterView){
  return function(viewport, topBar, userModel){
    return function(){
      var userRegister = new UserRegisterView({model : this.userModel})

      topBar.select('register')

      userRegister.listenToOnce(userModel,"login:success", _.bind(router.navigate, router, "/user", {trigger:true}))

      viewport.exeunt()
              .introduce(userRegister,2)
              .moveToPage(2)
              .placeCenter(userRegister.el,2)
    }
  }
})
