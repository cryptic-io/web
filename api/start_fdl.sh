#!/bin/sh

. bin/activate
#uwsgi --http :8001 --wsgi-file=src/fdl.py
uwsgi --socket /tmp/cc-fdl.sock --chmod-socket 777 --wsgi-file=src/fdl.py
