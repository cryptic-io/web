//returns the file view
define(["jade!templates/Progress"], function(ProgressTemplate){ 
    return Backbone.View.extend({
        template: ProgressTemplate,
        tagName: "div",
        id: "progressBar", 

        render:function(){
            this.$el.html(this.template())
            this.options.container.append(this.$el)
        },
    })
});
