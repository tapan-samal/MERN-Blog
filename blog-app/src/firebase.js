import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCCdUnsN336_hgNI5FdZX9Uca-RkU2PjDY",
  authDomain: "mern-blog-77d29.firebaseapp.com",
  projectId: "mern-blog-77d29",
  storageBucket: "mern-blog-77d29.appspot.com",
  messagingSenderId: "621995069763",
  appId: "1:621995069763:web:28bfa77851148735725ff6",
  measurementId: "G-31WKLLTWDQ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
