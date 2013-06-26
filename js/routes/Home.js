//returns routes that will be used in the Home page (so most pages)

define(["views/Home", "views/File", "views/Progress", "views/User", "views/ProgressBars", "views/ViewportHandler", "views/UserFiles", "jade!templates/SingleFileInfo"  ]
, function(HomeView, FileView, ProgressView, UserView, ProgressBars, ViewportHandler, UserFilesView, singleFileInfoTemplate){ 
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

        
        // demo for the viewport placing of elements
        // This will illustrate how the viewport works
        demo : function (){
          var home = new HomeView({el:$('#mainContainer')})
          home.render()

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


          viewport = new ViewportHandler({el:$(".body")})

          var showBarsHideVault 
          , showVaultHideBars

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


        home: function() {
          console.log('starting home')
          var home = new HomeView({el:$('#mainContainer')})
          home.render()
          var barsContainer = home.$el.find("#barsContainer")[0]
          , viewport = new ViewportHandler({el:$(".body")})

          //var fileView = new FileView({el:$('#uploadBoxContainer')});
          var fileView = new FileView({el:$('#uploadBoxContainer'), progressBarContainer: barsContainer });
          fileView.render()

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

        user: function(){
          var that=this
          if (!this.userView) {
            console.log('starting user home')


            var home = new HomeView({el:$('#mainContainer')})
            home.render()

            var barsContainer = home.$el.find("#barsContainer")[0]

            var viewport = new ViewportHandler({el:$(".body")})


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

            //this.listenTo(this.userView.model, 'loggedIn', function(a, b, c){})

            fileView.render()

            this.userView.model.once('loggedIn', function(){
              viewport.placeLeftOfCenter(that.userView.userFileView.el)
                .placeRightOfCenter(fileView.el)
                .placeRightOffScreen(barsContainer)
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
          var home = new HomeView({el:$('#mainContainer')})
          home.render()

          viewport = new ViewportHandler({el:$(".body")})

          //reference the barsContainer div
          var barsContainer = home.$el.find("#barsContainer")[0]
          , progressView

          var linkName = linkNameAndPasscode.split('/')[0]
          var passcode = linkNameAndPasscode.split('/')[1]


          fileView = new FileView({el:$('#uploadBoxContainer'),template:"download", progressBarContainer: barsContainer});


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

