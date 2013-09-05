({
  appDir: "js/",
  baseUrl: ".",
  mainConfigFile: "js/main.js",
  pragmasOnSave: {
      excludeJade : true
  },
  generateSourceMaps : true,
  preserveLicenseComments : false,
  optimize: "uglify2",
  dir: "js-build",
  modules : [
    { name:"main" }
  ]
})
