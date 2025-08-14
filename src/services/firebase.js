// Importa os módulos do Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // 👈 Adiciona isso

// 🔐 Cole aqui o seu firebaseConfig
const firebaseConfig = {
  apiKey: "AIzaSyCzQmAuv4pxN_ehzkpd4b_92LDBmSsHnIw",
  authDomain: "appmeurh-208f2.firebaseapp.com",
  projectId: "appmeurh-208f2",
  //storageBucket: "appmeurh-208f2.firebasestorage.app",
  storageBucket: "appmeurh-208f2.appspot.com", // ✅ certo
  messagingSenderId: "524174458098",
  appId: "1:524174458098:web:a7d3893bd11643a663646b",
  measurementId: "G-46L64MCF4R"
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore e Auth
const db = getFirestore(app);
const auth = getAuth(app); // 👈 Adiciona isso

// Exporta os serviços
export { db, auth }; // 👈 Adiciona isso