crypticcandy
============

(my thoughts/questions)

Feature set
------------
* Upload/download of large files
* Files encrypted file side.
  * I think the encryption key should be something relatively small (64 chars?) that can be copy/pasted into a form
  * When uploading a key is generated and used to encrypt the file (and filename) which is then sent to us
  * When downloading a user goes to a file's url, and must put the key for that file into a form. The file is then downloaded and decryption is attempted.

* User features (aka, things a user gets when they log in)
  * Being able to use the same key for different files?
  * Keeping track of the urls for all the files you've uploaded (maybe with option to decrypt filenames if the user wants to give the key)
  * Payment???


Structure
--------
Here's my thinking for how to structure this:

* Client (javascript/css/html/magic) @marco
* Api (language?) @brian/@marco
* Backend file servers (erlang) @brian

The api language is the important question, since whatever we choose we're going to be more or less married to. PHP is the easy choice, I was also thinking maybe python? I haven't used it in a while but it's not terribly hard. I would rather not ruby, and I don't think anyone but me would enjoy perl :P If all else fails.... ASP.NET

Also, I'm thinking the api just needs to be a single end-point for interacting with the backend (user authentication, file uploading, stats, etc...) so it can be independent of whatever is serving up the client code.



These are just my thoughts, lemme know if you disagree with anything or if I missed something.