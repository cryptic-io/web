less = { env: 'development' };
/**
 *  Dependencies:
 *
 */

var dependencies = [
    "require"
  , "core/backbone"
  , "crypt/sjcl"
  , "crypt/betterCBC"
  , "crypt/rsa/rsa2"
    /** crypt libraries **/
    //, "crypt/sjcl"
    //, "tools/uploader"
    //
    //
    //sjcl dependencies
    //These are separted to aid in debugging sjcl, usually just the minified version will be needed
    /*
    , "crypt/core/sjcl" , "crypt/core/aes" , "crypt/core/bitArray" , "crypt/core/codecString" , "crypt/core/codecHex" , "crypt/core/codecBase64" , "crypt/core/codecBytes" , "crypt/core/sha256" , "crypt/core/sha1" , "crypt/core/ccm" , "crypt/core/cbc" , "crypt/core/ocb2" , "crypt/core/hmac" , "crypt/core/pbkdf2" , "crypt/core/random" , "crypt/core/convenience" , "crypt/core/bn" , "crypt/core/ecc" , "crypt/core/srp" , "crypt/sjcl" , "crypt/betterCBC" 
    */ 
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
      'crypt/rsa/rsa2' : {
        deps:  ["crypt/rsa/base64" , 
                "crypt/rsa/jsbn"   , 
                "crypt/rsa/jsbn2"  , 
                "crypt/rsa/prng4"  , 
                "crypt/rsa/rng"    , 
                "crypt/rsa/rsa"], 
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

