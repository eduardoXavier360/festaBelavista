// importa funções do Firebase (você já pode usar a versão 11.8.1, por exemplo)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// Configuração do seu Firebase (substitua pelos seus dados)
const firebaseConfig = {
    apiKey: "AIzaSyBbnj2yINGp-40cMK5hw_gUkNj5on8NREI",
    authDomain: "belavista2025-1186d.firebaseapp.com",
    projectId: "belavista2025-1186d",
    storageBucket: "belavista2025-1186d.firebasestorage.app",
    messagingSenderId: "1012774404009",
    appId: "1:1012774404009:web:87874367783aab92bb8eb8",
    measurementId: "G-VF2N5H1KWP"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função principal que adiciona o evento no formulário
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-confirmacao");
    const mensagem = document.getElementById("mensagem");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const acompanhantesInput = document.getElementById("acompanhantes").value;
        const acompanhantes = acompanhantesInput === "" ? 0 : parseInt(acompanhantesInput);
        const levaCrianca = document.getElementById("levaCrianca").value;

        if (!nome || !levaCrianca) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            // Checar se nome já existe
            const snapshot = await getDocs(collection(db, "convidados"));
            const nomeExiste = snapshot.docs.some(doc => doc.data().nome.toLowerCase() === nome.toLowerCase());

            if (nomeExiste) {
                mensagem.textContent = "Este nome já foi confirmado. Use nome e sobrenome diferente!";
                mensagem.style.color = "red";
                return;
            }

            // Adiciona no Firestore
            await addDoc(collection(db, "convidados"), {
                nome,
                acompanhantes,
                levaCrianca,
                dataHora: new Date().toISOString()
            });

            mensagem.textContent = "Presença confirmada com sucesso!";
            mensagem.style.color = "#008000";
            form.reset();
            setTimeout(() => mensagem.textContent = "", 5000);
        } catch (err) {
            console.error("Erro ao salvar no Firestore:", err);
            mensagem.textContent = "Erro ao confirmar presença. Tente novamente.";
            mensagem.style.color = "red";
        }
    });
});
