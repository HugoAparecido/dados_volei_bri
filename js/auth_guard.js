import { auth } from "./acesso_banco.js";
// Verifica o estado do usuário
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
onAuthStateChanged(auth, (user) => {
    // se ele não estiver logado, ele se redirecionará para o login
    if (!user) {
        window.location.href = "./login.html";
    }
});