pipeline {
    agent any

    environment {
        APP_DIR = "/var/lib/jenkins/Arogya" // path on EC2 where app lives
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/AA7696/Arogya.git'
            }
        }

        stage('Build & Deploy') {
            steps {
                script {
                    sh """
                    cd $APP_DIR
                    docker-compose pull
                    docker-compose build
                    docker-compose up -d
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
