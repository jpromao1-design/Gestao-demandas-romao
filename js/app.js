// 1. Importar as bibliotecas do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// 2. Suas credenciais (corrigidas para o inglês)
const firebaseConfig = {
  apiKey: "AIzaSyDYfV39OBgqWLD1cTWEVa6pQT5UD451BcQ",
  authDomain: "gestao-demandas-cb48b.firebaseapp.com",
  projectId: "gestao-demandas-cb48b",
  storageBucket: "gestao-demandas-cb48b.firebasestorage.app",
  messagingSenderId: "485974279989",
  appId: "1:485974279989:web:4dd7afa438a8810a24ae7c",
  measurementId: "G-LVF4QXBXYT"
};

// 3. Inicializar o Aplicativo e o Banco de Dados
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

console.log("Firebase e Firestore inicializados com sucesso!");
