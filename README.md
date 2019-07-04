# Sockshop-Tests

Steps :
  1. Clone the repository
  2. Run 'DEBUG=true ./jenkinstest.sh' to run the tests locally by building the test container and test the system with docker-compose
  3. Jenkinsfile is part of the repo to run the tests from Jenkins setup
  4. Make changes to test scripts and push to repo, Jenkins will pick up the code and start the pipeline

Useful commands : 
 1. Portrainer :
    docker run -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer
 2. Jenkins :
    2.1 Build own jenkins image with plugins : 'cd jenkins' directory then 'docker build -t Myjenkins .'
    2.2 docker run -d -p 8089:8080 -p 50001:50000 --name MyJenkins --restart always -v /var/run/docker.sock:/var/run/docker.sock -v /mnt/jenkins-store:/var/jenkins_home -e JAVA_OPTS -Djenkins.install.runSetupWizard=false
 3.  docker build -t integration-tester:latest . in root directory to build the test container image


