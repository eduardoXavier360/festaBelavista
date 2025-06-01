// firebase-config.js

// Importa os módulos necessários do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// Configuração do Firebase do seu projeto
const firebaseConfig = {
  apiKey: "AIzaSyCpmi4qoO6ZBDyZwe9GxcL8LZUnGH5dNLA",
  authDomain: "festabelavista.firebaseapp.com",
  projectId: "festabelavista",
  storageBucket: "festabelavista.firebasestorage.app",
  messagingSenderId: "920311866040",
  appId: "1:920311866040:web:8788b358923eb90dae8a4d",
  measurementId: "G-76K3JFZN6R"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta o Firestore para ser usado nos outros arquivos
export const db = getFirestore(app);
