//functions to handle placing elements in the viewable viewport, also listens for screen resizes to move the elements accordingly
//pass in the viewport as the el
//most functions return this so you can chain function calls, if it doesn't return this it should return a promise of something (e.g. button click)
define([], function(){ 
  return Backbone.View.extend({

    offsetFromCenter: 100
    
    , bottomMargin: 200

    , buttonMargin: 80
     
    , minHeight : 500

    , defaultHeight :"calc(100% - 100px)"

    , visibleElements : {} //this is a set of elments that are visible, to keep it fast it's implemented as a hashmap with the key being the elements and value being isVisble or not
    
    , initialize : function(){
      //vector of vectors containing the element and the position function to run (e.g. [[$("#vault"), _.bind(this.placeCenter,this)]...])
      //

      window.onresize = _.debounce(_.bind(function(){ console.log("resizing"); this.rebuildElements()},this), 100)
    }

    , rebuildElements : function(){
      _.each(this.elements, function(elInfo){ elInfo[1]()})
    }

    , removeElement: function(elements, element){
      return _.reject(elements, function(e){ return e[0]===element}); 
    }

    //Track the elements and their placing functions
    , trackElement: function(element, placementFunction){
      //check if jquery obj
      if (_.isArray(element) ) element=element[0]

      this.elements = this.removeElement(this.elements, element);
      this.elements.push([element, placementFunction])
    }

    , findTallestVisibleElement : function(){
      return _.chain(this.visibleElements)
                .reduce(function(m,v,k){ if (v) return m.concat(k); return m }, []) //filter elements who are visible
                .map(function(idname){ return $("#"+idname) })
                .sortBy(function(el){ return -el.height() }) //get tallest one
                .first()
                .value()
    }

    , resizeHeight : function(){
      //get information on the tallest visible element on the page
      var element = this.findTallestVisibleElement()
      , elementHeight = $(element).height()
      , browserHeight = _.max([$("body").height(), this.minHeight]) //information on the browser's size
      , oldHeight = this.$el.height() 
      , oldCSSHeight = this.$el.css("height") //this might be different since it can be "auto"
      , newHeight  // we are going to need this to determine if we need to update the position of the elements

      // we have 2 cases to consider
      // 1: the default browser height is big enough to hold the element + bottomMargin
      // 2: the element + bottomMargin is so big that it is bigger than the default browser height so it requires the page's height to be increased
      //
      // Also, this can be set by multiple items that are displayed 
      // so in order to avoid managing unnecessary state, we will always reset the page's height to the default height when we rebuild elements

      if (this.bottomMargin+elementHeight > browserHeight){
        newHeight = (this.bottomMargin+elementHeight)
      }else{
        newHeight = this.defaultHeight
      }

      if (newHeight !== oldHeight && newHeight !== oldCSSHeight){ 
        this.$el.height(newHeight)
        console.log("resizing height")
        _.defer(_.bind(this.rebuildElements, this))
      }



    }

    , placeElement : function(element, left, top, isVisible){

      $(element).css("left", left)
      $(element).css("top", top)

      //save visibility state
      if (isVisible){
        this.visibleElements[element.id]=true
      }else{
        this.visibleElements[element.id]=false
      }

      this.resizeHeight();

    }

    //rebuilding is a variable that tells the function to not track the element since we are using the tracked elements.
    , placeCenter: function(element, rebuilding){
      if(_.isUndefined(rebuilding)){
        this.trackElement(element,_.bind(this.placeCenter, this, element, true))
      }

      var elementWidth = $(element).width()
      , pageWidth = this.$el.width()
      , placing = (pageWidth/2) - (elementWidth/2)

      this.placeElement(element, placing, "auto", true)

      return this;
    }

    , placeLeftOfCenter: function(element, rebuilding){
      if(_.isUndefined(rebuilding)){
        this.trackElement(element,_.bind(this.placeLeftOfCenter, this, element, true))
      }


      var elementWidth = $(element).width()
      , pageWidth = this.$el.width()
      , placing = pageWidth/2 - elementWidth - this.offsetFromCenter

      this.placeElement(element, placing, 0, true)

      return this;
    }

    , placeRightOfCenter: function(element, rebuilding){
      if(_.isUndefined(rebuilding)){
        this.trackElement(element,_.bind(this.placeRightOfCenter, this, element, true))
      }

      var elementWidth = $(element).width()
      , pageWidth = this.$el.width()
      , placing = pageWidth/2 + this.offsetFromCenter

      this.placeElement(element, placing, 0, true)

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

      this.placeElement(element, placing, "auto", false)

      return this;
    }

    , placeRightOffScreen: function(element, notCompletelyHidden, rebuilding ){
      if(_.isUndefined(rebuilding)){
        this.trackElement(element, _.bind(this.placeRightOffScreen, this, element, notCompletelyHidden, true))
      }

      var elementWidth = $(element).width()
      , pageWidth = this.$el.width()
      , placing 
      , btnElement = $("#leftBtn")

      if (notCompletelyHidden){
        placing = pageWidth - 20;
      }else{
        placing = pageWidth;
      }

      this.placeElement(element, placing, "auto", false)

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

      this.placeElement(element, placing, yPlacing, false)

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

      this.placeElement(element, placing, yPlacing, false)

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
