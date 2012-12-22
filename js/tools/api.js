api = function (){

}

api.getMultiPass = function(){
  $.post('/api/getMultiPass',{},function(d){console.log(d)})
}

//define for requirejs
define(function(){return api });
