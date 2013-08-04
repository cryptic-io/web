define(["models/RSA"],function(RSA){
  describe("Test the RSA model:", function(){
    rsa = new RSA()

    it("generates an rsa object", function(){
      rsa.generateRSA()
      expect(rsa.has("rsa")).toBe(true)
    })

    it("gets and sets correctly", function(){
      rsaObject = rsa.getRSAObject()
      newRsa = new RSA()
      newRsa.setRSAObject(rsaObject)
      otherObject = newRsa.getRSAObject()
      expect(b64tohex(rsaObject.pub_key)).toEqual(b64tohex(otherObject.pub_key))
      expect(b64tohex(rsaObject.private_key)).toEqual(b64tohex(otherObject.private_key))
    })

    it("sets correctly, from external keys", function(){
      var n = hex2b64("a223f9eabbe1c541976d3e603bcbab6c359036d9d81c7582a8999d50f994a45f0adcb66c5ae7b859518a38ddfb52397a33b2e7e1d1f79551ba60e98d68c02873")
      ,   e = hex2b64("10001")
      ,   d = hex2b64("6903400425f78dd87388cf936866faf9b49f58c732cf0bd4b9f9f407d3fd3682310abdec4cfdd9c73ef79b6dbbb1e38fbae9ec199fc6ea00488f883316d35bd1")

      var rsaObject = { pub_key:n, private_key:d, rsa_e:e }

      rsa = new RSA()
      rsa.setRSAObject(rsaObject)
    })
    
    it("Signs a message", function(){
      var n = hex2b64("a223f9eabbe1c541976d3e603bcbab6c359036d9d81c7582a8999d50f994a45f0adcb66c5ae7b859518a38ddfb52397a33b2e7e1d1f79551ba60e98d68c02873")
      ,   e = hex2b64("010001")
      ,   d = hex2b64("6903400425f78dd87388cf936866faf9b49f58c732cf0bd4b9f9f407d3fd3682310abdec4cfdd9c73ef79b6dbbb1e38fbae9ec199fc6ea00488f883316d35bd1")

      var rsaObject = { pub_key:n, private_key:d, rsa_e:e }

      rsa = new RSA()
      rsa.setRSAObject(rsaObject)

      ct = rsa.signMessage("Message Woot!")
    })

  })
})
