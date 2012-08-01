crypticcandy api
===============

Usage
-----
This api is completely stand-alone and is seperate from any client using it. It's accessible using http posts to an endpoint specified by the dev gods. For example let's say this endpoint is ```http://crypticcandy.com/api```. To use the *getStuffFromBox* method, which takes in a parameter called *boxID*, you would do:

    curl -d '{"boxID":1234}' http://crypticcandy.com/api/getStuffFromBox

and this would return a json object which looks like so:

    {"method":"getStuffFromBox","return":"returnObj"}

Where returnObj could be ```{"error":"some error"}``` in the case of an error or the actual return from the method.

Supported Methods
-----------------

You can see all the methods the api currently supports and the argument list for each in the */api/src/rpc.py* file.

Installation
------------
Installing the api is fairly easy. First get python 3.2 (it's what I'm developing with, and I can't vouch for other versions. I know for sure it won't work with python2). You will also need virtualenv, either from running ```pip install virtualenv``` or through some other package manager (I recommend using pip, better to keep all your language packages using the same package manager).

Once you have these, go into the api folder in the project and:

    #setup the python sandbox
    virtualenv .

    #activate the sandbox paths and python binary and so-forth
    . bin/activate

    #install requirements into your sandbox
    pip install --upgrade -r requirements.txt

This will get a working python sandbox with all needed dependencies without fucking up your own personal python environment with its dependencies. You can go ahead and use the *start.sh* script to start up a uwsgi instance of the api, by default it listens on port 8000, although this will be different in a non-development setup.
