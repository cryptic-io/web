#!/bin/sh
config_location=js/config.js
#Source profile so we get NEMO_PORT and NEMO_LOCATION env variables
. /etc/profile
NEMO_LOCATION=${NEMO_LOCATION:-localhost}
NEMO_PORT=${NEMO_PORT:-8888}
CCWEB_DEBUG=${CCWEB_DEBUG:-false}
CCWEB_WEBWORKERS=${CCWEB_WEBWORKERS:-true}
echo "//Auto-generated config made in snap/build.sh" > $config_location
echo "define({" >> $config_location
echo "NEMO_LOCATION : '$NEMO_LOCATION'" >> $config_location
echo ", NEMO_PORT : '$NEMO_PORT'" >> $config_location
echo ", debug : $CCWEB_DEBUG" >> $config_location
echo ", webworkers : $CCWEB_WEBWORKERS" >> $config_location
echo "})" >> $config_location
