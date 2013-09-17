//returns the User View, this contains the fs and is the parent to the userLogin
define(["jade!templates/user/UserOptions", "qr" ], function(userOptionsTemplate, QRCode){ 
    return Backbone.View.extend({
        id : "userOptionsContainer"
        , className : "floatingContainer"

        , template : userOptionsTemplate

        , initialize : function(){
            this.listenTo(this.model, 'change:inOptions', this.render)
        }

        , render: function(){
            this.$el.html(this.template({}))
        }

        , events : {
            "click .changePassword" : "changePassword",
            "click #twoStepAccount" : "addTwoStep"
        }

        , addTwoStep : function(){
          var username = this.model.get('username')
          var secret = this.model.createSecretKey()
          var format = "otpauth://totp/<%= username %>@cryptic.io?secret=<%= secret %>"
          format = _.template(format)({username:username, secret:secret})

          this.$el.find('#qrStuff').show()

          var qrcode = new QRCode("qrcode")
          qrcode.makeCode(format)
          this.trigger("settings:qr:show")

          this.model.addSecretKey("", secret)

          debugger
        }

        , verifyPasswordConsitency: function(){
            passwords = this.$el.find(".newPass").map(function(i,e){return e.value})
            return passwords[0] === passwords[1]
        }

        , changePassword : function(){
            var newPassword = this.$el.find('.newPass').val()
            , oldPassword = this.$el.find('#oldPass').val()
            , userBlob = this.model.get('userBlob')

            console.log('changing password')

            if ( oldPassword == userBlob.get('password') ){
                //we change the password
                userBlob.set('password', newPassword)
                this.model.set('userBlob', userBlob)

                userBlob.saveBlob()
                this.showSuccess("Password Changed")
            }else{
              this.showError("Wrong original password")
            }
        }

        , showSuccess : function(){
        }

        , showError : function(){
        }
    })
})
