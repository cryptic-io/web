//functions to handle placing elements in the viewable viewport, also listens for screen resizes to move the elements accordingly
//pass in the viewport as the el
//most functions return this so you can chain function calls, if it doesn't return this it should return a promise of something (e.g. button click)
define(["core/mori"], function(mori){ 
  m = mori
  return Backbone.View.extend({

    offsetFromCenter: 100

    , delayToRemove: 500 //delay in ms before removing an element, so it doesn't go away without while we are looking at it
    
    , bottomMargin: 50

    , topPageMargin: 0 //will be set in the initialize function

    //fuck yeah, clojure datastructures, now we are talking
    , activeViews : mori.set()

    , elements : mori.set()

    , onDelay : false

    , delayedFns : []

    , initialize : function(){
      this.topPageMargin = parseInt( this.$el.css('margin-top') )
      //vector of vectors containing the element and the position function to run (e.g. [[$("#vault"), _.bind(this.placeCenter,this)]...])

      window.onresize = _.debounce(_.bind(function(){ this.rebuildElements()},this), 300)

      // todo: implement variadic pages
      //The size of the viewport can vary depending on how many pages we want
      //this.options.pages 
      
    }

    //keep track of views that are introduced into the viewport
    //if the element hasn't been placed on the page here is where we place it
    //this function and exeunt are the only ones allowed to use views
    , introduce : function(view, index){

      //check delay, if we are in a delay, lets put it on the queue of things to run after the delay
      if ( this.onDelay ) {
        this.delayedFns.push(_.bind(this.introduce,this, view, index))
        return this
      }

      this.activeViews =  mori.conj(this.activeViews, view)

      if (!document.contains(view.el)){
          this.$el.find("#page"+index).append(view.el)
      }

      return this;
    }
    
    , introduceEl : function(el, index){
      if (document.contains(el)){
          $(el).remove()
      }

      this.$el.find("#page"+index).append(el)

      return this;
    }

    //exeunt, as in the stage direction meaning to get off stage
    //This function should be called with a specifc view to get rid of that view, or if not called with a specific view, it will destroy all activeViews
    //can also be called with an array to get rid of a set of views
    , exeunt : function(view){
      //check delay, if we are in a delay, lets put it on the queue of things to run after the delay
      if ( this.onDelay ) {
        this.delayedFns.push(_.bind(this.exeunt,this,view))
        return this
      }

      var itemsToRemove 
      , that = this
      //they passed in an array
      if (_.isArray(view)){
        itemsToRemove = view
      }else if (_.isUndefined(view)){ //they passed in nothing, so get rid of everything
        itemsToRemove = mori.into_array(this.activeViews)
      } else {
        itemsToRemove = [view]
      }

      //because they are a set we can just disjoin the activeViews set from the existings views
      this.activeViews = mori.disj.apply(null, [this.activeViews].concat(itemsToRemove))

      mori.pipeline(
        mori.vector.apply(null,itemsToRemove),
        mori.curry(mori.each,function(view){
          //remove the element from the list keeping track of elements
          that.elements = that.removeElement(that.elements, view.el)
          //wait a bit for the item to fall off screen
          _.delay(_.bind(view.remove,view), that.delayToRemove) 
        }))

      return this;

    }

    , moveToPage: function(index){
      //check delay, if we are in a delay, lets put it on the queue of things to run after the delay
      if ( this.onDelay ) {
        this.delayedFns.push(_.bind(this.moveToPage,this,element,left, top))
        return this
      }

      this.$el.css('left',index*-100+"%")
      return this
    }

    , rebuildElements : function(){
      return mori.each(this.elements, function(elInfo){ elInfo[1]()})
    }

    , removeElement: function(elements, element){
      return mori.remove(function(e){return e[0]===element}, elements)
    }

    //Track the elements and their placing functions
    , trackElement: function(element, placementFunction){
      //check if jquery obj
      if (_.isArray(element) ) element=element[0]

      this.elements = this.removeElement(this.elements, element);
      this.elements = mori.conj(this.elements, [element, placementFunction])
    }

    // function that will cause everything after it to delay
    // works by having a queue, and a flag
    // the placeElement function checks for the flag this.onDelay and will append the function to run to the queue
    // this then calls the queue after the delay
    // if you add more functions and want delay to work with them, make sure you check for the flag and place the function on the queue
    , delay : function(milliseconds){
      // set the flag to true
      this.onDelay = true
      _.delay(_.bind(function(){
        //change the flag
        this.onDelay = false
        // run each delayed fn
        _.each(this.delayedFns, function(fn){ fn() })
      },this), milliseconds)

      return this;
    }

    , placeElement : function(element, left, top){

      //check delay, if we are in a delay, lets put it on the queue of things to run after the delay
      if ( this.onDelay ) {
        this.delayedFns.push(_.bind(this.placeElement,this,element,left, top))
        return this
      }


      $(element).css("left", left)
      $(element).css("top", top)
    }

    //show and hide for chaining convienence
    , show: function(element, useOpacity){
      if ( this.onDelay ) {
        this.delayedFns.push(_.bind(this.show,this,element, useOpacity))
        return this
      }

      if (useOpacity){
        $(element).css('opacity',1)
      }else{
        $(element).show()
      }
      return this
    }

    , hide: function(element, useOpacity){
      if ( this.onDelay ) {
        this.delayedFns.push(_.bind(this.hide,this,element, useOpacity))
        return this
      }

      if (useOpacity){
        $(element).css('opacity',0)
      }else{
        $(element).hide()
      }
      return this
    }

    , toggleAnimate : function(element){
      $(element).toggleClass('noAnimate')
      return this
    }

    // when using position:relative you need to calculate the starting position of the element with reference to previous elements
    // call this function with the previous element since it's recursive. (i.e. this.findOffsetPosition(element.prev())
    , findOffsetPosition : function($element, totalWidth){
      if(_.isUndefined(totalWidth)){
        totalWidth = 0
      }
      
      //at the end of the previous element chain
      if ( $element.width() === null ){
        return totalWidth;
      }

      if ( $element.css('position') !== "absolute" && $element.css('display').indexOf('inline') !== -1){
        totalWidth += $element.width()
      }

      return this.findOffsetPosition($element.prev(), totalWidth)
    }


    //rebuilding is a variable that tells the function to not track the element since we are using the tracked elements.
    , placeCenter: function(element,index, rebuilding){
      if(_.isUndefined(rebuilding)){
        this.trackElement(element,_.bind(this.placeCenter, this, element, index, true))
      }

      var elementWidth = $(element).width()
      , pageWidth = this.$el.find("#page"+index).width()
      , placing = (pageWidth/2) - (elementWidth/2) - this.findOffsetPosition($(element).prev())

      this.placeElement(element, placing, "auto")

      return this;
    }

    , placeLeftOfCenter: function(element, index, rebuilding){
      if(_.isUndefined(rebuilding)){
        this.trackElement(element,_.bind(this.placeLeftOfCenter, this, element, index, true))
      }


      var elementWidth = $(element).width()
      , pageWidth = this.$el.find("#page"+index).width()
      , placing = pageWidth/2 - elementWidth - this.offsetFromCenter - this.findOffsetPosition($(element).prev())

      this.placeElement(element, placing, 0)

      return this;
    }

    , placeRightOfCenter: function(element, index, rebuilding){
      if(_.isUndefined(rebuilding)){
        this.trackElement(element,_.bind(this.placeRightOfCenter, this, element, index, true))
      }

      var elementWidth = $(element).width()
      , pageWidth = this.$el.find("#page"+index).width()
      , placing = pageWidth/2 + this.offsetFromCenter - this.findOffsetPosition($(element).prev())

      this.placeElement(element, placing, 0)

      return this;
    }

  
    //placing items offscreen (outside the viewport) can create a button to bring the item back, so these next functions will support placing a button as well as an array of classes to add to an elem
    
    , placeLeftOffScreen: function(element, notCompletelyHidden, rebuilding ){
      if(_.isUndefined(rebuilding)){
        this.trackElement(element, _.bind(this.placeLeftOffScreen, this, element, notCompletelyHidden, true))
      }

      var elementWidth = $(element).width()
      , pageWidth = this.$el.width()
      , placing 
      , btnElement = $("#leftBtn")

      if (notCompletelyHidden){
        placing = 20 - elementWidth;
      }else{
        placing = 0 - elementWidth;
      }

      placing -= this.findOffsetPosition($(element).prev())

      this.placeElement(element, placing, "auto")

      return this;
    }

    , placeRightOffScreen: function(element, index, notCompletelyHidden, rebuilding ){
      if(_.isUndefined(rebuilding)){
        this.trackElement(element, _.bind(this.placeRightOffScreen, this, element, index, notCompletelyHidden, true))
      }

      var elementWidth = $(element).width()
      , pageWidth = this.$el.find("#page"+index).width()
      , placing 
      , btnElement = $("#leftBtn")


      if (notCompletelyHidden){
        placing = pageWidth - 20;
      }else{
        placing = pageWidth;
      }
      placing -= this.findOffsetPosition($(element).prev())

      this.placeElement(element, placing, "auto")

      return this;
    }

    , placeRightUpOffScreen: function(element, index, notCompletelyHidden, rebuilding){
      if(_.isUndefined(rebuilding)){
        this.trackElement(element, _.bind(this.placeRightUpOffScreen, this, element, index, notCompletelyHidden, true))
      }

      var elementWidth = $(element).width()
      , pageWidth = this.$el.find("#page"+index).width()
      , placing = pageWidth/2 + this.offsetFromCenter - this.findOffsetPosition($(element).prev())
      , elementHeight = $(element).height()
      , yPlacing = 0 - elementHeight - this.topPageMargin

      this.placeElement(element, placing, yPlacing)

      return this;

    }

    , placeRightDownOffScreen: function(element, notCompletelyHidden, rebuilding ){
      if(_.isUndefined(rebuilding)){
        this.trackElement(element, _.bind(this.placeRightDownOffScreen, this, element, notCompletelyHidden, true))
      }

      var elementWidth = $(element).width()
      , pageWidth = this.$el.width()
      , pageHeight = this.$el.height()
      , elementHeight = $(element).height()
      , btnElement = $("#leftBtn")
      , placing = pageWidth/2 + this.offsetFromCenter
      , yPlacing



      if (notCompletelyHidden){
        yPlacing = pageHeight - 80;
      }else{
        yPlacing = pageHeight;
      }

      this.placeElement(element, placing, yPlacing)

      return this;
    }

    , placeLeftDownOffScreen: function(element, notCompletelyHidden, rebuilding ){
      if(_.isUndefined(rebuilding)){
        this.trackElement(element, _.bind(this.placeLeftDownOffScreen, this, element, notCompletelyHidden, true))
      }

      var elementWidth = $(element).width()
      , pageWidth = this.$el.width()
      , pageHeight = this.$el.height()
      , elementHeight = $(element).height()
      , btnElement = $("#leftBtn")
      , placing = pageWidth/2 - elementWidth - this.offsetFromCenter
      , yPlacing



      if (notCompletelyHidden){
        yPlacing = pageHeight - 80;
      }else{
        yPlacing = pageHeight;
      }

      this.placeElement(element, placing, yPlacing)

      return this;
    }

    , placeButtonLeft: function(text, classes, withMargin, rebuilding){
      return this.placeButton($("#leftBtn")[0], text, ["sideBtn"].concat(classes), withMargin, "left", rebuilding)
    }

    , placeButtonRight: function(text, classes, rebuilding){
      return this.placeButton($("#rightBtn")[0], text, ["sideBtn"].concat(classes), "right", rebuilding)
    }

    , placeButtonRightDown: function(text, classes, rebuilding){
      return this.placeButton($("#rightDownBtn")[0], text, ["sideBtn", "rightDownBtn"].concat(classes), "rightDown", rebuilding)
    }

    , placeButtonLeftDown: function(text, classes, rebuilding){
      return this.placeButton($("#leftDownBtn")[0], text, ["sideBtn", "leftDownBtn"].concat(classes), "leftDown", rebuilding)
    }

    , placeButton: function(element, text, classes,  side, rebuilding){
      //We should add the classes before determining the width
      $(element).addClass(classes.join(" "))
      $(element).show();

      if(_.isUndefined(rebuilding)){
        this.trackElement(element, _.bind(this.placeButton, this, element, text, classes, side, true))
      }

      var defer = Q.defer()

      //use css('width'... instead of .width() because the element may be rotated
      var elementWidth = $(element).width()
      , elementHeight = $(element).height()
      , pageWidth = this.$el.width()
      , pageHeight = this.$el.height()
      , placing 
      , yPlacing = 120
      , yMargin = 40


      switch(side){
        case "left":
          placing = 0 - elementWidth;
          break;
        case "right":
          placing = pageWidth - 2*elementWidth;
          break;
        case "leftDown":
          placing = pageWidth/2 - 2*elementWidth - this.offsetFromCenter
          yPlacing = pageHeight - elementHeight*2 - yMargin; 
          break;
        case "rightDown":
          placing = pageWidth/2 + this.offsetFromCenter;
          yPlacing = pageHeight - elementHeight*2 - yMargin; 
          break;
      }


      $(element).children("p").text(text)

      $(element).css("left",placing);
      $(element).css("top",yPlacing);

      if(_.isUndefined(rebuilding)){
        //only want to set this if we aren't rebuilding the positions
        element.onclick = function(){defer.resolve()}
      }

      return defer.promise;
    }
    
    , hideButtonLeft: function(rebuilding){
      var btnElement = $("#leftBtn")

      this.hideButton(btnElement, rebuilding)

      return this;
    }

    , hideButtonRight: function(rebuilding){
      var btnElement = $("#rightBtn")

      this.hideButton(btnElement, rebuilding)

      return this;
    }

    , hideButtonLeftDown: function(rebuilding){
      var btnElement = $("#leftDownBtn")

      this.hideButton(btnElement, rebuilding)

      return this;
    }

    , hideButtonRightDown: function(rebuilding){
      var btnElement = $("#rightDownBtn")

      this.hideButton(btnElement, rebuilding)

      return this;
    }

    , hideButton: function(element, rebuilding){
      if(_.isUndefined(rebuilding)){
        this.trackElement(element[0], _.bind(this.hideButton, this, element, true))
      }

      element.removeClass()
      element.hide()

      return this;
    }

  })
})
