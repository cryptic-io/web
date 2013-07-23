//This will define the actions to execute on a test
define([ "views/user/UserOptions" ], function(About){
  return function(){
    return function(){
      console.log('starting test')
      jas = require(['test/jasmine'])
    }
  }
})

