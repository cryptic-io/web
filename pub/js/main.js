less = { env: 'development' };
/**
 *  Dependencies:
 *
 */

var dependencies = [
    "require"
    //"core/jquery"
    , "core/zepto"
    , "core/underscore"
    , "core/backbone"
    /** crypt libraries **/
    //, "crypt/sjcl"
    //, "tools/uploader"
    //
    //
    //sjcl stuff
    //All these separated ones are for debugging
    /*
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
    */
    , "crypt/sjcl"
    , "crypt/betterCBC"

]

requirejs({
    //lets set up a jade template loader
    paths: { 
        jade: './require-jade/jade'
    }
},
dependencies, function(require){

    console.log('the app has started woot woot');

    

    require( 
    ['models/File','views/File','views/MusicPlayer','test/test','views/Home'],
    function(FileModel, FileView, MusicPlayer, test, HomeView) {

        home = new HomeView({el:$('body')})
        home.render()

        var fileView = new FileView({el:$('#uploadForm')});
        fileView.render()
        ballz = test


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


    })
})

