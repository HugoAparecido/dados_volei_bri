import { auth } from "../acesso_banco.js";
import { onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { ShowLoading, HideLoading } from "../loading.js";
export class Auth {
    // Redirecionamento de login.html para time.html CASO o usuário esteja logado
    UsuarioLogado() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                window.location.href = "./times.html";
            }
        });
    }
    // Redirecionamento de time.html para login.html CASO o usuário não esteja logado
    UsuarioNaoLogado() {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                window.location.href = "./login.html";
                alert("É necessário logar-se primeiro")
            }
        });
    }
    Login(email, senha) {
        ShowLoading();
        signInWithEmailAndPassword(auth, email, senha)
            .then(() => {
                HideLoading(); window.location.href = "./times.html";
            })
            .catch((error) => {
                HideLoading(); alert(this.GetErrorMessage(error));
            });
    }
    Logout() {
        signOut(auth).then(() => {
            window.location.href = "../index.html";
        }).catch((error) => {
            alert('Erro ao fazer logout: ' + error);
        });
    }
    RecuperarSenha(email) {
        ShowLoading();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                HideLoading();
                alert('Email enviado com sucesso')
            })
            .catch((error) => {
                HideLoading();
                alert(GetErrorMessage(error));
            });
    }
    CadastrarUsuario(email, password) {
        ShowLoading();
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                HideLoading();
                alert("Usuario cadastrado com sucesso");
                window.location.href = "./times.html";
            })
            .catch((error) => {
                HideLoading();
                alert(this.GetErrorMessage(error));
            });
    }
    GetErrorMessage(error) {
        if (error.code == "auth/invalid-email") {
            return "Usuário não encontrado"
        }
        if (error.code == "auth/email-already-in-use") {
            return "Email já está em uso";
        }
        return error.message
    }
}