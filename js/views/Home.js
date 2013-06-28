//returns the home view
define(["jade!templates/Home"], function(homeTemplate){ 
    return Backbone.View.extend({
        template: homeTemplate,

        initialize: function(){
          console.log("Starting entropy collector")
          sjcl.random.startCollectors()
        },

        render: function() {
            this.$el.html(this.template());
        },
    })
});
