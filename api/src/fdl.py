import config
import json
import os
import pylib.fs
from pprint import pprint

def application(env, start_response):
    obj = process(env)
    if type(obj) is dict:
        start_response('200 OK', [('Content-Type','application/json')])
        json_str = json.dumps(obj)
        return bytes(json_str,'utf8')
    else:
        try:
            fh = open(obj,'rb')
            start_response('200 OK', [('Content-Type','application/octet-stream')])
            return pylib.fs.fbuffer(fh,config.upload_buffer_size)
        except IOError as e:
            if e.errno == 2: 
                start_response('200 OK', [('Content-Type','application/json')])
                return b'{"error":"file dne"}'
            else: raise

def process(env):

    try:
        content_length = int(env.get('CONTENT_LENGTH',0))
        data_raw = env['wsgi.input'].read(content_length)
        data = str(data_raw,'utf8')
        data_json = json.loads(data)
        
        #make sure json is a object
        if not type(data_json) is dict:
            return {"error":"json not object"}

        if not "filename" in data_json:
            return {"error":"filename missing"}

        filename = os.path.basename(data_json['filename']) 
        path = config.upload_root+pylib.fs.upload_relpath(filename)+filename

        return path

    except:
        return {"error":"bad json"}
