import pprint

#default meta object
default_meta = {
    "args":{},
    "read_post_data":True
}

#defining the different types of possible args
class ArgType:
    STRING=1
    INTEGER=2
    OBJECT=3
    LIST=4

#default arg object
default_arg_meta = {
    "required":True,
}

def process(meta,data):
    ret = {}
    for arg in meta['args'].keys():
        arg_meta = default_arg_meta
        arg_meta.update( meta['args'][arg] )
        pprint.pprint(arg_meta)
        if arg in data:
            ret[arg] = data[arg]
        elif not arg_meta["required"]: 
            pass
        else: 
            raise MetadataError("missing arg '"+arg+"'")

    return ret

class MetadataError(Exception):
    def __init__(self,error):
        self.error = error
    def __str__(self):
        return self.error

