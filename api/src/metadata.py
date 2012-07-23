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
    "maxlength":0
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
        return argtype_switch[arg_meta["type"]](data[arg],arg_meta)
    elif not arg_meta["required"]:
        return False
    else:
        raise MetadataError("missing arg '"+arg+"'")

#Checks a string
def confirm_string(value,arg_meta):
    #Make sure value fits inside maxlength
    if arg_meta["maxlength"] and len(value) > arg_meta["maxlength"]:
        raise MetadataError("string too long")
    return True

#Used as a switch statement (bootleg, but probably more efficient)
#Each ArgType has it's own function
argtype_switch = {
    ArgType.STRING: confirm_string
}



class MetadataError(Exception):
    def __init__(self,error):
        self.error = error
    def __str__(self):
        return self.error

