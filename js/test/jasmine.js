//Tests using jasmine
define(['test/test','models/File','js/test/jasmine/lib/jasmine.js','js/test/jasmine/lib/jasmine-html.js'], function(testFile, FileModel){


    var loadCss = function(url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }

    loadCss('/js/test/jasmine/lib/jasmine.css')

    console.log('starting test')
    describe('this is an initial suite', function(){
        it('should do nothing of real value', function(){
            expect(true).toBe(true);
        })
    })

    //This will be async hence the need for the runs and waitsFor
    describe('this should upload and download the file', function(){
        var encryptedLink = undefined;
        var testLinkData = undefined;

        it ('should upload and return a link and an iv', function(){

            var uploaded = false

            runs(function(){
                testFile.upload(function(linkData){
                    encryptedLink = ('#download/'+linkData.linkName+'|'+linkData.IVKey)
                    testlinkData=linkData;
                    uploaded = true;
                })
            });

            waitsFor(function(){return uploaded},"Didn't upload in time", 2e3)

            runs(function(){ expect(encryptedLink).toBeDefined();})
        });

        it ('should download and decrypt the file', function(){

            var downloaded = false;

            //spyOn(callback)


            runs(function(){
                //navigate to the download page
                file = new FileModel(); 
                file.download(testlinkData.linkName, testlinkData.IVKey, callback);
            })

            var callback = function(){
                console.log('woohoo downloaded the file!');
                downloaded = true;
                fileData = file.readFile()
                console.log(fileData);
                
            }

            waitsFor(function(){
                return downloaded;
            },'the file to download',5e3)

            runs(function(){
                expect(downloaded).toBe(true)
            })


        })


    });



    // For outputting the test results
    hr = new jasmine.HtmlReporter()

    env = jasmine.getEnv()
    env.addReporter(hr)
    env.execute();
})
