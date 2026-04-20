# 📝 CheckSy Task Tracker

![CheckSy Banner](https://raw.githubusercontent.com/Satwik-Agnihotri/Task-Manager/main/src/assets/logo.png)

**CheckSy** is a beautifully sketched, enterprise-grade Task Manager designed to make productivity feel less like a chore and more like a doodle! 🎨 Built with a highly responsive, animated frontend and a robust Java Spring Boot backend.

## 🚀 Key Features

### ✅ Complete Task Lifecycle (CRUD)
* **Create** tasks with descriptions, priorities, and tags
* **Read** and view tasks in beautifully styled lists
* **Update** tasks and toggle completion
* **Delete** irrelevant or outdated tasks

### 🎯 Prioritization & Smart Filtering
* Assign **Low**, **Medium**, or **High** priority
* Add **multiple tags** (e.g., `Work`, `Urgent`, `Personal`)
* **Search** instantly by keyword or filter by Status/Priority

### 🌗 Light & Dark Mode
* Fully supported native dark mode with smooth transitioning to match your environment.

### 🔐 Secure Authentication & Guest Mode
* Full JWT-based authentication with Bcrypt password hashing.
* Explore the app instantly with a temporary **guest session** (auto-expires for privacy).

### ✨ Hand-drawn UI & Fluid Animations
* A highly stylized, hand-drawn aesthetic using Tailwind CSS.
* Clean, fluid transitions via Framer Motion for buttons, forms, lists, and pages.

## 💻 Tech Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS v4** (Utility-first styling)
- **Framer Motion** (Micro-animations and fluid page transitions)
- **Axios** (API integration with automated JWT interceptors)

### Backend
- **Java 17 & Spring Boot 3.4.x** (Web, Security, Data MongoDB)
- **MongoDB** (NoSQL Database for flexible document storage)
- **JJWT** (JSON Web Token implementation)

## 🛠️ Installation & Setup

To run this project locally, follow these steps:

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
The frontend connects to the backend automatically. Open a new terminal:
```bash
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) (or the port Vite provides) to view the app!

## 🔗 Live Demo
Try the original frontend-only demo live here:
👉 [https://checksy-task.netlify.app/](https://checksy-task.netlify.app/)

## 🖼 Screenshots
(https://drive.google.com/drive/folders/1CC9LyO0IDwiuVKuNrn2JbHOGawjZiiyB?usp=drive_link)

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📜 License
This project is open source and available under the [MIT License](LICENSE).
