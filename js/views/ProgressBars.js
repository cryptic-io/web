//This is really just a container for floating progress bars, with a nice function that wil insert progress bars into itself
define(["jade!templates/ProgressBars", "views/Progress"], function(ProgressTemplates, ProgressBarView){ 
  return Backbone.View.extend({

    id : "progressBarsContainer",
    className : "floatingContainer",
  
    render:function(){
      this.$el.html(ProgressTemplates({title: this.options.title}))
    },

    setTitle: function(title){
      this.$el.find(".barTitle p").text(title)
    },

    //pass in an array of bar elements and they will be placed appropriately
    insertProgressBars: function(bars){
      var barContainer = this.$el.find(".bars")
      
      _.each(bars, function(bar){
        barContainer.append(bar)
      })
    }

  })
})
