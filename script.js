// script.js
import { db } from './firebase-config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// Função para salvar convidado no Firestore
async function salvarConvidado(nome, acompanhantes) {
    try {
        const docRef = await addDoc(collection(db, "convidados"), {
            nome: nome,
            acompanhantes: acompanhantes,
            dataHora: new Date().toISOString()
        });
        console.log("✅ Convidado salvo com ID:", docRef.id);
        alert("Presença confirmada com sucesso!");
    } catch (e) {
        console.error("❌ Erro ao salvar convidado:", e);
        alert("Erro ao confirmar presença. Verifique a conexão.");
    }
}

// Só executa esse código se estiver na página confirmar.html
if (window.location.pathname.includes("confirmar.html")) {
    document.addEventListener("DOMContentLoaded", () => {
        const form = document.querySelector("form");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const nome = document.getElementById("nome").value.trim();
            const acompanhantes = parseInt(document.getElementById("acompanhantes").value) || 0;
            if (nome) salvarConvidado(nome, acompanhantes);
        });
    });
}
