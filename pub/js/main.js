


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

        readData = function(d){
            data = d;
            console.log('done');
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
    , "crypt/sjcl"
    //, "tools/uploader"
]


requirejs(dependencies, startApp);
