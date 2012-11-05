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

        updatePercentage: function(){
            this.$el.find('#innerProgress').css('width',this.percentComplete+'%')
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
