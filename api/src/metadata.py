import pprint

#default meta object
default_meta = {
    "args":{},
    "read_post_data":True
}

#defining the different types of possible args
class ArgType:
    STRING  =1
    INTEGER =2
    OBJECT  =3
    LIST    =4

#default arg object
default_arg_meta = {
    "required":True,
    "minlength":0,
    "maxlength":0,
    "minvalue":0,
    "maxvalue":0
}

#Begin processessing the metadata object
def process(meta,data):
    ret = {}
    #Each key in meta is the name of a request argument, the object attached
    #to that key is the metadata requirements for that argument's value
    for arg in meta['args'].keys():
        #Merge defined requirements with default
        arg_meta = default_arg_meta
        arg_meta.update( meta['args'][arg] )
        #Check the given request data against the requirements
        if confirm_arg_general(data,arg,arg_meta):
            ret[arg] = data[arg]
        else:
            pass

    return ret

#Returns True if key arg in data is value when checked against meta
#Returns False if it should be ignored
#Will raise an exception if it's not valid
def confirm_arg_general(data,arg,arg_meta):
    #Check if arg is even required, if so and it's present send data
    #off to appropriate method through the use of the argtype_switch dict
    if arg in data:
        return argtype_switch[arg_meta["type"]](data,arg,arg_meta)
    elif not arg_meta["required"]:
        return False
    else:
        raise MetadataError("missing arg '"+arg+"'")

#Checks a string
def confirm_string(data,arg,arg_meta):
    if not isinstance(data[arg],str):
        raise MetadataError("'"+arg+"' not a string")
    elif arg_meta["minlength"] and len(data[arg]) < arg_meta["minlength"]:
        raise MetadataError("'"+arg+"' too short")
    elif arg_meta["maxlength"] and len(data[arg]) > arg_meta["maxlength"]:
        raise MetadataError("'"+arg+"' too long")
    else:
        return True

#Checks an integer
def confirm_integer(data,arg,arg_meta):
    if not isinstance(data[arg],int):
        raise MetadataError("'"+arg+"' not an integer")
    elif arg_meta["minvalue"] and data[arg] < arg_meta["minvalue"]:
        raise MetadataError("'"+arg+"' too small")
    elif arg_meta["maxvalue"] and data[arg] > arg_meta["maxvalue"]:
        raise MetadataError("'"+arg+"' too large")
    else:
        return True

#Used as a switch statement (bootleg, but probably more efficient)
#Each ArgType has it's own function
argtype_switch = {
    ArgType.STRING:     confirm_string,
    ArgType.INTEGER:    confirm_integer
}



class MetadataError(Exception):
    def __init__(self,error):
        self.error = error
    def __str__(self):
        return self.error

