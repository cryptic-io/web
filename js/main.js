less = { env: 'development' };
/**
 *  Dependencies:
 *
 */

var dependencies = [
    "require"
    //"core/jquery"
    /*
    , "core/zepto"
    , "core/underscore"
    , "core/backbone"
    */
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

    , "crypt/sjcl"
    , "crypt/betterCBC"
    */

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
        ['models/File','views/File','test/test','routes/Home','models/ChunkWorkerInterface','tools/downloader', 'models/UserBlob'],
        function(FileModel, FileView, test, HomeRouter, ChunkWorkerInterface, Downloader, UserBlob) {

            (function ($) {
              $.fn.slideDown = function (duration) {    
                // get old position to restore it then
                var position = this.css('position');
                
                // show element if it is hidden (it is needed if display is none)
                this.show();
                
                // place it so it displays as usually but hidden
                this.css({
                  position: 'absolute',
                  visibility: 'hidden'
                });

                // get naturally height
                var height = this.height();
                
                // set initial css for animation
                this.css({
                  position: position,
                  visibility: 'visible',
                  overflow: 'hidden',
                  height: 0
                });

                // animate to gotten height
                this.animate({
                  height: height
                }, {
                    duration:duration,
                    complete: function(){$(this).css('height','')}
                })
                
              };
            })(Zepto);


            userBlob = UserBlob;
            
            router = new HomeRouter();
            var givenPage = Backbone.history.start()
            if (!givenPage){
                router.navigate('home',{trigger:true})
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

