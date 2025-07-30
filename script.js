import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Cole aqui sua configuração do Firebase:
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "ID",
  appId: "ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("venda-form");
const tbody = document.getElementById("vendas-tbody");
const produtoPrecos = {
  "Empada": 6,
  "Sanduíche": 8,
  "Empadão Frango": 13,
  "Empadão Camarão": 15
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const cliente = document.getElementById("cliente").value;
  const data = document.getElementById("data").value;
  const produto = document.getElementById("produto").value;
  const quantidade = Number(document.getElementById("quantidade").value);
  const status = document.getElementById("status").value;
  const total = produtoPrecos[produto] * quantidade;

  await addDoc(collection(db, "vendas"), {
    cliente,
    data,
    produto,
    quantidade,
    total,
    status
  });

  alert("Venda salva com sucesso!");
  form.reset();
  carregarVendas();
});

async function carregarVendas() {
  const querySnapshot = await getDocs(collection(db, "vendas"));
  tbody.innerHTML = "";
  querySnapshot.forEach((doc) => {
    const d = doc.data();
    const row = `<tr>
      <td>${d.cliente}</td>
      <td>${formatarData(d.data)}</td>
      <td>${d.produto}</td>
      <td>${d.quantidade}</td>
      <td>R$ ${d.total.toFixed(2)}</td>
      <td>${d.status}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

carregarVendas();
