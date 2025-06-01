// script.js
import { db } from './firebase-config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// Função para salvar convidado no Firestore
async function salvarConvidado(nome, acompanhantes, levaCrianca) {
    try {
        const docRef = await addDoc(collection(db, "convidados"), {
            nome: nome,
            acompanhantes: acompanhantes,
            levaCrianca: levaCrianca,
            dataHora: new Date().toISOString()
        });
        console.log("✅ Convidado salvo com ID:", docRef.id);
        alert("Presença confirmada com sucesso!");
        window.location.href = "index.html"; // volta ao convite
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
            const levaCrianca = document.querySelector('input[name="crianca"]:checked')?.value || "Não informado";

            if (!nome) {
                alert("Por favor, digite seu nome.");
                return;
            }

            salvarConvidado(nome, acompanhantes, levaCrianca);
        });
    });
}
