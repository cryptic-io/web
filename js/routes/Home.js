//returns routes that will be used in the Home page (so most pages)

define(["views/Home","views/Info", "views/File" ],function(HomeView, InfoView, FileView){ 
    return Backbone.Router.extend({
        routes: {
              "info" : "info"
            , "home" : "home"
            , "test" : "test"
            , "download/*linkNameAndPasscode" : "download"
        },

        home: function() {
            console.log('starting home')
            home = new HomeView({el:$('body')})
            home.render()
        },

        info: function() {
            info = new InfoView({el:$('body')})
            info.render()
        },

        download: function(linkNameAndPasscode){
            var linkName = linkNameAndPasscode.split('|')[0]
            var passcode = linkNameAndPasscode.split('|')[1]
            file = new FileView(); 
            file.downloadFile(linkName, passcode, function(){
                debugger;
                console.log('woohoo downloaded the file!');
                file.createDownloadLink();
            });
        },

        test: function(){
            console.log('starting test')

            jas = require(['test/jasmine'])
        },


        
    })
})

