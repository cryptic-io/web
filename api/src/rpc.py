import config
from src.metadata import ArgType
from pprint import pprint
import cgi
import os
import pylib.mongo
import pylib.user
import pylib.fs

'''==================================================================='''

def createUser_meta():
    '''Creates a user'''
    return {
        "args":{
            "username": {
                "type":ArgType.STRING,
                "maxlength":20
            },
            "password": {
                "type":ArgType.STRING,
                "maxlength":32 #probably going to change
            }
        }
    }
def createUser_rpc(args,env):
    if pylib.user.createUser(username,password):
        return "success"
    else: 
        {"error":"username taken"}

'''==================================================================='''

def getUserBlob_meta():
    '''Gets a user's blob'''
    return {
        "args":{
            "username": {
                "type":ArgType.STRING,
                "maxlength":20
            }
        }
    }
def getUserBlob_rpc(args,env):
    mongoObj = pylib.user.getUserBlob(args["username"])
    if blob == False:
        return {"error":"user doesn't exist"}
    else:
        return blob

'''==================================================================='''

def updateUserBlob_meta():
    '''Updates a user's blob'''
    return {
        "args":{
            "username": {
                "type":ArgType.STRING,
                "maxlength":20
            },
            "newBlob": {
                "type":ArgType.STRING,
            }
        }
    }
def updateUserBlob_rpc(args,env):
    if pylib.user.updateUserBlob(args["username"],args["newblob"]):
        return "success"
    else:
        return {"error":"user doesn't exist"}

'''==================================================================='''

def uploadFile_meta():
    '''Handles the uploading of a file

    This method doesn't use the standard json object queries the others
    do, since it would mean the entire uplaoded file would have to fit
    into memory. Instead it uses a standard multi-part form and the cgi
    module to get all it's info, including reading and writing the file
    in chunks so as to not use all the memory.

    The file will be put in a directory structure consisting of the
    uploading root (set in config.py), followed by a directory whose name
    is the first letter of the filename, followed by a directory whose
    name is the second letter of the filename, followed by the filename
    itself.

    '''
    return {
        "args":{},
        "read_post_data":False
    }
def uploadFile_rpc(args,env):
    form = cgi.FieldStorage(fp=env['wsgi.input'], environ=env) 
    if not "file" in form:
        return {"error":"no file"}

    fileitem = form["file"]
    filename = os.path.basename(fileitem.filename) 

    if len(filename) < 3:
        return {"error":"filename too short"}
    path = os.path.join(config.upload_root,filename[0],filename[1])+os.sep
    pylib.fs.mkdir_p(path)

    fh = open(path+filename, 
              'wb', 
              config.upload_buffer_size)
    for chunk in pylib.fs.fbuffer(fileitem.file, config.upload_buffer_size):
        fh.write(chunk)
    fh.close()
    return "success"

