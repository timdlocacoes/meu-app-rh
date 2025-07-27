// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBLut5Kn25E6WtovPg8dpEvx_8jRlhMhzE",
  authDomain: "app-meurh.firebaseapp.com",
  projectId: "app-meurh",
  storageBucket: "app-meurh.firebasestorage.app",
  messagingSenderId: "228211316482",
  appId: "1:228211316482:web:d1d3483f611d7a2a62d41b",
  measurementId: "G-H0W4Z94GS0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);     // 🔐 Autenticação
export const db = getFirestore(app);  // 📦 Firestore