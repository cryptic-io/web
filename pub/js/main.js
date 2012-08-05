


var startApp = function(){
    console.log('the app has started woot woot');

    require(['views/File','views/MusicPlayer'], function(FileView, MusicPlayer){
        var fileView = new FileView();

        $('body').append(fileView.render());

        playMusic = function(){
            fileView.model.getDataURL(function(data){
                var musicPlayer = new MusicPlayer({dataURL : data})
                $('#musicPlayer').append(musicPlayer.render());
            })
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
    , "crypt/sjcl"
]


requirejs(dependencies, startApp);
