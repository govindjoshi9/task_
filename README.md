# 🍽️ Cafe Menu Management System

A full-stack web application for managing cafe menu items, featuring a responsive React (Vite) frontend and a robust Express.js + MySQL backend.

> Easily manage your cafe’s menu in real-time with an intuitive UI and reliable backend.

---

## 📸 Screenshot (Optional)

> _You can add a screenshot of your app here to showcase the UI._

---

## ✨ Features

- ✅ Add new menu items (title, description, price)
- 🔍 Search for items by title or description
- 🗑️ Delete menu items with confirmation prompt
- 📋 View all menu items in a responsive, card-based layout
- ⚠️ Client-side form validation (required fields, positive prices)
- ⚡ Real-time updates (no page refresh needed)

---

## 🛠️ Tech Stack

### 🧩 Frontend

- **React.js** (with [Vite](https://vitejs.dev/)) – Lightning-fast development
- **TailwindCSS** – Utility-first styling
- **Axios** – For API requests
- **React Icons** – Icon support for UI

### 🔧 Backend

- **Express.js** – Web server and API routing
- **MySQL** – Persistent data storage
- **CORS** – Cross-origin resource sharing
- **Body-Parser** – Parses incoming request bodies

---

## 🚀 Live Demo

- 🔗 **Frontend**: [cafe-menu-frontend.onrender.com](https://cafe-menu-frontend.onrender.com)
- 🔗 **Backend API**: [cafe-menu-backend.onrender.com/api](https://cafe-menu-backend.onrender.com/api)

---

## 🗂️ Project Structure
### Explain the struct/your-repo
```
task_/
├── api/ # Backend (Express.js)
│ ├── server.js # Main server file
│ ├── package.json # Dependencies and scripts
│ └── render.yaml # Render deployment config
│
├── client/ # Frontend (React/Vite)
│ ├── src/
│ │ ├── components/ # Reusable React components
│ │ ├── App.jsx # Main app component
│ │ └── main.jsx # Entry point
│ ├── package.json # Frontend dependencies
│ └── render.yaml # Render deployment config
│
├── .gitignore # Ignored files and folders
└── README.md # This documentation file
```

---

## 💻 Local Development Setup

### ✅ Prerequisites

- [Node.js (v16+)](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [Git](https://git-scm.com/)

---

### 🖥️ Backend Setup

```bash
# Navigate to the backend directory
cd api

# Install dependencies
npm install

# Create environment variables file
cp .env.example .env

# Edit .env with your MySQL credentials

# Start the backend server
node server.js


# Navigate to the frontend directory
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

## API Endpoints

### Authentication Endpoints

| HTTP Method | Endpoint               | Description                          | Access     |
|-------------|------------------------|--------------------------------------|------------|
| `GET`      | `/api/menu-items`       | Fetch all menu items (supports search)| Public     |
| `POST`     | `/api/menu-items`       | Add a new menu item.                  | Public     |
| `DELETE`   | `/api/menu-items/:id`   | Delete a menu item by ID              | Public     |
