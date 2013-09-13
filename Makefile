CCWEB_DEBUG ?= false
CCWEB_WEBWORKERS ?= true
CCWEB_SERVERROOT ?= "\"\""
CONFIG_LOCATION=js/config.js

## location of tools
PHANTOMJS=node_modules/phantomjs/bin/phantomjs
PHANTOM_JASMINE=node_modules/phantom-jasmine/lib/run_jasmine_test.coffee

## Coffee script in/out locations
COFFEE_IN=coffee/
COFFEE_OUT=js/

## Recess
RECESS=node_modules/recess/bin/recess

## r.js
RJS=node_modules/requirejs/bin/r.js

all: config deps coffee

production: config optimize

less-optimize: 
	# Compress styles
	$(RECESS) less/bootstrap/bootstrap.less  less/flat/flat-ui.less less/cryptic.less  --compress > cryptic.css

optimize: deps less-optimize
	# Compress JS
	$(RJS) -o build.js
	# Putting optimized index.html
	rm index.html
	ln -s index-optimized.html index.html

dev-optimize: deps
	# Compress JS w/o minification
	$(RJS) -o js/build.js optimize=none
	# Putting optimized index.html
	rm index.html
	ln -s index-optimized.html index.html

unoptimize:
	# Restoring original index.html
	rm index.html
	ln -s index-unoptimized.html index.html

config: $(CONFIG_LOCATION)

coffee: .coffee

.coffee:
	node_modules/coffee-script/bin/coffee -o $(COFFEE_OUT) -c $(COFFEE_IN)

server.pid: node_modules
	node_modules/http-server/bin/http-server -p8008 & echo "$$!" > server.pid
	sleep 5 #wait a bit

server: server.pid

kill-server:
	if test -s server.pid; \
	then \
		(kill `cat server.pid`); \
		rm server.pid ; \
	else \
		echo "Already dead"; \
	fi

node_modules:
	npm install

tests: server.pid node_modules all
	$(PHANTOMJS) $(PHANTOM_JASMINE) http://localhost:8008/tests.html;

$(CONFIG_LOCATION): 
	#!/bin/sh
	#Source profile so we get CCWEB_DEBUG, CCWEB_WEBWORKERS, and CCWEB_SERVERROOT env variables
	. /etc/profile
	echo "//Auto-generated config made in the Makefile. make config" > $@
	echo "define({" >> $@
	echo "debug : $(CCWEB_DEBUG)" >> $@
	echo ", webworkers : $(CCWEB_WEBWORKERS)" >> $@
	echo ", serverRoot : $(CCWEB_SERVERROOT)" >> $@
	echo "})" >> $@

deps: node_modules

clean: kill-server
	rm $(CONFIG_LOCATION) 
	rm -r node_modules

