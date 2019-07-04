#!/bin/bash
#
# Run lmocha integration test
#
#####################################################################

INITIAL_DELAY=${INITIAL_DELAY:-60}
TARGET_HOST=${HOST:-edge-router}
SERVICES=${SERVICES:-cart,user}

do_check() {
  # check hostname is not empty
  if [ "${TARGET_HOST}x" == "x" ]; then
    echo "TARGET_HOST is not set; use env variables 'HOST=hostname:port'"
    exit 1
  else 
    echo 'Host: '$TARGET_HOST
  fi

}
do_exec() {
  sleep $INITIAL_DELAY

  echo $SERVICES
  IFS=','
  read -ra SERVICES <<< "$SERVICES"
  # get_test_suit "${SERVICES[@]}"

  # check if host is running | 
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" ${TARGET_HOST}) 
  if [ $STATUS -ne 200 ]; then
      echo "${TARGET_HOST} is not accessible"
      exit 1
  fi
  echo "Will run mocha against $TARGET_HOST."
  npm test 
  echo "done"
}
do_check
do_exec
exit 0;



