//Tests using jasmine
define(['require','tests/jasmine/lib/jasmine','tests/jasmine/lib/jasmine-html'], function(require, _jasmine, _jasmineHTML){

  var testSuites = ["tests/models/user/FS"] 

  require(testSuites, function(){
    console.log("running tests!")
    // For outputting the test results
    
    
    
    hr = new jasmine.HtmlReporter({ body:$("#testsContainer")[0], location: window.location})

    env = jasmine.getEnv()
    env.addReporter(hr)
    env.execute();
  })
})
