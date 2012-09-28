//returns the Home view
define(["jade!templates/Info"], function(InfoTemplate){ 
    return Backbone.View.extend({
        template: InfoTemplate,

        initialize: function(){
        },


        render: function() {
            this.$el.html(this.template());
            this.backgroundDraw()
            this.drawSquares();
        },
        
        backgroundDraw: function(){
            console.log('drawing the background')

        },

        drawSquares: function(){
            //start the first square
            $('#square1').addClass('moveSquareTopRight')
            //start the next square half a second later
            //These will start first
            setTimeout(function(){$('#square2').addClass('moveSquareTopSlightRight')},500)
            setTimeout(function(){$('#square3').addClass('moveSquareRightUp')},1e3)
            setTimeout(function(){$('#square9').addClass('moveSquareMiddleUp')},2e3)
            setTimeout(function(){$('#square11').addClass('moveSquareTopRight')},5e3)


            //Next will come these
            setTimeout(function(){$('#square4').addClass('moveSquareRightUpBig')},13e3)
            setTimeout(function(){$('#square5').addClass('moveSquareTopRight')},20.5e3)
            setTimeout(function(){$('#square6').addClass('moveSquareMiddleUp')},50e3)
            setTimeout(function(){$('#square7').addClass('moveSquareTopSlightRightMiddle')},10.5e3)
            setTimeout(function(){$('#square8').addClass('moveSquareTopSlightRightMiddle')},70e3)

            setTimeout(function(){$('#square10').addClass('moveSquareRightUp')},25e3)
            setTimeout(function(){$('#square10').addClass('moveSquareRightUp')},35e3)


            //Easter Egg!!!
            setTimeout(function(){$('.skullGIF').addClass('moveSquareRightUp')},10*60e3)

        }



    })
});
