from src.metadata import ArgType
from pprint import pprint
import pylib.mongo
import pylib.user

'''==================================================================='''

def createUser_meta():
'''Creates a user '''
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
