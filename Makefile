CCWEB_DEBUG ?= false
CCWEB_WEBWORKERS ?= true
CONFIG_LOCATION=js/config.js

server.pid: node_modules
	node_modules/http-server/bin/http-server & echo "$$!" > server.pid

server: server.pid

kill-server:
	test -s server.pid || { echo "Already dead"; exit 1; }
	kill `cat server.pid`
	rm server.pid

node_modules:
	npm install

tests: server.pid node_modules config 
	node_modules/phantomjs/lib/phantom/bin/phantomjs js/tools/run-jasmine.js http://localhost:8082/tests.html;

$(CONFIG_LOCATION): 
	#!/bin/sh
	#Source profile so we get NEMO_PORT and NEMO_LOCATION env variables
	. /etc/profile
	echo "//Auto-generated config made in the Makefile. make config" > $@
	echo "define({" >> $@
	echo "debug : $(CCWEB_DEBUG)" >> $@
	echo ", webworkers : $(CCWEB_WEBWORKERS)" >> $@
	echo "})" >> $@

config: $(CONFIG_LOCATION)

deps: node_modules

clean:
	rm $(CONFIG_LOCATION)
