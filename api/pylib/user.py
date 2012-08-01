import pylib.mongo

class MongoField:
    USERNAME ="u"
    PASSWORD ="p"
    BLOB     ="b"

def createUser(username,password,blob=""):
    try:
        pylib.mongo.users().insert({
            MongoField.USERNAME : username,
            MongoField.PASSWORD : password,
            MongoField.BLOB     : blob
        })
        return True
    except pymongo.errors.DuplicateKeyError:
        return False

def getUserBlob(username):
    mongoObj = pylib.mongo.users().find_one({
        MongoField.USERNAME : username
    })
    if mongoObj == None:
        return False
    else:
        return mongoObj[MongoField.BLOB]

def updateUserBlob(username,newBlob):
    return pylib.mongo.users().update(
        { MongoField.USERNAME : username },
        { "$set": {"b":args["newBlob"]}  }
    )["updatedExisting"]
    
