# MERN + OAuth Auth System

A clean, full-stack authentication starter featuring **Email/Password** login and **Google OAuth**. This project demonstrates secure user management, global state persistence, and modern React 19 patterns.

##  Features
* **Google OAuth Integration:** Seamless login using Firebase.
* **State Persistence:** Redux-Persist keeps users logged in after a page refresh.
* **Security:** Password hashing with Bcrypt and secure session handling via JWT.
* **Modern UI:** Built with Tailwind CSS 4 and Vite for lightning-fast performance.
* **Modular Backend:** Organized using the MVC pattern (Models, Views, Controllers).

##  Tech Stack
* **Frontend:** React 19, Redux Toolkit, Tailwind CSS, Axios.
* **Backend:** Node.js, Express 5, MongoDB, Mongoose.
* **Third-Party:** Firebase (Auth), JSON Web Tokens (JWT).

##  Folder Structure
```text
├── backend/
│   ├── controllers/   # Logic for auth & user actions
│   ├── models/        # Database schemas (Mongoose)
│   ├── routes/        # API Endpoints
│   └── index.js       # Server entry point
└── frontend/
    ├── src/
    │   ├── Components/ # Header, OAuth, InputField
    │   ├── Pages/      # Home, SignIn, SignUp, Profile
    │   └── redux/      # Store and User slices

```
## Installation

1. Clone the repo:
```bash
git clone https://github.com/AdevDiag/Auth.git
cd AuthentificationSystem

cd backend
npm install
# set MONGODB_URL and JWT_SECRET in .env
npm start


cd ../frontend
npm install
npm run dev
