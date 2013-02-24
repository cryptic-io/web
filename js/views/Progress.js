//returns the file view
define(["jade!templates/Progress"], function(ProgressTemplate){ 
    return Backbone.View.extend({
        template: ProgressTemplate,
        tagName: "div",
        id: "progressBar", 

        initialize: function(){
            this.percentComplete = this.options.percentComplete || 0;
        },

        render:function(){
            this.$el.html(this.template())
            this.options.container.append(this.$el)
            this.pBar = this.$el.find('#innerProgress')[0]
            this.pBar.max=100
            this.endingPercentage=0
            this.smoothlyIncreasePercentage(0)
        },

        remove:function(){
            this.$el.remove()
            //null the render call so we don't render when this should have been removed
            this.render = function(){};
        },

        updatePercentage: function(){
            // this.$el.find('#innerProgress').anim({'width':this.percentComplete+'%'},1,'linear')
            this.endingPercentage = this.percentComplete
        },

        smoothlyIncreasePercentage: function(currentPercentage){
            debugger;
            this.pBar.value = currentPercentage + .05
            //continuously update the percentage every 
            if (currentPercentage + 1 < this.pBar.max){
                _.delay(_.bind(this.smoothlyIncreasePercentage, this, currentPercentage+1, this.endingPercentage), 10)
            }
        },

        changePercentage: function(newPercentage){
            this.percentComplete = newPercentage
            this.updatePercentage()
        },

        increasePercentage: function(newDeltaPercentage){
            this.percentComplete += newDeltaPercentage
            this.updatePercentage()
        },

        //erases the bar and shows a message
        displayLink: function(link){
            debugger;

            var html = '<input type=text style="width:100%" value="'+ link +'"></input>'
            this.$el.html(html)
            this.$el.find('input')[0].focus()
        }
    })
});
