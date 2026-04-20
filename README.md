# CheckSy 📝

![CheckSy Banner](https://raw.githubusercontent.com/Satwik-Agnihotri/Task-Manager/main/src/assets/logo.png)

CheckSy is a beautifully sketched, enterprise-grade Task Manager designed to make productivity feel less like a chore and more like a doodle! 🎨 Built with a highly responsive, animated frontend and a robust Java Spring Boot backend.

## ✨ Features
- **Dynamic Sketched UI**: A highly stylized, hand-drawn aesthetic using Tailwind CSS and Framer Motion.
- **Enterprise Backend**: Powered by Java Spring Boot for high performance, scalability, and secure RESTful APIs.
- **Secure Authentication**: Full JWT-based authentication with Bcrypt password hashing.
- **Guest Sessions**: Instantly try out CheckSy with one-click Guest Login (temporary auto-expiring sessions).
- **Task Management**: Create, update, complete, and delete tasks in real-time.
- **Dark Mode 🌙**: Fully supported native dark mode with smooth transitioning.

## 🚀 Tech Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS v4** (Utility-first styling)
- **Framer Motion** (Micro-animations and fluid page transitions)
- **Axios** (API integration with automated JWT interceptors)

### Backend
- **Java 17 & Spring Boot 3.4.x** (Web, Security, Data MongoDB)
- **MongoDB** (NoSQL Database for flexible document storage)
- **JJWT** (JSON Web Token implementation)

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [Java 17+](https://adoptium.net/)
- [MongoDB](https://www.mongodb.com/) running locally on default port 27017.

### 1. Start the Backend
The backend runs on **port 8080**.
```bash
cd spring-backend
./mvnw spring-boot:run
```

### 2. Start the Frontend
The frontend connects to the backend automatically.
```bash
npm install
npm run dev
```

## 📸 Screenshots
*(Coming Soon)*

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📜 License
This project is open source and available under the [MIT License](LICENSE).
