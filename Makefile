CCWEB_DEBUG ?= false
CCWEB_WEBWORKERS ?= true
CONFIG_LOCATION=js/config.js

## location of tools
PHANTOMJS=node_modules/phantomjs/bin/phantomjs
PHANTOM_JASMINE=node_modules/phantom-jasmine/lib/run_jasmine_test.coffee

config: $(CONFIG_LOCATION)

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

tests: server.pid node_modules config 
	$(PHANTOMJS) $(PHANTOM_JASMINE) http://localhost:8008/tests.html;

$(CONFIG_LOCATION): 
	#!/bin/sh
	#Source profile so we get NEMO_PORT and NEMO_LOCATION env variables
	. /etc/profile
	echo "//Auto-generated config made in the Makefile. make config" > $@
	echo "define({" >> $@
	echo "debug : $(CCWEB_DEBUG)" >> $@
	echo ", webworkers : $(CCWEB_WEBWORKERS)" >> $@
	echo "})" >> $@

deps: node_modules

clean: kill-server
	rm $(CONFIG_LOCATION) 
	rm -r node_modules

