#!/bin/sh

. bin/activate
uwsgi --http :8000 --wsgi-file=src/dispatch.py
