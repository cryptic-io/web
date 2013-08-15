// This is the file that defines the webworker
// Whether web workers are used at all, and how many should be used in parallel are defined under models/File.js

//we need require to do everything else
importScripts('./require.js');

requirejs({
      //lets set up a jade template loader
      shim: {
        'core/backbone' : {
          deps : ['core/underscore'], //zepto isn't here because this is a webworker that cannot talk to the dom
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
  },
  //we need all these dependencies before we load the Chunk model since that model assumes these are in the global context
  ["require" , "core/backbone" , "crypt/sjcl" , "crypt/betterCBC" , "crypt/rsa/rsa2"], 
  function(require, Chunk){
      require(["models/Chunk"], function(Chunk){
        //check to see if browser supports transferable buffers in messages
        var postMessageFunc = self.webkitPostMessage || self.postMessage, //try to use webkitPostMessage
            SUPPORTS_TRANSFERS = false;
        try {
            var testAB = new ArrayBuffer(1);
            self.postMessage({buffer: testAB}, [testAB]);
            if (!testAB.byteLength) { //if there is no byteLength then it was transferred
                SUPPORTS_TRANSFERS = true;
            }
        } catch(e) {}
        if (SUPPORTS_TRANSFERS) {
            self.postMessage = postMessageFunc;
        } else {
            self.postMessage = function(obj) { //ignore the array on the end
                postMessageFunc(obj);
            };
        }

        var currentChunk;

        var command = {
            initializeChunk: function(args){
                var entropy = args.entropy;
                sjcl.random.addEntropy(entropy, 256);
                currentChunk = new Chunk(args.chunkOpts);
                self.postMessage({
                    command: "initializeChunk",
                    status: "success"
                });
            },

            setBuffer: function(args){
                currentChunk.set('buffer', args.arrayBuffer);
                self.postMessage({
                    command: "setBuffer",
                    status: "success"
                });
            },

            newEmptyChunk: function(args){
                var entropy = args.entropy;
                sjcl.random.addEntropy(entropy, 256);

                currentChunk = new Chunk();
                self.postMessage({
                    command: "newEmptyChunk",
                    status: "success"
                });
            },

            upload: function(){
                //the callback returns the linkName
                currentChunk.upload(function(linkName){
                    self.postMessage({
                        command: "upload",
                        status: "success",
                        result: {linkName:linkName, tag: currentChunk.get('tag')}
                    });
                });
            },

            download: function(args){
                currentChunk.set({
                    linkName: args.linkName,
                    linkKeyObj: args.linkKeyObj,
                    tag: args.tag
                });
                currentChunk.decodeIVKey(args.IVKey);

                currentChunk.download(function(decryptedBuffer) {
                    self.postMessage({
                        command: "download",
                        status: "success",
                        result: decryptedBuffer
                    }, [decryptedBuffer]);
                });
            },

            encryptChunk:function(){
                currentChunk.encryptChunk();
                self.postMessage({
                    command: "encryptChunk",
                    status: "success"
                });
            },

            decryptChunk: function(){
                var buffer = currentChunk.decrypt().buffer;

                self.postMessage({
                    command: "decryptChunk",
                    status: "success",
                    result: buffer
                }, [buffer]);
            },

            encodeIVKey: function(){
                var ivKey = currentChunk.encodeIVKey();
                self.postMessage({
                    command: "encodeIVKey",
                    status: "success",
                    result: ivKey
                });
            },

            writeToFile: function(args){
                currentChunk.set('chunkInfo', args.chunkInfo);
                currentChunk.writeToFile(args.fileSystem, args.manifest,
                    //successCallback
                    function(){
                        self.postMessage({
                            command:"writeToFile",
                            status: "success"
                        });
                    },
                    //failureCallback
                    function(){
                        self.postMessage({
                            command:"writeToFile",
                            status: "error"
                        });
                    }
                );
            },

            //setup a callback to be called when the progress changes
            attachProgressListener: function(){
                currentChunk.attachProgressListener(function(progress){
                    self.postMessage({
                        command: "attachProgressListener",
                        status: "success",
                        result: progress
                    });
                });
            }

        };


        self.onmessage = function(event) {
            //route the commands appropriately
            if (event.data.command){
                command[event.data.command](event.data);
            }
        };

        //let the client know that the web worker is ready
        self.postMessage({command:"readyToRock", status:"success"})
    })
  }
);


