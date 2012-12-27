//returns the User View, this contains the fs and is the parent to the userLogin
define(["jade!templates/User", "views/Userlogin"], function(userTemplate, UserLoginView){ 
    return Backbone.View.extend({
        template: userTemplate,

        initialize: function(){
        },


        render: function() {
            var userLoginView = new UserLoginView({
              el:this.options.userLoginContainer
            })
            userLoginView.render()

            //this.$el.html(this.template());
        },

    })
});
