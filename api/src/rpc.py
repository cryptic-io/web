from src.metadata import ArgType

def echo_meta():
    return {
        "args":{
            "echo": {
                "type":ArgType.STRING,
                "required":True,
                "maxlength":5
            }
        }
    }

def echo_rpc(args,env):
    if "echo" in args:
        return {"echo":args["echo"]}
    else:
        return {}
