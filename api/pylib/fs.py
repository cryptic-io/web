import os
import errno

def fbuffer(f, chunk_size, close_after=True):
    '''Generator to buffer file chunks'''  
    while True:
        chunk = f.read(chunk_size)
        if not chunk: 
            if close_after: f.close()
            break
        yield chunk

def mkdir_p(path):
    '''Safely make sure a structure of directories exists'''
    try:
        os.makedirs(path)
    except OSError as exc: # Python >2.5
        if exc.errno == errno.EEXIST:
            pass
        else: raise

def upload_relpath(filename):
    '''Returns uploaded file path relative to the upload root'''
    return os.path.join(filename[0],filename[1])+os.sep
    
