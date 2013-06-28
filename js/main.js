less = { env: 'development' };
/**
 *  Dependencies:
 *
 */

test = function(files){debugger}

var dependencies = [
    "require" , "core/backbone" , "crypt/sjcl" , "crypt/betterCBC" , "crypt/rsa/rsa2"
]

requirejs({
    //lets set up a jade template loader
    paths: { 
        jade: './require-jade/jade'
    },
    shim: {
      'core/backbone' : {
        deps : ['core/underscore', 'core/zepto'],
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
        ['routes/Home'],
        function(HomeRouter) {
            router = new HomeRouter();
            var givenPage = Backbone.history.start()
            if (!givenPage){
                router.navigate('home',{trigger:true})
            }
        })
})

