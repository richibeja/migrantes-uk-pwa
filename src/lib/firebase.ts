// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLl5wAu6mBb92ZOJw29VFW4ZJlkYEt3Bw",
  authDomain: "gana-facil-rifa-d5609.firebaseapp.com",
  projectId: "gana-facil-rifa-d5609",
  storageBucket: "gana-facil-rifa-d5609.firebasestorage.app",
  messagingSenderId: "428843376699",
  appId: "1:428843376699:web:0288ad0567b97b19e8bc1e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
