pipeline {
   agent any
   environment {
     SERVICE_NAME = "testing"
   }
   stages {
      stage('Preparation') {
         steps {
            sh "echo Docker testing image build started"
	    sh "docker build -t integration_tester:latest ."
            sh "echo Docker testing image build completed"
         }
      }
      stage('Build and Push Image') {
         steps {
           sh './jenkinstest.sh'
         }
      }
   }
}
