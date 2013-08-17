//define the multipass layer for api calls
define(["core/q", "apiEndPoints"], function(Q, apiEndPoints){
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
    checkMultipass : function(data){
      data = data || {}

      var defer = Q.defer()

      if ( _.isUndefined(this.multipassCache) || +(new Date()) > this.multipassCacheTimeout + multipassTimeout ){
        var xhr = new XMLHttpRequest()
        ,   xhrDefer = Q.defer()

        xhr.open("POST", apiEndPoints.multipass, true);
        xhr.onload = function(e) {
          if (this.status == 200) {
            xhrDefer.resolve(JSON.parse(xhr.responseText))
          }
        }
        xhr.send()

        xhrDefer.promise.then(_.bind(this.saveMultipass, this, data))
                        .then(function(multipass){defer.resolve(multipass)})
      }else{
        data.multipass = this.multipassCache
        defer.resolve(JSON.stringify(data))
      }

      return defer.promise
    },

    saveMultipass : function(formData, multipassData){
      var defer = Q.defer()
      , multipass = multipassData.return

      if (multipassData.error) {
        console.error("Error in getting multipass",data)
      }

      this.multipassCache = multipass
      this.multipassCacheTimeout = +(new Date())

      formData.multipass = multipass

      defer.resolve(JSON.stringify(formData))

      return defer.promise
    }

  }
  
  return Multipass 
})
