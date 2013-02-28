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
            , "click #userOptionsButton": "showUserOptions"
        }, 

        showUserOptions: function(){
            this.model.set('inOptions', true)
        },

        register: function(){
            var username = this.$el.find('#usernameInput > input').val()
            ,  password = this.$el.find('#passwordInput > input').val()
            ,  use2step = this.$el.find('#use2StepAuth > input').is(':checked')

            this.model.once('secretKeyCreated', function(secretKey){
                if (!use2step) return;
                console.log('secret is:', secretKey);
                var qrURL = 'https://www.google.com/chart?chs=200x200&chld=M|0&cht=qr&chl=otpauth://totp/'+username+'@cryptic.io%3Fsecret%3D'+secretKey;
                alert("Open this link in another tab to view to code you need to scan with the Google Authenticator app: "+qrURL)
            },this.model)

            this.model.register(username, password, use2step)

        },

        login: function(){
            var username = this.$el.find('#usernameInput > input').val()
            , password = this.$el.find('#passwordInput > input').val()
            , auth_attempt = this.$el.find('#twoStepAuthInput > input').val()
  

            this.model.login(username, password, auth_attempt)
        },

        renderOptions: function(){
        },


    })
});
