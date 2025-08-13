// Importa os módulos do Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// 🔐 Cole aqui o seu firebaseConfig
const firebaseConfig = {
  apiKey: "AIzaSyDKX65-nZYOM1UJdg8x0YOjg8j7O8HeX70",
  authDomain: "appmeurh-89e3a.firebaseapp.com",
  projectId: "appmeurh-89e3a",
  storageBucket: "appmeurh-89e3a.firebasestorage.app",
  messagingSenderId: "302138798242",
  appId: "1:302138798242:web:016e3b8d2a59b8dbba27fb"
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
const db = getFirestore(app);

// Exporta o Firestore para usar em outros arquivos
export { db };