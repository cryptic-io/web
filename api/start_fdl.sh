#!/bin/sh

. bin/activate
uwsgi --http :8001 --wsgi-file=src/fdl.py
