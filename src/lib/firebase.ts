import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importamos o Banco de Dados

const firebaseConfig = {
  apiKey: "AIzaSyAXLIIKdJYGCf57u5VIcvvgiJUq-vgYQOM",
  authDomain: "dom-frediane-app.firebaseapp.com",
  projectId: "dom-frediane-app",
  storageBucket: "dom-frediane-app.firebasestorage.app",
  messagingSenderId: "247582689245",
  appId: "1:247582689245:web:fd682b1fb55026114d5834",
  measurementId: "G-G9FZHEWGF4"
};

// Inicializa o app
const app = initializeApp(firebaseConfig);

// Exporta o banco para usarmos em outras páginas
export const db = getFirestore(app);