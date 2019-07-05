#!/bin/bash
attempt_counter=0
max_attempts=20
while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' http://$HOST/cart)" != "200" ]]; do 
	echo $servicename ' service not available'
	if [ ${attempt_counter} -eq ${max_attempts} ];then
          echo "Max attempts reached"
          exit 1
  fi
  printf 'Retrying'
  printf '...'
  attempt_counter=$(($attempt_counter+1))
	sleep 5; 	
done
curl http://$HOST/cart | echo
echo 'curl :' $HOST
until $(curl --output /dev/null --silent --head --fail http://$HOST); do
    if [ ${attempt_counter} -eq ${max_attempts} ];then
      echo "Max attempts reached"
      exit 1
    fi
    printf 'Retrying'
    printf '...'
    attempt_counter=$(($attempt_counter+1))
    sleep 5
done
echo $HOST 'Service available'
npm test
echo 'Done!'

