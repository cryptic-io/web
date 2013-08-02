//Defines what url goes where
//The actual actions are within other files in this directory
//(e.g. user route is defined under routes/User.js)

define(
 ["routes/Home", "routes/User", "routes/Fs", "routes/Settings", "routes/About", "routes/Login", "routes/Register", "routes/Download", 
  "views/Home", "views/ViewportHandler", "views/TopBarCategories", "models/user/User", "config"], 
 function(HomeRoute, UserRoute, Fs, Settings, About, Login, Register, Download, 
   HomeView, ViewportHandler, TopBar, User, config){ 
    return Backbone.Router.extend({

        createRoutes: function(viewport, topBar, userModel, router){
          var routes = {
              "home" : "home"
            , "user/fs/*fileLocation" : "fs"
            , "user/fs" : "fs"
            , "user/fs/" : "fs"
            , "user" : "user"
            , "settings" : "settings"
            , "about" : "about"
            , "login" : "login"
            , "register" : "register"
            , "test" : "test"
            , "download/*linkNameAndPasscode" : "download"
          }

          //wire the routes 
          //We are doing this in this function instead of the usual approach, there is a reason: 
          //If we do it here we can simply create the route function by doing {home: HomeRoute(viewport)}. That returns a function with the viewport closed over 
          //if we wanted to do the samething in the usual way, we would have to do:
          //home : function(){ HomeRoute(this.viewport) }
          //Which is a bit more tedious, and we have to keep a reference to anything we want to pass in under the this object we can get messy
          var routeActions = {
            "home"     : HomeRoute(viewport, topBar),
            "user"     : UserRoute(viewport, topBar, userModel, router),
            "fs"       : Fs(userModel, router),
            "settings" : Settings(viewport, topBar, userModel, router),
            "about"    : About(viewport, topBar),
            "login"    : Login(viewport, topBar, userModel, router),
            "register" : Register(viewport, topBar, userModel),
            "download" : Download(viewport)
          }


          //wire it up so the route calls will work
          _.each(routes, function(name, path){
            router.route(path, name, routeActions[name])
          })


        },

        initialize: function(){
          //here we will create the HomeView which is the main container where everything else will live
          this.home = new HomeView({el:$('#mainContainer')})
          this.home.render()

          //we may also initialize the viewport handler. This will provide functions to modify the placing of elements
          var viewport = new ViewportHandler({el:$("#mainContainer")})
          this.viewport = viewport

          var userModel = new User()
          this.userModel = userModel
          user = userModel

          var topBar = new TopBar({el:$("#topBar")})
          this.topBar = topBar
          this.topBar.render()

          this.resetListener(this.userModel, this.topBar)

          //defined in js/config.js 
          if (config.debug){
            userModel.login("a","a")
          }

          this.createRoutes(viewport, topBar, userModel, this)


        },

        recreateUser : function(){
          console.log("recreating user")
          this.stopListeningToUser(this.userModel)
          this.userModel.off()
          this.userModel.clear()
          this.userModel = new User()

          this.resetListener(this.userModel, this.topBar)

          this.createRoutes(this.viewport, this.topBar, this.userModel, this)

          this.navigate("/login", {trigger:true})


          //safest way to really logout, but it takes time :(
          //location.reload()
        },

        resetListener: function(user, topBar){
          this.stopListening()
          topBar.stopListening()
          user.stopListening()
          this.registerTopBar(topBar)
          this.registerUser(user)
          this.registerUserAndTopBar(topBar, user)
        },

        registerUser: function(user){
          this.listenTo(user, "destroy", this.recreateUser)
        },

        registerTopBar: function(topBar){
          this.listenTo(topBar, "login:click", _.bind(this.navigate, this,    "/login", {trigger:true}))
          this.listenTo(topBar, "register:click", _.bind(this.navigate, this, "/register", {trigger:true}))
          this.listenTo(topBar, "upload:click", _.bind(this.navigate, this,   "/home", {trigger:true}))
          this.listenTo(topBar, "about:click", _.bind(this.navigate, this,    "/about", {trigger:true}))

          this.listenTo(topBar, "files:click", _.bind(this.navigate, this, "/user", {trigger:true}))

          this.listenTo(topBar, "settings:click", _.bind(this.navigate, this, "/settings", {trigger:true}))
        },

        //just to keep track of things that need the user and the topbar
        registerUserAndTopBar: function(topBar, user){
          topBar.listenTo(user, "login:success", topBar.changeToLoggedIn)
          topBar.listenTo(user, "destroy", topBar.changeToLoggedOut)
          //have the usermodel know when we logout, and destroy the model 
          user.listenTo(topBar, "logout:click", user.destroy)
        },

        //remove anything listening to the user so we don't end up with zombie models calling the shots
        stopListeningToUser: function( user){
          this.topBar.stopListening(user)
          this.stopListening(user)
          this.userModel.stopListening()
        },
    })
})

