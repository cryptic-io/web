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
    loggedOutLayout: [
      "about",
      "upload",
      "register",
      "login"
    ],

    loggedInLayout: [
      "about",
      "files",
      "settings",
      "logout"
    ],

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

    //Specify a specifc color for a specific pretty name, the template will use this if it is given
    nameToColor: {
      "about"     : "carrot",
      "upload"    : "emerald",
      "register"  : "asphalt",
      "login"     : "peter-river",
      "files"     : "emerald",
      "settings"  : "asphalt",
      "logout"    : "peter-river"
    },

    routeNames : {
      "about"     : "about",
      "upload"    : "home",
      "register"  : "register",
      "login"     : "login",
      "files"     : "user",
      "settings"  : "settings",
      "logout"    : "user"
    },

    initialize: function(){
      this.layout=this.loggedOutLayout
    },

    render: function(){
      var categories = _.map(this.layout, function(n){return this.prettyNames[n]},this)
      var colors = _.map(this.layout, function(n){return this.nameToColor[n]},this)
      var routes = _.map(this.layout, function(n){return this.routeNames[n]},this)

      this.$el.html(template({categories:categories, colors: colors, routes:routes}))

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
      e.preventDefault()
      
      var $topBox = $(e.target).closest(".topBox")
      , index = this.$el.find('.topBox').index($topBox)

      this.moveSelectedBar(index)
      this.trigger(this.layout[index]+":click")
    }

  })
})
