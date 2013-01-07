//returns the User View, this contains the fs and is the parent to the userLogin
define(["jade!templates/UserOptions"], function(userOptionsTemplate, hrByteLength){ 
    return Backbone.View.extend({
        template : userOptionsTemplate

        , initialize : function(){
            this.listenTo(this.model, 'change:inOptions', this.render)
        }

        , render: function(){
            if (this.model.get('inOptions') == true){
              this.$el.html(this.template({}))
            }
        }

        , events : {
            "click #saveOptions" : "saveOptions"
            , "click #changePasswordForm > .confirmChange" : "changePassword"
        }

        , changePassword : function(){
            var newPassword = this.$el.find('#newPass').val()
            , oldPassword = this.$el.find('#oldPass').val()
            , userBlob = this.model.get('userBlob')

            console.log('changing password')

            if ( oldPassword == userBlob.get('password') ){
                //we change the password
                userBlob.set('password', newPassword)
                this.model.set('userBlob', userBlob)

                userBlob.saveBlob()
            }
        }

        , saveOptions : function(){
            this.model.set('inOptions', false)
        }
    })
})
