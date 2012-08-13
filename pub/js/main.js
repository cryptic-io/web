


var startApp = function(){
    console.log('the app has started woot woot');

    require(['models/File','views/File','views/MusicPlayer'], function(FileModel, FileView, MusicPlayer){
        var fileView = new FileView();

        $('body').append(fileView.render());

        playMusic = function(){
            fileView.model.getDataURL(function(data){
                var musicPlayer = new MusicPlayer({dataURL : data})
                $('#musicPlayer').append(musicPlayer.render());
            })
        }

        psuedoSlice = function(start, end){
            end = end || this.length;
            output = [];
            for (var i = start; i < end; i++){
                output.push(this[i]);
            }
            return output;
        }

        Int16Array.prototype.slice = Int16Array.prototype.psuedoSlice

        testBetterCBC = function(){
            key=sjcl.random.randomWords(4)

            model.split()
            var startTime = +(new Date());
            model.getArrayBufferChunk(0, function(buffer){
                buf = buffer;
                intview = new Int16Array(buf)
                e = sjcl.mode.betterCBC.encryptChunk(key,buffer)
                

                var endTime = +(new Date());

                delta = (endTime - startTime)/1e3;

                console.log('done. Time taken for encryption',delta);


                console.log('Now going to decrypt');

                var startTime2 = +(new Date());

                d = sjcl.mode.betterCBC.decryptChunk(key,e.buffer);
                var endTime = +(new Date());

                delta = (endTime - startTime2)/1e3;

                console.log('done. Time taken for decryption',delta);

                console.log('testing accuracy')

                viewer = new Int32Array(buf);

                var error = false;
                for (var i=0;i<d.length;i++){
                    if (d[i] != viewer[i]){
                        error = true
                        console.error('Error in checking accuracy at',i);
                        break;
                    }
                }

                if (!error){
                    console.log('Everything checks out');
                }

                console.log('Report:');
                console.log('Total Time (decryption+encryption+test):',(endTime-startTime)/1e3);


            })

        }

        readData = function(d){
            data = d;
            console.log('done');
        };

        timeAndReadData = function(){
            var startTime = +(new Date());

            return function(d){
                var endTime = +(new Date());

                delta = (endTime - startTime)/1e3;

                console.log('done. Time taken',delta);
                data = d;

            }
        };


        fetchMusicPart = function(){
            file = model.get('file');
            musicPart = file.slice(0,100000);

            musicPart = new Blob ([musicPart], {type :'audio/ogg'});
            musicPartFile = new FileModel({file:musicPart});

            (function(){
                musicPartFile.getDataURL(function(data){
                    var musicPlayer = new MusicPlayer({dataURL : data})
                    $('#musicPlayer').append(musicPlayer.render());
                })
            })()



        }

    })
}


/**
 *  Dependencies:
 *
 */

var dependencies = [
    //"core/jquery"
    "core/zepto"
    , "core/underscore"
    , "core/backbone"
    /** crypt libraries **/
    //, "crypt/sjcl"
    //, "tools/uploader"
    //
    //
    //sjcl stuff
    , "crypt/core/sjcl"
    , "crypt/core/aes"
    , "crypt/core/bitArray"
    , "crypt/core/codecString"
    , "crypt/core/codecHex"
    , "crypt/core/codecBase64"
    , "crypt/core/codecBytes"
    , "crypt/core/sha256"
    , "crypt/core/sha1"
    , "crypt/core/ccm"
    , "crypt/core/cbc"
    , "crypt/core/ocb2"
    , "crypt/core/hmac"
    , "crypt/core/pbkdf2"
    , "crypt/core/random"
    , "crypt/core/convenience"
    , "crypt/core/bn"
    , "crypt/core/ecc"
    , "crypt/core/srp"
    , "crypt/betterCBC"

]


requirejs(dependencies, startApp);
