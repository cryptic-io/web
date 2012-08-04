import config
import os
import errno

def fbuffer(f, chunk_size=config.upload_buffer_size):
    '''Generator to buffer file chunks'''  
    while True:
        chunk = f.read(chunk_size)
        if not chunk: break
        yield chunk

def mkdir_p(path):
    try:
        os.makedirs(path)
    except OSError as exc: # Python >2.5
        if exc.errno == errno.EEXIST:
            pass
        else: raise
