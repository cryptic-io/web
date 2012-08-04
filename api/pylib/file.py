import config

def fbuffer(f, chunk_size=config.upload_buffer_size):
    '''Generator to buffer file chunks'''  
    while True:
        chunk = f.read(chunk_size)
        if not chunk: break
        yield chunk
