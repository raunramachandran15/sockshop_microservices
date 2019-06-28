RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'
echo 'Testing started'
cleanup () {
  docker-compose -p ci kill
  docker-compose -p ci rm -f
}
trap 'cleanup ; printf "${RED}Tests Failed For Unexpected Reasons${NC}\n"' HUP INT QUIT PIPE TERM
docker-compose -p ci -f  docker-compose.yaml up -d
if [ $? -ne 0 ] ; then
  printf "${RED}Docker Compose Failed${NC}\n"
  exit -1
fi
TEST_EXIT_CODE=`docker wait integration_test_container`
docker logs integration_test_container
if [ -z ${TEST_EXIT_CODE+x} ] || [ "$TEST_EXIT_CODE" -ne 0 ] ; then
  printf "${RED}Tests Failed${NC} - Exit Code: $TEST_EXIT_CODE\n"
else
  printf "${GREEN}Tests Passed${NC}\n"
fi

echo 'Testing completed'
exit $TEST_EXIT_CODE

