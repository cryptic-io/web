import pylib.mongo

class MongoField:
    USERNAME ="u"
    PASSWORD ="p"
    BLOB     ="b"

def createUser(username,password,blob=""):
    '''Creates a user and associated blob, unless user already exists

    True when successful
    False when user already exists

    '''
    try:
        pylib.mongo.users().insert({
            MongoField.USERNAME : username,
            MongoField.PASSWORD : password,
            MongoField.BLOB     : blob
        })
        return True
    except pymongo.errors.DuplicateKeyError:
        return False

#gets a blob based on username
def getUserBlob(username):
    '''Gets a blob for a given username

    Blob string when successful
    False when user doesn't exist

    '''
    mongoObj = pylib.mongo.users().find_one({
        MongoField.USERNAME : username
    })
    if mongoObj == None:
        return False
    else:
        return mongoObj[MongoField.BLOB]

#updates a blob if the username already exists.
def updateUserBlob(username,newBlob):
    '''Updates a user's blob with a new blob

    True when successful
    False when user doesn't exist

    '''
    return pylib.mongo.users().update(
        { MongoField.USERNAME : username },
        { "$set": {"b":args["newBlob"]}  }
    )["updatedExisting"]
    
