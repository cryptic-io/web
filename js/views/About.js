//returns the Userlogin view, responsible for the look of the user login
define(["jade!templates/About"], function(template, UserBlob){ 
    return Backbone.View.extend({
        id : "aboutContainer",
        className : "floatingContainer",

        render: function() {
            this.$el.html(template());
        },
    })
});
