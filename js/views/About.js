//returns the Userlogin view, responsible for the look of the user login
define(["jade!templates/About"], function(template, UserBlob){ 
    return Backbone.View.extend({
        id : "aboutContainer",
        className : "floatingContainer",

        events: {
          "click #subscribeEmail":"saveEmail",
          "keypress #contactEmail":"checkForEnter"
        },

        saveEmail: function(){
          var email = $("#contactEmail").val()

          // save email code

          //update the page
          $("#contactEmail").parent().addClass("success")
          $("#contactEmail").siblings("label").removeClass("icon-envelope")
          $("#contactEmail").siblings("label").addClass("icon-check-sign")
          $("#contactEmail").siblings("label").css("color", "#2ECC71")
          $("#contactEmail").val("Done, and Done")
          $("#subscribeEmail").remove()

        },

        checkForEnter: function(){
          var enterKey = 13;
          if (event.which === enterKey){
            this.saveEmail()
          }
        },

        render: function() {
            this.$el.html(template());
        },
    })
});
