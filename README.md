# 🌿 Harmoniq

**Harmoniq** is a full-stack web application built to foster a supportive, anonymous community for individuals navigating mental health challenges. It offers a safe, digital space where users can share their thoughts, connect through shared experiences, and support one another, all while preserving their privacy.

**_“We believe in the power of human connections and community harmony. Harmoniq is designed to make people feel heard, supported, and safe.”_**

![Java](https://img.shields.io/badge/backend-Java_23+-orange)
![Angular](https://img.shields.io/badge/frontend-Angular-red)
![Docker](https://img.shields.io/badge/containerized-Docker-blue)

## Table of Contents

- [🌿 Harmoniq](#-harmoniq)
  - [Table of Contents](#table-of-contents)
  - [Demo](#demo)
  - [✨ Features](#-features)
    - [1. 🔐 Authentication](#1--authentication)
    - [2. 🛡️ Role-Based Access Control](#2-️-role-based-access-control)
    - [3. 🤖 AI-Powered Chatbot](#3--ai-powered-chatbot)
    - [4. 🧵 Community Threads](#4--community-threads)
    - [5. 🐳 Docker Support](#5--docker-support)
  - [💻 Technologies Used](#-technologies-used)
    - [Frontend](#frontend)
    - [Backend \& Database](#backend--database)
    - [DevOps \& Deployment](#devops--deployment)
  - [📁 Project Structure](#-project-structure)
  - [⚙️ Installation Guide](#️-installation-guide)
    - [1️⃣ Clone the Repository](#1️⃣-clone-the-repository)
    - [2️⃣ Open the Project Directory](#2️⃣-open-the-project-directory)
    - [3️⃣ Build \& Run Using Docker (Recommended)](#3️⃣-build--run-using-docker-recommended)
    - [⚡What Does Docker Compose Do?](#what-does-docker-compose-do)
    - [✅ Post-Installation](#-post-installation)
  - [👨‍💻 Author](#-author)

## Demo

_A video walkthrough and live demo will be added shortly. Stay tuned!_

## ✨ Features

### 1. 🔐 Authentication

- Users can sign up and log in securely using their email and password.
- **All users are anonymous across the platform.** Real names are never stored or revealed publicly.
- Anonymous `Guest` login is available, allowing users to browse threads without registration.
- **Guest accounts** are automatically deleted after 2 weeks to reduce storage usage.

### 2. 🛡️ Role-Based Access Control

- Role-based authentication hierarchy: `MODERATOR > MEMBER > GUEST`
- Fine-grained permissions according to roles are provided:

  - **`MODERATOR`**: Can use the chatbot, manage threads, moderate content, and oversee platform safety.
  - **`MEMBER`**: Can use the chatbot and can create threads, comment, and participate in them too.
  - **`GUEST`**: Can view public threads page, but cannot create or comment on threads.

- Implemented with **Spring Security**, including protected API endpoints and access control logic.

### 3. 🤖 AI-Powered Chatbot

- Engage with a compassionate chatbot designed to offer empathetic, human-like conversations. Users can freely vent and reflect without judgment.
- Available exclusively to `Moderator` and `Member` roles.
- **Chatbot messages are automatically deleted after 2 weeks** to ensure privacy and minimize data retention.
- Powered by [`Ollama`](https://ollama.com/) and the open-source [`Mistral model`](https://mistral.ai/).

### 4. 🧵 Community Threads

- Members can create and participate in open discussions (`Threads`) focused on mental health and well-being.
- A supportive and anonymous space to share coping strategies and lived experiences.
- `Moderators` can manage or remove inappropriate content.

### 5. 🐳 Docker Support

- The entire application can be run using `Docker Compose`.
- Simplifies setup for local development, testing, and contributions.
- Backend and frontend `Dockerfiles` are included for isolated builds.

## 💻 Technologies Used

### Frontend

- 🌐 [Angular](https://angular.io/) – Reactive front-end framework for building single-page applications (SPA).
- 🟦 [TypeScript](https://www.typescriptlang.org/) – A statically typed superset of JavaScript for safer, scalable code.
- 🎨 [HTML5 & CSS](https://developer.mozilla.org/en-US/docs/Web) – Standard markup and styling for responsive UI.
- ⚙️ [RxJS](https://rxjs.dev/) – For reactive programming and efficient state management.

### Backend & Database

- ☕ [Java 23+](https://openjdk.org/projects/jdk/23/) – Modern backend development using the latest features.
- 🧰 [Spring Boot](https://spring.io/projects/spring-boot) – Framework for building robust, production-grade REST APIs.
- 🛢️ [PostgreSQL](https://www.postgresql.org/) – Powerful, open-source relational database for persistent storage.

### DevOps & Deployment

- 🐳 [Docker](https://www.docker.com/) – Containerization for consistent development and deployment.
- 📦 [Docker Compose](https://docs.docker.com/compose/) – Simplifies multi-container setups.
- ☁️ [Render](https://render.com/) – Cloud platform for hosting the backend.
- 🔼 [Vercel](https://vercel.com/) – Fast and reliable deployment for the frontend.

## 📁 Project Structure

```bash
harmoniq/
├── harmoniq_backend/       # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── dev/anirban/harmoniq_backend/
│   │   │   │       ├── config/
│   │   │   │       ├── constants/
│   │   │   │       ├── controllers/
│   │   │   │       ├── dto/
│   │   │   │       ├── entity/
│   │   │   │       ├── exception/
│   │   │   │       ├── repo/
│   │   │   │       ├── security/
│   │   │   │       └── service/
│   │   │   └── resources/
│   │   │       ├── application-dev.properties
│   │   │       ├── application-docker.properties
│   │   │       ├── application-prod.properties
│   │   │       ├── application.properties
│   │   │       └── static/
│   └── Dockerfile          # Docker config for backend
│
├── harmoniq_frontend/      # Angular Framework Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/
│   │   │   ├── chatbot/
│   │   │   ├── dashboard/
│   │   │   ├── helplines/
│   │   │   ├── home/
│   │   │   ├── profile/
│   │   │   ├── shared/
│   │   │   └── threads/
│   │   └── assets/
│   ├── angular.json
│   ├── Dockerfile          # Docker config for frontend
│   └── package.json
│
├── ollama/                 # Ollama-specific folder
│   ├── Dockerfile
│   └── entrypoint.sh
│
├── docker-compose.yml      # Docker compose file for the whole app
└── README.md
```

## ⚙️ Installation Guide

Follow these steps to get the project up and running on your local machine.

### 1️⃣ Clone the Repository

Open a terminal (Git Bash for Windows or Terminal on macOS) and run:

```bash
git clone https://github.com/basakjeet08/Harmoniq.git
```

### 2️⃣ Open the Project Directory

```
cd harmoniq
```

### 3️⃣ Build & Run Using Docker (Recommended)

**Build using Docker :** Make sure your docker desktop is running.

```bash
docker-compose build
```

**Start the ollama instance :** On its initial run, it downloads the Mistral model `~4GB`, which may take some time. Only run this the first time to pull and prepare the model.

```bash
docker-compose up ollama
```

**Now, start the remaining containers in detached mode:** - Run this after the Ollama Mistral model has finished downloading.

```bash
docker-compose up -d
```

### ⚡What Does Docker Compose Do?

This will start four containers:

1. `db` - PostgreSQL container.
2. `ollama` - Ollama container which downloads Ollama Mistral Model.
3. `backend` - Spring Boot application container.
4. `frontend` - Angular frontend application container.

The setup is configured for a local development environment, so all the necessary database URLs and Spring Boot connections are automatically handled, making it easy to get started without manual configuration **(when using docker compose)**.

### ✅ Post-Installation

- Once the containers are up and running, navigate to the frontend at `http://127.0.0.1:5000` to start using the application.
- For the backend, you can access it through `http://localhost:8080`.
- The application will be running locally, and the database will be connected automatically.

## 👨‍💻 Author

- **Anirban Basak** - [GitHub](https://github.com/basakjeet08) | [LinkedIn](https://www.linkedin.com/in/anirban-basak-b96055249/)

Building things with 💻, coffee ☕, and a lot of ❤️ for clean code.
