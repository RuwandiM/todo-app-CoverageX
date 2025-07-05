# TO DO

**TO DO** is a full-stack todo list application that helps users track their daily activities easily. 

## Getting Started

1️⃣ Clone the repository

```bash
  git clone https://github.com/RuwandiM/todo-app-CoverageX
  cd todo-app-CoverageX
```

2️⃣ Start the full app with Docker

This starts:

- Database (MySQL)
- Backend (Node.js API)
- Frontend (React)

```bash
  docker-compose up --build
```

- React: http://localhost:3000
- API: http://localhost:5000

## Features

- ➕ Add new todos via a form
- 📝 View only the 5 most recent uncompleted todos
- ✅ Mark todo tasks as done — they disappear from the list
- 🎨 React UI styled with CSS
- 🔁 Node.js backend with MySQL database
- 🧪 Testing:
    - Unit Testing
        - Frontend: Jest
        - Backend: Jest + Supertest
    - End-to-End Testing:
        - playwright

## Tech Stack

This project is built with:

- 🧑‍💻 **Frontend**: React (JSX)
- 🖥 **Backend**: Node.js (Express, MVC architecture)
- 🗃 **Database**: MySQL (Docker container)
- 🧪 **Testing**:
  - Unit tests: Jest (frontend & backend)
  - E2E tests: playwright
- 🐳 **Environment**: Docker + Docker Compose


## Environment Variables

To run this project, you need to add the following environment variables to a .env file in the root folder.

```bash
  DB_HOST="db"
  DB_USER="root"
  DB_PASSWORD="root"
  DB_NAME="todo"
  PORT=5000
```