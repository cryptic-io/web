from pprint import pprint
import json
import src.metadata
import src.rpc

from src.metadata import MetadataError


#handles all the bytes nonsense, after this function no other part of the api should
#half to handle string to bytes conversion. Passes off the rest to discovery
def application(env, start_response):
    start_response('200 OK', [('Content-Type','application/json')])
    obj = discovery(env)
    json_str = json.dumps(obj)
    return bytes(json_str,'utf8')

#Discovers the method (or errors), sends the request down to dispatch
def discovery(env):
    method = env['REQUEST_URI'].split('/')[-1]
    if method == '':
        return {"error":"no method"}
    else:
        ret_obj = dispatch(method,env)
        ret_obj['method'] = method
        return ret_obj

#Dispatches the user given method
def dispatch(method,env):
    method_meta = method+"_meta"
    method_rpc = method+"_rpc"
    try:
        #Get metadata for the method
        meta_obj = getattr(src.rpc,method_meta)()
        meta = src.metadata.default_meta
        meta.update(meta_obj)

        if meta['read_post_data']:
            #read data field, jsonify it
            content_length = int(env.get('CONTENT_LENGTH',0))
            data_raw = env['wsgi.input'].read(content_length)
            data = str(data_raw,'utf8')
            data_json = json.loads(data)

            #make sure json is a object
            if not type(data_json) is dict:
                raise MetadataError("json not object")
                
            #process the metadata, do the method
            args = src.metadata.process(meta,data_json)
            return getattr(src.rpc,method_rpc)(args,env)

        else:
            return getattr(src.rpc,method_rpc)({},env)

    #procs if eithere method_meta or method_rpc don't exist
    except AttributeError as e:
        return {"error":"invalid method"}

    #procs if json isn't valid
    except ValueError:
        return {"error":"bad json"}

    #procs if there was a problem in src.metadata.process
    except MetadataError as e:
        return {"error":str(e)}
