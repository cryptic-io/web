var dependencies = [
    "require" , "core/backbone" , "crypt/sjcl" , "crypt/betterCBC" , "crypt/rsa/rsa2"
]

//define the test files that are going to required in
var testSuites = ["tests/models/user/FS", "tests/models/RSA", "tests/models/Chunk"] 

var requireConfig = {
  baseUrl : "/js",
  //lets set up a jade template loader
  paths: { 
      jade: './require-jade/jade'
    , text: './require-text/text'
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
}

require(requireConfig, dependencies, function(){
  require(testSuites, function(){
    console.log("running tests!")
    // For outputting the test results
    
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
      return htmlReporter.specFilter(spec);
    };

    jasmineEnv.execute();
  })
})
