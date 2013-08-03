define(["models/user/FS"],function(userFS){
  describe("Test the user File system:", function(){
    var fs = {name:"root",type:"folder", value:{}}

    var newFS, fileObj, folderObj

    it("Add a file to the fs", function(){
      fileObj = {"link":"linkcode/passcode","filename":"foobar.svg","size":1337,"type":"image/svg+xml","created":1374208047574,"modified":1374208047574,"location":"/","value":"linkCode/passcode"}
      newFS = userFS.addFile(fs, "/", fileObj)
      expect(newFS).toEqual({name:"root",type:"folder",value:{"foobar.svg":fileObj}})
    })

    it("Add a folder to the fs", function(){
      folderObj = { created: 1374268106441, filename: "woot folder", location: "/", modified: 1374268106441, size: "Unknown", type: "folder", value: {}}
      newFS = userFS.addFile(newFS, "/", folderObj)
      expect(newFS).toEqual({name:"root",type:"folder",value:{"foobar.svg":fileObj, "woot folder":folderObj}})
    })

    it("Get a file from the fs", function(){
      expect(userFS.getFile(newFS, "/foobar.svg")).toBe(fileObj)
    })

    it("Delete a file from the fs", function(){
      expect(userFS.removeFile(newFS,"/" ,"foobar.svg")).toEqual({name:"root",type:"folder",value:{"woot folder":folderObj}})
    })

    it("Delete a folder from the fs", function(){
      expect(userFS.removeFile(newFS,"/" ,"woot folder")).toEqual({name:"root",type:"folder",value:{"foobar.svg":fileObj}})
    })

    it("Add a file to the folder", function(){
      var folderObj2 = _.clone(folderObj)
      folderObj2.value = {"foobar.svg":fileObj}

      newFs = userFS.addFile(newFS, "/woot folder", fileObj)

      expect(newFS).toEqual({name:"root",type:"folder",value:{"foobar.svg":fileObj, "woot folder":folderObj2}})
    })

    it("Delete a folder, and all it's files", function(){
      expect(userFS.removeFile(newFS, "/", "woot folder")).toEqual( {name:"root",type:"folder",value:{"foobar.svg":fileObj}} )
      expect(userFS.deleteFolder(newFS, "/", "woot folder")).toEqual( {name:"root",type:"folder",value:{"foobar.svg":fileObj}} )
    }) 

    it("List all the files (i.e. ls)", function(){
      newFS.value["woot folder"].value = {}
      expect(userFS.ls(newFS, "/")).toEqual([fileObj, folderObj])
    })

    it("Clean the filename", function(){
      expect(userFS.cleanFilename("this has slashes!//? and random characters! jf~!@#$%^&*()_+`-=")).toBe("this has slashes!\\/\\/? and random characters! jf~!@#$%^&*()_+`-=")
    })

    it("Clean the path", function(){
      expect(userFS.cleanPath("///foo/bar\\/ file and spaces////f///\\///folder/")).toBe("/foo/bar\\/ file and spaces/f/\\//folder")
    })

    it("Split the path into parts", function(){
      expect(userFS.splitPath("///foo/bar\\/ file and spaces////f///\\///folder/")).toEqual(["foo","bar\\/ file and spaces","f","\\/","folder"])
      expect(userFS.splitPath("/hello/there")).toEqual(["hello","there"])
      expect(userFS.splitPath("/hello/there/")).toEqual(["hello","there"])
    })

    it("Gets the parent fsLocation", function(){
      expect(userFS.getParentFsLocation("/foo/bar/baz")).toBe("/foo/bar")
      expect(userFS.getParentFsLocation("/foo/bar/baz/")).toBe("/foo/bar")
    })




  })
})
