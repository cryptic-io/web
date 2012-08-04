import config
from src.metadata import ArgType
from pprint import pprint
import cgi
import os
import pylib.mongo
import pylib.user
import pylib.file

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
    '''handles the uploading of a file'''
    return {
        "args":{},
        "read_post_data":False
    }
def uploadFile_rpc(args,env):
    form = cgi.FieldStorage(fp=env['wsgi.input'], environ=env) 
    if "file" in form:
        fileitem = form["file"]
        filename = os.path.basename(fileitem.filename) 
        fh = open(config.upload_root+filename, 
                  'wb', 
                  config.upload_buffer_size)
        for chunk in pylib.file.fbuffer(fileitem.file):
            fh.write(chunk)
        fh.close()
        return "success"
    else:
        return {"error":"no file"}

