//returns the Userlogin view, responsible for the look of the user login
define(["jade!templates/Userlogin", "models/UserBlob"], function(Logintemplate, UserBlob){ 
    var api = {
      createUser : "/api/createUser"
    }
    return Backbone.View.extend({
        template: Logintemplate,

        initialize: function(){
            //user login info would be here
            //
            //user = new user()
        },

        render: function() {
            this.$el.html(this.template());
        },

        register: function(){
            var username = this.$el.find('#usernameInput')
            ,  password = this.$el.find('#passwordInput')
            this.userBlob = new UserBlob({username:username})
            this.userBlob.hashPassword(password)

            var publickey_n = this.userBlob.get('pub_key').toString(16)
            , publickey_e = this.userBlob.get('e_rsa')
            , blob = this.userBlob.

            //$.post(api.createUser, {


        }


    })
});
