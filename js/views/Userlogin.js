//returns the Userlogin view, responsible for the look of the user login
define(["jade!templates/Userlogin"], function(Logintemplate, UserBlob){ 
    return Backbone.View.extend({
        template: Logintemplate,

        // The idea here is to setup this view and then forget about. We modify the state of the user using the user model
        // All views should change and be reactive to the changes of the userModel
        // This forces us to have simple interfaces for the models to the views
        initialize: function(){
            //react to a change in the login status of the user
            this.model.on('change:loggedIn', this.render, this)

            this.render()
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
        },

        events: {
            "click #registerButton": "register"
            , "click #loginButton": "login"
        }, 

        register: function(){
            var username = this.$el.find('#usernameInput > input').val()
            ,  password = this.$el.find('#passwordInput > input').val()

            this.model.register(username, password)
        },

        login: function(){
            var username = this.$el.find('#usernameInput > input').val()
            , password = this.$el.find('#passwordInput > input').val()
  

            this.model.login(username, password)
        }


    })
});
