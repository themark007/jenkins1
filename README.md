# 🚀 CI/CD Pipeline with Jenkins & Docker

Automated deployment pipeline that takes a **Node.js application** from GitHub to production in minutes!  

---

## 📋 Overview  
This project demonstrates a complete **CI/CD pipeline** using **Jenkins, Docker, and GitHub webhooks**.  
When code is pushed to the repository, the pipeline automatically:  
- Builds a Docker image  
- Runs tests  
- Pushes the image to Docker Hub  
- Deploys the application  

---

## 🏗️ Architecture  

**Pipeline Flow:**  

1. **Code Push** → Developer pushes code to GitHub  
2. **Webhook Trigger** → GitHub webhook triggers Jenkins pipeline  
3. **Code Checkout** → Jenkins pulls latest code from repository  
4. **Docker Build** → Creates Docker image with the Node.js application  
5. **Run Tests** → Executes automated test suite  
6. **Push to Registry** → Uploads image to Docker Hub  
7. **Deploy** → Runs the container on the same server  

📌 **Diagram**  

<img width="700" alt="pipeline diagram" src="https://github.com/user-attachments/assets/7148e8d5-d842-4c7f-9497-e78cf52222f1" />

---

## 🛠️ Tech Stack  

- **CI/CD**: Jenkins  
- **Containerization**: Docker  
- **Registry**: Docker Hub  
- **Application**: Node.js (Todo App)  
- **Version Control**: Git/GitHub  

---

## 📦 Prerequisites  

Before running this pipeline, ensure you have:  
- Jenkins server installed and running  
- Docker installed on the Jenkins server  
- Docker Hub account  
- GitHub repository with webhook configured  

---

## ⚙️ Setup Instructions  

### 1️⃣ Jenkins Configuration  
- Install required plugins:  
  - Docker Pipeline  
  - GitHub Integration  
  - Pipeline Stage View  
- Configure Docker Hub credentials in Jenkins:  
  `Manage Jenkins → Credentials → Add Docker Hub username/password`  
- Create a new Pipeline job and connect it with GitHub webhook  

### 2️⃣ GitHub Webhook Setup  
- Go to your GitHub repo → Settings → Webhooks  
- Add Jenkins server webhook (e.g., `http://<your-server>:8080/github-webhook/`)  

---

## 📂 Project Structure  


├── Jenkinsfile          # Jenkins pipeline configuration
├── Dockerfile           # Docker container setup
├── package.json         # Node.js dependencies
├── app.js              # Main application
├── app.test.js         # Test cases
├── .dockerignore       # Docker build exclusions
├── .gitignore          # Git exclusions
└── docker-compose.yml  # Local development (optional)
---

## 🔑 Key Configuration Files  

- **Jenkinsfile** → Defines stages for checkout, build, test, push, and deploy  
- **Dockerfile** → Creates optimized Node.js container with health checks  
- **package.json** → Dependencies and scripts for the Todo application  

---

## 🚀 Getting Started  

Clone the repository:  
```bash
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






