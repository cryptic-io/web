//returns routes that will be used in the Home page (so most pages)

define(["views/Home", "views/File", "views/Progress", "views/user/User", "views/ProgressBars", "views/ViewportHandler", "views/user/UserFiles", "jade!templates/user/SingleFileInfo", "views/TopBarCategories"  ]
, function(HomeView, FileView, ProgressView, UserView, ProgressBars, ViewportHandler, UserFilesView, singleFileInfoTemplate, TopBar){ 
    return Backbone.Router.extend({
        routes: {
            "demo" :"demo"
            , "home" : "home"
            , "user/fs/*fileLocation" : "openUserFile"
            , "user/fs" : "user"
            , "user/fs/" : "user"
            , "user" : "user"
            , "test" : "test"
            , "download/*linkNameAndPasscode" : "download"
        },

        initialize: function(){
          //here we will create the HomeView which is the main container where everything else will live
          this.home = new HomeView({el:$('#mainContainer')})
          this.home.render()

          //we may also initialize the viewport handler. This will provide functions to modify the placing of elements
          this.viewport = new ViewportHandler({el:$(".body")})

          this.topBar = new TopBar({el:$("#topBar")})
          this.topBar.render()

        },

        // this is the default route, this is the first thing a user will see if the just go to cryptic.io
        home: function() {
          console.log('starting home')
          var home = this.home
          var barsContainer = home.$el.find("#barsContainer")[0]
          , viewport = this.viewport

          //var fileView = new FileView({el:$('#uploadBoxContainer')});
          var fileView = new FileView({el:$('#uploadBoxContainer'), progressBarContainer: barsContainer });
          fileView.render()

          //this promise will be resolved when the user uploads a file
          fileView.uploadDeffered.promise.then(function(){
            viewport.placeLeftOfCenter(fileView.el)
                    .placeRightOfCenter(barsContainer)
          })

          viewport
            .toggleAnimate(fileView.el) //we don't want to show an animation at the begginning
            .placeCenter(fileView.el) 
            .toggleAnimate(fileView.el) //but we do want animations later
            .placeRightOffScreen(barsContainer)

        },

        // This is visible to a user once he logs in
        user: function(){
          var that=this
          if (!this.userView) {
            console.log('starting user home')

            var home = this.home

            var barsContainer = home.$el.find("#barsContainer")[0]

            var viewport = this.viewport


            this.userView = new UserView({userLoginContainer:$('#userLogin')
                                        , userFilesContainer:$('#userFilesContainer')
                                        , userSpaceContainer:$('#userSpaceContainer')})


            var fileView = new FileView({el:$('#uploadBoxContainer'), user:this.userView.model, progressBarContainer: barsContainer });
            this.userView.listenTo(fileView, 'fileUploaded', this.userView.fileUploaded)
            this.userView.render()

            fileView.uploadDeffered.promise.then(function(){
              viewport.placeLeftOffScreen(that.userView.userFileView.el)
                      .placeLeftOfCenter(fileView.el)
                      .placeRightOfCenter(barsContainer)
            })

            fileView.render()

            this.userView.model.once('loggedIn', function(){
              //once a user logs in we will move there files to the left of center, and put the fileViews at the right of center 
              viewport.placeLeftOfCenter(that.userView.userFileView.el)
                .placeRightOfCenter(fileView.el)
                .placeRightOffScreen(barsContainer) //place the upload bars right off screen, this will probably change as we move the progress bar to be in the files 
            })


            //change the url according to the fsLocation on the model
            this.listenTo(this.userView.model, 'change:fsLocation', function(model){
                this.navigate('/user/fs/'+model.get('fsLocation').substr(1))
            })
              
          }else{
            //We already have the page built, we just need to go to the root directory
            this.userView.model.set('fsLocation','/')
          }

        },

        
        // demo for the viewport placing of elements
        // This will illustrate how the viewport works
        demo : function (){
          home = this.home

          bars = new ProgressBars(
          {
            el:$("#barsContainer")
            , bars : 
              {
                "title":"Uploading...", items: [
                                                {text:"Frank's Taxes", percent:"100%"}
                                                , {text:"Green Card", percent:"84%"}
                                                , {text:"Taxes", percent:"34%"}
                                                ]
              }
          })

          bars.render()

          fileView = new FileView({el:$('#uploadBoxContainer')});
          fileView.render()

          userFiles = new UserFilesView({el:$("#userFilesContainer"), model:new Backbone.Model()})
          userFiles.render({
            fsLocation:"foo/bar"
            , files:[
              {"filename":"boobs"}
            , {"filename":"Frank's Taxes", selected:true}
            , {"filename":"foo bar"}
            , {"filename":"Important Stuff"}]
          })

          singleFileEl = $("#singleFileContainer")[0]

          $(singleFileEl).html(singleFileInfoTemplate({file:{filename:"Frank's Taxes",type:"text"}, size:2, sizeUnit:"MB", downloadLink:"http://cryptic.io/#download/jfexijf/asdjfe"}))



          var showBarsHideVault 
          , showVaultHideBars
          , viewport = this.viewport

          //buttons showing and hiding the vault
          showBarsHideVault = function(){
              viewport.placeRightOfCenter(bars.el)
                .placeRightDownOffScreen(fileView.el, true)
                .hideButtonRight()
                .placeButtonRightDown("Upload",["emerald", "blackText", "withOffsetFromBottom"])
                .then(showVaultHideBars)
          }

          showVaultHideBars = function(){
              viewport.placeRightOffScreen(bars.el)
                .placeRightOfCenter(fileView.el)
                .hideButtonRightDown()
                .placeButtonRight("Progress", ["clouds", "blackText"])
                .then(showBarsHideVault)
          }

          // show a button on the left down part of screen, when clicked move the userFiles left off screen, place single file info left of center, hide the button
          viewport.placeButtonLeftDown("File Info", ["clouds", "blackText"])
            .then(function(){
              viewport.placeLeftOffScreen(userFiles.el)
                .placeLeftOfCenter(singleFileEl)
                .hideButtonLeftDown()
            })

          //place the vault hidden, but not completely. 
          //also place the singleFileEl left down off screen but completely hidden
          viewport.placeRightDownOffScreen(fileView.el, true)
            .placeLeftDownOffScreen(singleFileEl)

          viewport.placeLeftOfCenter(userFiles.el) 
            .placeRightOfCenter(bars.el)
            .placeButtonRightDown("Upload",["emerald", "blackText", "withOffsetFromBottom"])
            .then(showVaultHideBars)


        },

        openUserFile: function(fileLocation){
            //check to see if the user view has been loaded already
            if (!this.userView){
                this.user()
            }

            this.userView.model.set('fsLocation', "/"+fileLocation)
        },



        // This is visible to a user once he logs in
        user: function(){
          var that=this
          if (!this.userView) {
            console.log('starting user home')

            var home = this.home

            var barsContainer = home.$el.find("#barsContainer")[0]

            var viewport = this.viewport


            this.userView = new UserView({userLoginContainer:$('#userLogin')
                                        , userFilesContainer:$('#userFilesContainer')
                                        , userSpaceContainer:$('#userSpaceContainer')})


            var fileView = new FileView({el:$('#uploadBoxContainer'), user:this.userView.model, progressBarContainer: barsContainer });
            this.userView.listenTo(fileView, 'fileUploaded', this.userView.fileUploaded)
            this.userView.render()

            fileView.uploadDeffered.promise.then(function(){
              viewport.placeLeftOffScreen(that.userView.userFileView.el)
                      .placeLeftOfCenter(fileView.el)
                      .placeRightOfCenter(barsContainer)
            })

            fileView.render()

            this.userView.model.once('loggedIn', function(){
              //once a user logs in we will move there files to the left of center, and put the fileViews at the right of center 
              viewport.placeLeftOfCenter(that.userView.userFileView.el)
                .placeRightOfCenter(fileView.el)
                .placeRightOffScreen(barsContainer) //place the upload bars right off screen, this will probably change as we move the progress bar to be in the files 
            })


            //change the url according to the fsLocation on the model
            this.listenTo(this.userView.model, 'change:fsLocation', function(model){
                this.navigate('/user/fs/'+model.get('fsLocation').substr(1))
            })
              
          }else{
            //We already have the page built, we just need to go to the root directory
            this.userView.model.set('fsLocation','/')
          }

        },


        download: function(linkNameAndPasscode){
          var home = this.home

          viewport = this.viewport

          //reference the barsContainer div
          var barsContainer = home.$el.find("#barsContainer")[0]
          , progressView

          var linkName = linkNameAndPasscode.split('/')[0]
          var passcode = linkNameAndPasscode.split('/')[1]


          fileView = new FileView({el:$('#uploadBoxContainer'),template:"download", progressBarContainer: barsContainer});


          //this will be called when the file begins to download
          fileView.downloadDeffered.promise.then(function(progressView){
            progressView = progressView
            viewport.toggleAnimate(barsContainer)
              .placeCenter(barsContainer)

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

