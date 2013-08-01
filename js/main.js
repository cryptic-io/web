less = { env: 'development' };
/**
 *  Dependencies:
 *
 */

var dependencies = [
    "require" , "core/backbone" , "crypt/sjcl" , "crypt/betterCBC" , "crypt/rsa/rsa2"
]

requirejs({
    //lets set up a jade template loader
    paths: { 
        jade: './require-jade/jade'
      , jquery : "core/jquery-2.0.3.min"
    },
    shim: {
      'core/backbone' : {
        deps : ['core/underscore', 'jquery'],
        exports : 'Backbone'
      },
      'crypt/betterCBC' : {
        deps:  ['crypt/sjcl'],
        exports : 'sjcl'
      },
      'crypt/rsa/rng' : {
        deps : ["crypt/rsa/prng4"]
                
      },
      'crypt/rsa/jsbn2' : {
        deps : ["crypt/rsa/jsbn",
                "crypt/rsa/base64" , 
                "crypt/rsa/rng"]     
      },
      'crypt/rsa/rsa2' : {
        deps:  ["crypt/rsa/jsbn2", "crypt/rsa/rsa"], 
        exports : 'RSAKey'
      }
  }
},
dependencies, function(require, Backbone){
    require( 
        ['routes/Router'],
        function(Router) {
            router = new Router();
            var givenPage = Backbone.history.start()
            if (!givenPage){
                router.navigate('home',{trigger:true})
            }
        })
})

