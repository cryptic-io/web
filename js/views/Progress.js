//returns the file view
define([], function(ProgressTemplate){ 
    return Backbone.View.extend({
        percentage: function(percentage){
          //redirect to css's percentage
          return $().css.apply(this.$el.find(".innerBar"),["width",percentage])
        },
        text : function(text){
          //just redirect to zepto's text
          return $().text.apply(this.$el.find("p.barText"),[text])
        },
        link: function(link, text){
          this.$el.find(".barLink")
                .attr("href",link)
                .text(text)
                .show()
        }



    })
});
