//returns routes that will be used in the Home page (so most pages)

define(["views/Home","views/Info"],function(HomeView, InfoView){ 
    return Backbone.Router.extend({
        routes: {
              "info" : "info"
            , "home" : "home"
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


        
    })
})

