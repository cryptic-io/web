less = { env: 'development' };
/**
 *  Dependencies:
 *
 */


requirejs({
    //lets set up a jade template loader
    paths: { 
        jade: './require-jade/jade'
      , jquery : "core/jquery-2.0.3.min"
      , qr : "core/qrcode.min"
    },
    shim: {
      'core/backbone' : {
        deps : ['core/underscore', 'jquery'],
        exports : 'Backbone'
      },
      'qr': {
        exports:"QRCode"
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
/* We have two nested requires so that we can be sure backbone and sjcl have been loaded
 * prior to entering the rest of the functions.
 * The reason "routes/Router is duplicated is so r.js optimizer sees it
 */
[ "require" , "core/backbone" , "crypt/sjcl" , "crypt/betterCBC" , "crypt/rsa/rsa2", "routes/Router" ],
function(require, Backbone){
    require( 
        ['routes/Router'],
        function(Router) {
            router = new Router();
            var givenPage = Backbone.history.start()
            if (!givenPage){
                router.navigate('about',{trigger:true})
            }
        })
})

