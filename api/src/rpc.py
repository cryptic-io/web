from src.metadata import ArgType
import pylib.mongo

def echo_meta():
    return {
        "args":{
            "echo": {
                "type":ArgType.STRING,
                "required":True
            }
        }
    }

def echo_rpc(args,env):
    if "echo" in args:
        return {"echo":args["echo"]}
    else:
        return {}

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
