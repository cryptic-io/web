//define the multipass layer for api calls
define(["apiEndPoints"], function(apiEndPoints){
  var multipassTimeout = 30*60*1e3 // 30 Minutes

  var Multipass  = function(){
        if ( arguments.callee._singletonInstance ){
            return arguments.callee._singletonInstance
        }
        arguments.callee._singletonInstance = this;

        return 
    };

  //all services return a promise
  Multipass.prototype = {
    // Check if the multipass is valid, if it isn't get a new multipass. This will always return a promise
    checkMultipass : function(){
      var promise = $.Deferred()

      if ( _.isUndefined(this.multipassCache) || +(new Date()) > this.multipassCacheTimeout + multipassTimeout ){
        $.post(apiEndPoints.multipass)
            .then(_.bind(this.saveMultiPass, this))
            .then(function(multipass){promise.resolve(multipass)})
      }else{
        promise.resolve(this.multipassCache)
      }

      return promise
    },

    saveMultiPass : function(data){
      var promise = $.Deferred()
      , multipass = data.return

      if (data.error) {
        console.error("Error in getting multipass",data)
      }

      this.multipassCache = multipass
      this.multipassCacheTimeout = +(new Date())

      promise.resolve(multipass)

      return promise
    }

  }
  
  return Multipass 
})
