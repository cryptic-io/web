importScripts('./require.js', './core/underscore.js', './core/backbone.js', './crypt/sjcl.js', './crypt/betterCBC.js');

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

require({baseUrl:'./'},
    [
        'require',
        'models/Chunk'
    ],
    function(require, Chunk){
        var chunkHandle = {},
            currentChunk;

        var command = {
            initializeChunk: function(args){
                var entropy = args.entropy;
                sjcl.random.addEntropy(entropy, 256);
                currentChunk = new Chunk();
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
                        result: linkName
                    });
                });
            },

            download: function(args){
                currentChunk.set({
                    linkName: args.linkName,
                    linkKey: args.linkKey
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

    }
);


