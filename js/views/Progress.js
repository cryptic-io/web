//returns the file view
define(["jade!templates/Progress"], function(ProgressTemplate){ 
    return Backbone.View.extend({
        template: ProgressTemplate,
        tagName: "div",
        id: "progressBar", 

        initialize: function(){
            $('#progressBar').remove()
            this.percentComplete = this.options.percentComplete || 0;
        },

        render:function(){
            this.$el.html(this.template({percentComplete:this.percentComplete}))
            this.options.container.append(this.$el)
        },

        remove:function(){
            this.$el.remove()
            //null the render call so we don't render when this should have been removed
            this.render = function(){};
        },

        updatePercentage: function(){
            this.$el.find('#innerProgress').anim({'width':this.percentComplete+'%'},1,'linear')
        },

        changePercentage: function(newPercentage){
            this.percentComplete = newPercentage
            this.updatePercentage()
        },

        increasePercentage: function(newDeltaPercentage){
            this.percentComplete += newDeltaPercentage
            this.updatePercentage()
        },
    })
});
