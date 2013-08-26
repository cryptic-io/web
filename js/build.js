({
  baseUrl: ".",
  mainConfigFile: "main.js",
  pragmasOnSave: {
      excludeJade : true
  },
  generateSourceMaps : true,
  preserveLicenseComments : false,
  optimize: "uglify2",
  name: "main",
  out: "main-built.js"
})
