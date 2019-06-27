pipeline {
   agent any

   environment {

     SERVICE_NAME = "testing"
   }

   stages {
      stage('Preparation') {
         steps {
            sh "echo arun15"
         }
      }
      stage('Build and Push Image') {
         steps {
           sh 'docker-compose -f docker-compose.yaml up -d'
         }
      }
   }
}