//returns the home view
define(["jade!templates/Home", "views/User"], function(homeTemplate, UserView){ 
    return Backbone.View.extend({
        template: homeTemplate,

        initialize: function(){
        },

        render: function() {
            this.$el.html(this.template());
        },


    })
});
