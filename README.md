#Cryptic Candy - A Tale in 4 Acts

#Prelude - Encrypted Cloud Storage
Cryptic Candy is an extremely simple solution to a difficult problem. How do we securely store files?

We place so much trust in other people, hoping nothing bad will happen with the information we share, but what if we could change that?
What if we could give you back control of your data? What if you were the only person with viewing rights to your data?

Why not?

# Act I - Openness

There are two types of securities:
 * Security through obscurity (As long as nobody notices there is a hole in the wall, there isn't)
 * Security through openness (Show as many people as you can the wall, if there is a hole let's fix it right now)

So here it is, our wall. Open sourced for the whole world to see!

# Act II - Structure
  
  
    
###Files:
  * Files are broken up into chunks (whose size is specified in models/Chunk.js under ChunkSize)
  * Each file has a manifest file which contains the order, links, and passwords for the chunks
  * The url for the file is actually the link to the manifest file and the manifest's password.
  * The manifest itself is a chunk
  
###Chunks:
  * Chunks are essentially key/values on the server. 
  * linkName refers to the key of the file on the server.
  * Chunks are individually Encrypted and Uploaded (or Downloaded and Decrypted)
  * Chunks allow parallel upload/download and parallel encryption/decryption
  * Chunks can be implemented transperantly using webworkers (change the boolean in models/File.js)
  * Each chunks has a randomly generated passphrase associated with it

###User Accounts:
  * Users are given a public/private key
  * User passwords are never sent over the wire (not even the hash)
  * Users have a blob, or an object containing there hashed password, private/public key, and a list of file links
  * User blobs are encrypted before being sent to the server
  * Blobs are encrypted using AES with a PBKDF2 hashed password (to prevent against bruteforcing user blobs) as the key
  * User request are signed using their private key
  * The server only stores the username, public key, and encrypted blob


# Act III - Config:
* set $NEMO_LOCATION to the location of the nemo server, defaults to localhost
* set $NEMO_PORT to the port of the nemo server, defaults to 8888

# Act IV - Build:
* Run sh build.sh to generate the js/config.js file 
