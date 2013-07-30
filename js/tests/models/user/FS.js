define(["models/user/FS"],function(userFS){
  describe("Test the user File system:", function(){
    it("A Simple test", function(){
      var a = [1,2,3]
        , b = [1,2,3]
      expect(_.isEqual(a,b))
    })


  })
})
