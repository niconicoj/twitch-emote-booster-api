pipeline {
  agent none
  stages {
    agent {
      dockerfile {
        filename 'Dockerfile'
        dir '.'
      }
    }
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
        label 'debian-server'
      }
      when {
        branch 'master'
      }
      steps {
        sh '''
          cd twitch-emote-booster/api;
          git pull;
        '''
        sh '''
          cd twitch-emote-booster/api;
          npm install;
        '''
      }
    }
  }
}