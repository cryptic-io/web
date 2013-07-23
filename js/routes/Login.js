define(
 ["views/user/Userlogin"], function(UserLoginView){ 
  return function(viewport, topBar, userModel, router){
    return function(){
      var userLogin = new UserLoginView({model : userModel})

      topBar.select('login')

      //naviate to the user's files on successful login
      userLogin.listenToOnce(userModel,"login:success", _.bind(router.navigate, router, "/user", {trigger:true}))
      viewport.exeunt()
              .introduce(userLogin,3)
              .moveToPage(3)
              .placeCenter(userLogin.el, 3)
    }
  }
})
