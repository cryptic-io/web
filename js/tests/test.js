//define the test files that are going to required in
var testSuites = ["tests/models/user/FS"] 

var requireConfig = {
  baseUrl : "/js"
}

require(requireConfig, testSuites, function(){
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
