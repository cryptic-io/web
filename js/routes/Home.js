//returns routes that will be used in the Home page (so most pages)

define(
 ["views/Home", "views/File", "views/Progress", "views/user/User", "views/ProgressBars", "views/Progress",
  "views/ViewportHandler", "views/user/UserFiles", "jade!templates/user/SingleFileInfo", "views/TopBarCategories", "models/user/User", "views/user/Userlogin", "views/user/UserRegister", "views/user/UserOptions",
  "views/About"  ]
, function(HomeView, FileView, ProgressView, UserView, ProgressBars, ProgressBar, ViewportHandler, UserFilesView, singleFileInfoTemplate, TopBar, User, UserLoginView, UserRegisterView, UserOptions, About){ 
    return Backbone.Router.extend({
        routes: {
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
        },

        initialize: function(){
          //here we will create the HomeView which is the main container where everything else will live
          this.home = new HomeView({el:$('#mainContainer')})
          this.home.render()

          //we may also initialize the viewport handler. This will provide functions to modify the placing of elements
          this.viewport = new ViewportHandler({el:$("#mainContainer")})

          this.userModel = new User()
          user = this.userModel

          this.topBar = new TopBar({el:$("#topBar")})
          this.topBar.render()

          this.resetListener(this.userModel, this.topBar)

          this.userModel.login("a","a")

        },

        recreateUser : function(){
          console.log("recreating user")
          this.stopListeningToUser(this.userModel)
          this.userModel.off()
          this.userModel.clear()
          this.userModel = new User()

          this.resetListener(this.userModel, this.topBar)

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

        login: function(){
          var viewport = this.viewport
          ,  userLogin = new UserLoginView({model : this.userModel})

          this.topBar.select('login')

          //naviate to the user's files on successful login
          this.listenToOnce(this.userModel,"login:success", _.bind(this.navigate, this, "/user", {trigger:true}))
          
          

          viewport.exeunt()
                  .introduce(userLogin,3)
                  .moveToPage(3)
                  .placeCenter(userLogin.el, 3)
        },

        register : function(){
          var viewport = this.viewport
          , userRegister = new UserRegisterView({model : this.userModel})

          this.topBar.select('register')

          viewport.exeunt()
                  .introduce(userRegister,2)
                  .moveToPage(2)
                  .placeCenter(userRegister.el,2)
        },

        // this is the default route, this is the first thing a user will see if the just go to cryptic.io
        home: function() {
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
        },

        about : function(){
          console.log('Entering About')

          var  about = new About()
          about.render()
          this.topBar.select('about')

          this.viewport
            .exeunt()
            .introduce(about,0)
            .moveToPage(0)
            .placeCenter(about.el, 0)

        },

        settings : function(){
          //check if logged in
          if (!this.userModel.get("loggedIn")){
            this.navigate("/login",{trigger:true})
            return
          }

          console.log("Entering settings")

          this.topBar.select('settings')

          var userSettings = new UserOptions({model:this.userModel})
            userSettings.render()

          this.viewport.exeunt()
              .moveToPage(2)
              .introduce(userSettings, 2)
              .placeCenter(userSettings.el, 2)

        },

        fs : function(fileLocation){
          if (!this.userModel.get("loggedIn")){
            this.navigate("/login",{trigger:true})
            return
          }
          if (fileLocation === null || _.isUndefined(fileLocation)) fileLocation = ""
          this.userView.model.set('fsLocation', "/"+fileLocation)

        },

        // This is visible to a user once he logs in
        user: function(){
          if (!this.userModel.get("loggedIn")){
            this.navigate("/login",{trigger:true})
            return
          }

          //check to see if we have created a previous version of this
          if (this.userView) this.userView.destroy()
          if (this.fileView) this.fileView.remove()

          var that=this
          console.log('starting user home')
          
          this.resetListener(this.userModel, this.topBar)
          

          var home = this.home


          var viewport = this.viewport

          this.topBar.select('files')
            


          this.userView = new UserView({model:this.userModel})

          var fileView = new FileView({user:this.userView.model});
          fileView.render()

          this.fileView = fileView

          var progressBars = []


          this.userView.listenTo(fileView, 'file:uploaded', this.userView.fileUploaded)
          this.userView.render()

          this.listenTo(fileView,"file:list", function(files){
            progressBars = _.map(files, function(fileModel){
              var progressBar = new ProgressBar()
              progressBar.render()
              progressBar.text(fileModel.get("file").name)
              return progressBar
            })

            _.each(progressBars, function(bar){
              that.userView.userFileView.$el.find(".bars").append(bar.el)
            })

          })

          //update the progress of each file
          this.listenTo(fileView,"file:progress", function(fileIndex,percentage){
            console.log("progress:",percentage,"for file:",fileIndex)
            progressBars[fileIndex].percentage(percentage+"%")
          })

          this.listenTo(fileView, "file:uploaded", function(fileIndex, fileObj){
            var origin = window.location.protocol + "//" + window.location.host
            var downloadLink = origin+'/#download/'+fileObj.link
            var progressBar = progressBars[fileIndex]

            progressBar.link( downloadLink, fileObj.filename )
            progressBar.markSuccess()
          })

          this.listenTo(fileView, "file:uploaded:all", function(){
            that.userModel.trigger("change:fs")
          })

          //decalre this variable, we'll define it in a bit
          var hideSingleFileAndShowUpload

          this.listenTo(this.userView.userFileView, "fs:file:open", function(fileObj){
            that.userView.singleFileInfo.render({file:fileObj})
            viewport
                    .show(that.userView.singleFileInfo.el, true)
                    .placeRightOfCenter(that.userView.singleFileInfo.el, 1)
                    .placeRightOffScreen(fileView.el,1)
                    .placeButtonRight(1,"Upload", ["emerald"])
                    .then(hideSingleFileAndShowUpload)
          })

          hideSingleFileAndShowUpload = function(){
            viewport.placeRightUpOffScreen(that.userView.singleFileInfo.el, 1)
                    .placeRightOfCenter(fileView.el, 1)
                    .hideButtonRight()
          }



          //change the url according to the fsLocation on the model
          this.listenTo(this.userView.model, 'change:fsLocation', function(model){
              this.navigate('/user/fs/'+model.get('fsLocation').substr(1))
          })

          //the user is already logged in we can activate the view
          that.userModel.set("fsLocation","/")
          that.userView.userFileView.showFiles("/")
          viewport.exeunt()
            .introduce(that.userView.userFileView, 1)
            .introduce(that.userView.singleFileInfo, 1)
            .introduce(fileView, 1)
            .moveToPage(1)
            .hide(that.userView.singleFileInfo.el, true)
            .placeRightUpOffScreen(that.userView.singleFileInfo.el, 1)
            .placeLeftOfCenter(that.userView.userFileView.el, 1)
            .placeRightOfCenter(fileView.el, 1)
            .placeRightOffScreen(barsContainer) //place the upload bars right off screen, this will probably change as we move the progress bar to be in the files 
          
            
        },

        download: function(linkNameAndPasscode){
          var home = this.home

          viewport = this.viewport

          //reference the barsContainer div
          var barsContainer = new ProgressBars({title: "Downloading"})
          barsContainer.render()
          progressBar = new ProgressBar()
          progressBar.render()
          barsContainer.insertProgressBars([progressBar.el])


          var linkName = linkNameAndPasscode.split('/')[0]
          var passcode = linkNameAndPasscode.split('/')[1]


          fileView = new FileView();


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

            barsContainer.setTitle("Done!")
          })


          fileView.downloadFile(linkName, passcode, function(){
              console.log('woohoo downloaded the file!');
              fileView.createDownloadLink();
          });

        },

        test: function(){
          console.log('starting test')
          jas = require(['test/jasmine'])
        },


        
    })
})

