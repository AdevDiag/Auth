// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-6d621.firebaseapp.com",
  projectId: "mern-auth-6d621",
  storageBucket: "mern-auth-6d621.firebasestorage.app",
  messagingSenderId: "126906676679",
  appId: "1:126906676679:web:93cbb83e51a36bca5fd5e2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);