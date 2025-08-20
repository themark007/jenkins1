#🚀 CI/CD Pipeline with Jenkins & Docker
Automated deployment pipeline that takes your Node.js application from GitHub to production in minutes!
📋 Overview
This project demonstrates a complete CI/CD pipeline using Jenkins, Docker, and GitHub webhooks. When code is pushed to the repository, the pipeline automatically builds a Docker image, runs tests, pushes to Docker Hub, and deploys the application.
🏗️ Architecture
GitHub Repository → Webhook → Jenkins Pipeline → Docker Build → Docker Hub → Local Deployment
Pipeline Flow:

<img width="952" height="1184" alt="image" src="https://github.com/user-attachments/assets/7148e8d5-d842-4c7f-9497-e78cf52222f1" />


Code Push - Developer pushes code to GitHub
Webhook Trigger - GitHub webhook triggers Jenkins pipeline
Code Checkout - Jenkins pulls latest code from repository
Docker Build - Creates Docker image with the Node.js application
Run Tests - Executes automated test suite
Push to Registry - Uploads image to Docker Hub
Deploy - Runs the container on the same server

🛠️ Tech Stack

CI/CD: Jenkins
Containerization: Docker
Registry: Docker Hub
Application: Node.js Todo App
Version Control: Git/GitHub

📦 Prerequisites
Before running this pipeline, ensure you have:

Jenkins server installed and running
Docker installed on the Jenkins server
Docker Hub account
GitHub repository with webhook configured

⚙️ Setup Instructions
1. Jenkins Configuration

Install required Jenkins plugins:

Docker Pipeline
GitHub Integration
Pipeline Stage View


Configure Docker Hub credentials in Jenkins:
Manage Jenkins → Credentials → Add Docker Hub username/password

Create a new Pipeline job and configure GitHub webhook

2. GitHub Webhook Setup



3. Project Structure
├── Jenkinsfile          # Jenkins pipeline configuration
├── Dockerfile           # Docker container setup
├── package.json         # Node.js dependencies
├── app.js              # Main application
├── app.test.js         # Test cases
├── .dockerignore       # Docker build exclusions
├── .gitignore          # Git exclusions
└── docker-compose.yml  # Local development (optional)
4. Key Configuration Files
Jenkinsfile - Defines the complete CI/CD pipeline with stages for checkout, build, test, push, and deploy.
Dockerfile - Creates optimized Node.js container with security best practices and health checks.
package.json - Contains all dependencies and scripts needed for the Todo application.
🚀 Getting Started

Clone the repository
bashgit clone https://github.com/your-username/your-repo.git
cd your-repo

Configure your credentials

Update Jenkinsfile with your Docker Hub username
Set up Jenkins credentials for Docker Hub


Push code to trigger pipeline
```bash
git add .
git commit -m "Trigger CI/CD pipeline"
git push origin main
```
Monitor the pipeline

Check Jenkins dashboard for build status
View logs for each stage
Access deployed application at http://your-server:3000






