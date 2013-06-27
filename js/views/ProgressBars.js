//Given a model with a set of objs containing {name:... , percentages:...}, and a title  generate a set of pregress bars
//Also give the ability to return a new view that can update individual bars
define(["jade!templates/Progress", "views/Progress"], function(ProgressTemplates, ProgressBarView){ 
  return Backbone.View.extend({
    render:function(){
      //this is where the array of percentages should be
      // this.model.get("items")
      
      //this is where the title should be
      // this.model.get("title")

      this.$el.html(ProgressTemplates(this.options.bars))
    },

    // this will return an array of objects that can control the percantage and filename of each progress bar 
    getIndividualProgressViews: function(){
      var that = this
      return _.map(this.$el.find(".bars").children(), function(barEl, index){ return (new ProgressBarView({el:barEl, barInfo:that.options.bars[index]})) })
    }

  })
})
