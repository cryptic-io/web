//returns the Userlogin view, responsible for the look of the user login
define(["jade!templates/user/Userlogin"], function(Logintemplate, UserBlob){ 
    return Backbone.View.extend({
        template: Logintemplate,

        id : "userLoginContainer",
        className : "floatingContainer",

        // The idea here is to setup this view and then forget about. We modify the state of the user using the user model
        // All views should change and be reactive to the changes of the userModel
        // This forces us to have simple interfaces for the models to the views
        initialize: function(){
            //react to a change in the login status of the user
            this.listenTo(this.model, 'change:login', this.render)
            this.listenTo(this.model, 'login:success', this.render)
            this.listenTo(this.model, 'login:error', this.render)

            this.render()
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
        },

        events: {
            "click #loginBtn": "login"
            , "click #userOptionsButton": "showUserOptions"
        }, 

        showUserOptions: function(){
            this.model.set('inOptions', true)
        },

        login: function(){
            var username = this.$el.find('#usernameInput > input').val()
            , password = this.$el.find('#passwordInput > input').val()
            , auth_attempt = this.$el.find('#twoStepAuthInput > input').val()
  

            this.model.login(username, password, auth_attempt)
        },

        loginSucess: function(){
        },

        loginError: function(error){
        }

    })
});
