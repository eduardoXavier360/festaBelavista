// firebase-config.js

// Importa os módulos necessários do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// Configuração do Firebase do seu projeto
const firebaseConfig = {
    apiKey: "AIzaSyBbnj2yINGp-40cMK5hw_gUkNj5on8NREI",
    authDomain: "belavista2025-1186d.firebaseapp.com",
    projectId: "belavista2025-1186d",
    storageBucket: "belavista2025-1186d.firebasestorage.app",
    messagingSenderId: "1012774404009",
    appId: "1:1012774404009:web:87874367783aab92bb8eb8",
    measurementId: "G-VF2N5H1KWP"
};
// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta o Firestore para ser usado nos outros arquivos
export const db = getFirestore(app);
