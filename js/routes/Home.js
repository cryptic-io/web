//returns routes that will be used in the Home page (so most pages)

define(["views/Home","views/Info", "views/File", "views/Progress"],function(HomeView, InfoView, FileView, ProgressView){ 
    return Backbone.Router.extend({
        routes: {
              "info" : "info"
            , "home" : "home"
            , "test" : "test"
            , "download/*linkNameAndPasscode" : "download"
        },

        home: function() {
            console.log('starting home')
            var home = new HomeView({el:$('#mainContainer')})
            home.render()

            fileView = new FileView({el:$('#uploadBox')});
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

