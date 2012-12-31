//returns the Userlogin view, responsible for the look of the user login
define(["jade!templates/Userlogin", "models/UserBlob"], function(Logintemplate, UserBlob){ 
    var api = {
      createUser : "/api/createUser"
      , getUserBlobs : "/api/getUserBlobs"
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

        events: {
            "click #registerButton": "register"
            , "click #loginButton": "login"
        }, 

        register: function(){
            var username = this.$el.find('#usernameInput > input').val()
            ,  password = this.$el.find('#passwordInput > input').val()

            //testing
            username="frank3"
            password="sinatra"

            this.userBlob = new UserBlob(
                {username:username
                 , password: password
            })
            this.userBlob.generateRSA()

            var userBlob = this.userBlob.getBlob()
            , publickey_n = userBlob.pub_key
            , publickey_e = userBlob.rsa_e
            , encryptedBlob = this.userBlob.encryptBlob(userBlob, password)

            $.post(api.createUser 
                , JSON.stringify(
                    { username:username
                      , publickey_n: publickey_n
                      , publickey_e: publickey_e
                      , blob : encryptedBlob} )
                , _.bind(this.registerCallback, this))
        },

        login: function(){
            var username = this.$el.find('#usernameInput > input').val()
            , password = this.$el.find('#passwordInput > input').val()

            username = "frank3"
            password = "sinatra"
            this.userBlob = new UserBlob({username:username, password:password})

            $.post(api.getUserBlobs 
                   , JSON.stringify(
                       { username: username})
                   , _.bind(this.loginCallback,this))
        },

        loginCallback: function(response){
            data = response
            var password = this.userBlob.get('password')

            password = "sinatra"
            userBlobs = response.return.blobs

            userBlobs = _.map(userBlobs, _.bind(this.userBlob.decryptBlob,this, password))

            var userBlob = this.userBlob.consolidateBlobs(userBlobs)

            //save the id
            userBlob.id = response.return.id
            this.userBlob.setBlob(userBlob)

            this.trigger('loggedIn')
        },

        registerCallback: function(){
        }


    })
});
