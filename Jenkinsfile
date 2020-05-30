pipeline {
  agent none
  stages {
    stage('Build') {
      agent {
        dockerfile {
          filename 'Dockerfile'
          dir '.' 
        }
      }
      steps {
        sh 'npm install'
      }
    }
    stage('deploy'){
      agent {
        node {
          label 'debian-server'
          customWorkspace 'twitch-emote-booster/api'
        }
      }
      when {
        branch 'master'
      }
      steps {
        sh 'npm install';
        withCredentials([file(credentialsId: 'twitch-emote-booster-api-env', variable: 'ENV_FILE')]) {
           sh 'cp $ENV_FILE .env';
        }
      }
    }
  }
}