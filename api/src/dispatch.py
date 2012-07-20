import pprint
import json
import src.rpc

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

def dispatch(method,env):
    method_meta = method+"_meta"
    method_rpc = method+"_rpc"
    try:
        meta_obj = getattr(src.rpc,method_meta)()
        meta = src.rpc.default_meta
        meta.update(meta_obj)
        return meta
    except AttributeError:
        return {"error":"no method"}

