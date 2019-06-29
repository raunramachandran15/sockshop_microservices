#!/bin/bash
attempt_counter=0
max_attempts=20
while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' http://$host/cart)" != "200" ]]; do 
	echo 'cart not available'
	if [ ${attempt_counter} -eq ${max_attempts} ];then
          echo "Max attempts reached"
          exit 1
        fi
        printf 'Retrying'
        printf '...'
        attempt_counter=$(($attempt_counter+1))
	sleep 5; 	
done
curl http://$host/cart | echo
echo 'curl :' $host
until $(curl --output /dev/null --silent --head --fail http://$host); do
    if [ ${attempt_counter} -eq ${max_attempts} ];then
      echo "Max attempts reached"
      exit 1
    fi
    printf 'Retrying'
    printf '...'
    attempt_counter=$(($attempt_counter+1))
    sleep 5
done
echo $host 'Service available'
npm test
