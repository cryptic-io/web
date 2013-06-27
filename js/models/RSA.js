//Define the  model that will deal with RSA stuff
define([],function(){ 
    return Backbone.Model.extend({

    defaults: {
      version : 1.0 //version for the RSA
      , e_rsa: "1337" //this is actually hex for 4919
      , bits_rsa: 512
      , iterations_hash: 1337
      , bytes_hash: 16
      , fs : {name:"root", type:"folder", value:{}}
      , sane: true //simple check to see if a blob has been decrypted
    }

    , generateRSA: function(){
      var rsa = new RSAKey()
      rsa.generate(this.get('bits_rsa'), this.get('e_rsa'))
      this.set('rsa',rsa)
    }

    , getRSAObject : function(){
      //store RSA values in base64 likaboss
      return {
        "pub_key": hex2b64(this.get('rsa').n.toString(16))
      , "private_key" : hex2b64(this.get('rsa').d.toString(16))
      , "rsa_e" : hex2b64(this.get('rsa').e.toString(16))
      }
    }

    , setRSAObject : function(RSAObject){
      var rsa = new RSAKey()
      //keys for the N, E, D components of the rsa
      var NEDkeys = [RSAObject.pub_key, RSAObject.rsa_e, RSAObject.private_key]
      //transform the keys to hex from b64
      NEDkeys = _.map(NEDkeys, b64tohex)

      //set the value to the rsa
      rsa.setPrivate.apply(rsa, NEDkeys)
      this.set('rsa',rsa)
      return this;
    }

    //signing using the private key, so that it can be verified with the public key
    , signMessage: function(messageString){
      //first lets hash the message
      var hash = sjcl.hash.sha256.hash(messageString)
      , rsa = this.get('rsa')
      hash = sjcl.codec.base64.fromBits(hash) //convert to b64

      //Sign the hash
      //We sign the hash by encrypting the hash with the private key, so it will later be decrypted with a public key to compare
      //the computed hash with the given, signed hash
      //Place the padding
      padded_hash = pkcs1pad2(hash, (rsa.n.bitLength()+7)>>3)
      //Encrypt the hash using the private key
      signed_hash = padded_hash.modPow(rsa.d, rsa.n)
      
      //b64 encode
      var sig = hex2b64(signed_hash.toString(16))

      return sig
    }


  })
})
