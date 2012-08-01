from src.metadata import ArgType
from pprint import pprint
import pylib.mongo

'''
    createUser
        @(str)username
        @(str)password
        ="success"
'''
def createUser_meta():
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
    pylib.mongo.users().insert({
        "u": args["username"],
        "p": args["password"],
        "b": ""
    })
    return "success"


'''
    getUserBlob
        @(str)username
        =(str)blob
'''
def getUserBlob_meta():
    return {
        "args":{
            "username": {
                "type":ArgType.STRING,
                "maxlength":20
            }
        }
    }
def getUserBlob_rpc(args,env):
    mongoObj = pylib.mongo.users().find_one({"u":args["username"]})
    if mongoObj == None:
        return {"error":"user doesn't exist"}
    else:
        return mongoObj["b"]

'''
    updateUserBlob
        @(str)username
        @(str)newblob
        =(str)blob
'''
def updateUserBlob_meta():
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
    pylib.mongo.users().update({"u":args["username"]},{"$set":{"b":args["newBlob"]}})
    return "success"
