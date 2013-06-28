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
    initialize: function(){
    },

    render: function(){
      this.$el.html(template())

      //hide all the selected bars to the left off screen
      _.each($('#topBar').find('.selectedBar'), function(e, i){$(e).css("left",-150*(i+1))})
    },
    
    events : {
      "click .topBox" : "handleCategoryClick"
    },

    moveSelectedBar : function(index){
      //cool moving animation
      _.each($('#topBar').find('.selectedBar'), function(e, i){$(e).css("left",-150*(i-index))})
    },

    killClick : function(e){
      debugger;
      e.stopPropagation()
      return false;
    },

    handleCategoryClick : function(e){
      var $topBox = $(e.target).closest(".topBox")

      this.moveSelectedBar(this.$el.find('.topBox').index($topBox))
    }

  })
})
