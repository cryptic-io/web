//This handles the categories that appear on the right of the header bar
//
// When a user clicks one of the buttons on the top right (lets call them categories)
//
// this module will fire an event to let anyone who cares know that they clicked that category
// it will also move the position indicator to indicate which category the user is on
//
// the position indicator is simply a slightly highlighted box under the box
//
define(["jade!templates/TopBar"], function(template){
  return Backbone.View.extend({

    //store the index of the buttons
    loggedOutLayout: {
      "about":0,
      "upload":1,
      "register":2,
      "login":3
    },

    loggedInLayout: {
      "about":0,
      "files":1,
      "settings":2,
      "logout":3
    },

    // Keep track of a mapping between names that are used internally (here) and names that are rendered to the DOM
    prettyNames: {
      "about":"About",
      "upload":"Upload",
      "register":"Register",
      "login":"Login",
      "files":"Files",
      "settings":"Settings",
      "logout":"Logout"
    },

    initialize: function(){
      this.layout=this.loggedOutLayout
    },

    render: function(){
      var categories = _.chain(this.layout)
                        .keys()
                        .map(function(n){return this.prettyNames[n]},this).value()
      this.$el.html(template({categories:categories}))

      //hide all the selected bars to the left off screen
      _.each($('#topBar').find('.selectedBar'), function(e, i){$(e).css("left",-150*(i+1))})
    },

    changeToLoggedIn : function(){
      this.layout = this.loggedInLayout;
      this.render()
    },

    changeToLoggedOut : function(){
      this.layout = this.loggedOutLayout;
      this.render()
    },
    
    events : {
      "click .topBox" : "handleCategoryClick"
    },

    moveSelectedBar : function(index){
      //cool moving animation
      _.each($('#topBar').find('.selectedBar'), function(e, i){$(e).css("left",-150*(i-index))})
    },

    //these next functions are convience so that the outside doesn't have to know what index something is
    select : function(category){ this.moveSelectedBar(this.layout[category]) },

    handleCategoryClick : function(e){
      var $topBox = $(e.target).closest(".topBox")
      , index = this.$el.find('.topBox').index($topBox)

      this.moveSelectedBar(index)
      this.trigger(_.invert(this.layout)[index]+":click")


    }

  })
})
