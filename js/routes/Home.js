//returns routes that will be used in the Home page (so most pages)

define(["views/Home","views/Info", "views/File", "views/Progress", "views/User"],function(HomeView, InfoView, FileView, ProgressView, UserView){ 
    return Backbone.Router.extend({
        routes: {
              "info" : "info"
            , "home" : "home"
            , "user/fs/:fileLocation" : "openUserFile"
            , "user" : "user"
            , "test" : "test"
            , "download/*linkNameAndPasscode" : "download"
        },

        user: function(){
            if (!this.userView) {
                console.log('starting user home')
                var home = new HomeView({el:$('#mainContainer')})
                home.render()

                var fileView = new FileView({el:$('#uploadBox')});
                fileView.render()

                //check to see if we need to create it
                this.userView = new UserView({userLoginContainer:$('#userLogin')
                                            , userFilesContainer:$('#userFilesContainer')})
                this.userView.listenTo(fileView, 'fileUploaded', this.userView.fileUploaded)
                this.userView.render()
                
            }else{
                //We already have the page built, we just need to go to the root directory
                this.userView.model.set('fsLocation','/')
            }

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

            var fileView = new FileView({el:$('#uploadBox')});
            fileView.render()
        },

        info: function() {
            info = new InfoView({el:$('#mainContainer')})
            info.render()
        },

        download: function(linkNameAndPasscode){
            var home = new HomeView({el:$('#mainContainer')})
            home.render()

            var linkName = linkNameAndPasscode.split('/')[0]
            var passcode = linkNameAndPasscode.split('/')[1]

            fileView = new FileView({el:$('#uploadBox'),template:"download"});
            fileView.render()
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

