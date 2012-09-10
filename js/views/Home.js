//returns the Home view
define(["jade!templates/Home"], function(HomeTemplate){ 
    return Backbone.View.extend({
        template: HomeTemplate,

        initialize: function(){
            //user login info would be here
            //
            //user = new User()
        },


        render: function() {
            this.$el.html(this.template());
        },


    })
});
