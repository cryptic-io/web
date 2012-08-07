#!/bin/sh

. bin/activate
#uwsgi --http :8000 --wsgi-file=src/dispatch.py
uwsgi --socket /tmp/cc.sock --chmod-socket 777 --wsgi-file=src/dispatch.py
