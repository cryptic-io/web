import pymongo

def connection():
    '''Returns a Connection object which connects to the proper mongo instance.'''
    return pymongo.Connection()

def users():
    '''Returns a CollectionExt object for the users collection'''
    return CollectionExt(connection().crypticcandy.users)


class CollectionExt():
    '''Used to extend the functionality of pymongo.collection.Collection, mostly
    to make sure safe is always on'''

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

        
