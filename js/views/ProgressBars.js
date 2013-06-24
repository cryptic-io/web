//Given a model with a set of objs containing {name:... , percentages:...}, and a title  generate a set of pregress bars 
//
define(["jade!templates/Progress"], function(ProgressTemplates){ 
  return Backbone.View.extend({
    render:function(){
      //this is where the array of percentages should be
      // this.model.get("items")
      
      //this is where the title should be
      // this.model.get("title")

      this.$el.html(ProgressTemplates(this.model.attributes))
    }
  })
})
