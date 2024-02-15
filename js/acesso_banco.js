// Import the functions you need from the SDKs you need
// importando a inicialização do firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// importando o adquirimento de usuario
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// importando a inicialização para o banco
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// configuração para utilizar o banco de dados
const firebaseConfig = {
    apiKey: "AIzaSyDYZq7RYpL4yJRxNzuijG0FDBVipoMZH3g",
    authDomain: "volei-birigui.firebaseapp.com",
    projectId: "volei-birigui",
    storageBucket: "volei-birigui.appspot.com",
    messagingSenderId: "323930105283",
    appId: "1:323930105283:web:8ac1912b0a60cf22cc8976",
    measurementId: "G-6T74P1ZQ30"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// exportando as duas constantes
export const auth = getAuth();
export const db = getFirestore(app);