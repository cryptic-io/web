config_location=../js/config.js
NEMO_LOCATION=${NEMO_LOCATION:-localhost}
NEMO_PORT=${NEMO_PORT:-8888}
echo "//Auto-generated config made in snap/build.sh" > $config_location
echo "define({" >> $config_location
echo "NEMO_LOCATION : '$NEMO_LOCATION'" >> $config_location
echo ", NEMO_PORT : '$NEMO_PORT'" >> $config_location
echo "})" >> $config_location
