import pymongo

def connection():
    return pymongo.Connection()

def users():
    return ConnectionExt(connection().crypticcandy.users)


class ConnectionExt():
    def __init__(self,coll):
        self.coll = coll

    def update(self,q,o,safe=True):
        return self.coll.update(q,o,safe=safe)

    def insert(self,o,safe=True):
        return self.coll.insert(o,safe=safe)

    def find(self,q=None,f=None,slave_okay=True):
        return self.coll.find(q,f,slave_okay=slave_okay)

    def find_one(self,q=None,f=None,slave_okay=True):
        return self.coll.find_one(q,f,slave_okay=slave_okay)

        
