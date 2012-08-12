#!/bin/sh

. bin/activate
#uwsgi --http :80 --wsgi-file=src/dispatch.py
uwsgi --socket /tmp/cc.sock --chmod-socket 777 --wsgi-file=src/dispatch.py
