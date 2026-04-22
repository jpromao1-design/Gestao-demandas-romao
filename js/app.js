// 1. Importar as bibliotecas do Firebase e do Realtime Database
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// 2. Credenciais com a URL específica do Realtime Database incluída
const firebaseConfig = {
  apiKey: "AIzaSyDYfV39OBgqWLD1cTWEVa6pQT5UD451BcQ",
  authDomain: "gestao-demandas-cb48b.firebaseapp.com",
  databaseURL: "https://gestao-demandas-cb48b-default-rtdb.firebaseio.com",
  projectId: "gestao-demandas-cb48b",
  storageBucket: "gestao-demandas-cb48b.firebasestorage.app",
  messagingSenderId: "485974279989",
  appId: "1:485974279989:web:4dd7afa438a8810a24ae7c",
  measurementId: "G-LVF4QXBXYT"
};

// 3. Inicializar o Aplicativo e o Banco de Dados
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 4. Teste Prático de Gravação
function testarGravacao() {
  // Cria uma referência para a "pasta" demandas
  const demandasRef = ref(db, 'demandas');
  // Gera um ID único automático para a nova demanda
  const novaDemandaRef = push(demandasRef);

  // Insere os dados
  set(novaDemandaRef, {
    titulo: "Testar conexão com Realtime Database",
    status: "Pendente",
    prioridade: "Alta",
    data_criacao: new Date().toISOString()
  }).then(() => {
    console.log("Operação bem-sucedida: Demanda gravada no Realtime Database!");
  }).catch((erro) => {
    console.error("Falha na operação: ", erro);
  });
}

// Executar o teste
testarGravacao();
