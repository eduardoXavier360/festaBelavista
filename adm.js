// adm.js
import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
  const listaEl = document.getElementById("lista-confirmados");

  try {
    const snapshot = await getDocs(collection(db, "convidados"));

    if (snapshot.empty) {
      listaEl.innerHTML = "<li>Nenhum convidado confirmado ainda.</li>";
      return;
    }

    snapshot.forEach(doc => {
      const dados = doc.data();
      const li = document.createElement("li");
      li.textContent = `${dados.nome} - Acompanhantes: ${dados.acompanhantes} - Leva Criança: ${dados.levaCrianca}`;
      listaEl.appendChild(li);
    });
  } catch (err) {
    console.error("Erro ao buscar convidados:", err);
    listaEl.innerHTML = "<li>Erro ao carregar dados.</li>";
  }
});
