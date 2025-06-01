// adm.js
import { db } from './firebase-config.js';
import {
    collection, getDocs, deleteDoc, doc
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const senhaCorreta = "junina2025";

const senhaInput = document.getElementById("senha");
const btnVerificar = document.getElementById("btn-verificar");
const msgErro = document.getElementById("msg-erro");
const senhaContainer = document.getElementById("senha-container");
const conteudoAdmin = document.getElementById("conteudo-admin");
const ul = document.getElementById("lista-convidados");
const totalPessoasEl = document.getElementById("total");
const limparBtn = document.getElementById("limpar");

function mostrarAdmin() {
    senhaContainer.style.display = "none";
    conteudoAdmin.style.display = "block";
    atualizarLista();
}

function esconderAdmin() {
    senhaContainer.style.display = "block";
    conteudoAdmin.style.display = "none";
    senhaInput.value = "";
    msgErro.textContent = "";
    senhaInput.focus();
}

btnVerificar.addEventListener("click", () => {
    const senhaDigitada = senhaInput.value.trim();
    if (senhaDigitada === senhaCorreta) {
        mostrarAdmin();
    } else {
        msgErro.textContent = "Senha incorreta. Tente novamente.";
        senhaInput.value = "";
        senhaInput.focus();
    }
});

senhaInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btnVerificar.click();
});

window.addEventListener("blur", esconderAdmin);
window.addEventListener("beforeunload", esconderAdmin);

async function atualizarLista() {
    ul.innerHTML = "";
    let totalPessoas = 0;

    try {
        const querySnapshot = await getDocs(collection(db, "convidados"));
        const documentos = querySnapshot.docs;

        if (documentos.length === 0) {
            ul.innerHTML = "<li>Nenhum convidado confirmado ainda.</li>";
            totalPessoasEl.textContent = "";
            return;
        }

        documentos.forEach((docSnap) => {
            const dados = docSnap.data();
            const acompanhantes = parseInt(dados.acompanhantes) || 0;
            const levaCrianca = dados.levaCrianca || "Não informado";
            totalPessoas += 1 + acompanhantes;

            const li = document.createElement("li");
            li.textContent = `${dados.nome} + ${acompanhantes} acompanhante(s) | Criança: ${levaCrianca}`;

            const btnRemover = document.createElement("button");
            btnRemover.textContent = "Remover";
            btnRemover.onclick = async () => {
                if (confirm(`Remover confirmação de ${dados.nome}?`)) {
                    await deleteDoc(doc(db, "convidados", docSnap.id));
                    atualizarLista();
                }
            };

            li.appendChild(btnRemover);
            ul.appendChild(li);
        });

        totalPessoasEl.textContent = `Total de pessoas (incluindo acompanhantes): ${totalPessoas}`;
    } catch (error) {
        ul.innerHTML = "<li>Erro ao carregar a lista.</li>";
        totalPessoasEl.textContent = "";
        console.error("Erro ao buscar dados do Firestore:", error);
    }
}

limparBtn.addEventListener("click", async () => {
    if (confirm("Deseja realmente limpar toda a lista de confirmados?")) {
        try {
            const querySnapshot = await getDocs(collection(db, "convidados"));
            const promises = querySnapshot.docs.map(docSnap =>
                deleteDoc(doc(db, "convidados", docSnap.id))
            );
            await Promise.all(promises);
            atualizarLista();
        } catch (error) {
            alert("Erro ao limpar lista: " + error.message);
        }
    }
});

esconderAdmin(); // inicia escondido
