// importando o auth do acesso_banco.js
import { auth } from "../acesso_banco.js";
// importando as funções necessárias do firebase
import { onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// importando as funções para fazer a tela de carregamento
import { ShowLoading, HideLoading } from "../loading.js";
// declarando a classe Auth
export class Auth {
    // Redirecionamento de login.html para time.html CASO o usuário esteja logado
    UsuarioLogado() {
        // Verifica o estado do usuário
        onAuthStateChanged(auth, (user) => {
            // se ele já estiver logado, ele se redirecionará para os times
            if (user) {
                window.location.href = "./times.html";
            }
        });
    }
    // Redirecionamento de time.html para login.html CASO o usuário não esteja logado
    UsuarioNaoLogado() {
        // Verifica o estado do usuário
        onAuthStateChanged(auth, (user) => {
            // se ele não estiver logado, ele se redirecionará para o login
            if (!user) {
                window.location.href = "./login.html";
            }
        });
    }
    // Função para login
    async Login(email, senha) {
        // chamada da tela de carregamento
        ShowLoading();
        // função de login do firebase
        await signInWithEmailAndPassword(auth, email, senha)
            .then(() => {
                // se der certo será redirecionado para times.html e fechará a tela de carregamento
                HideLoading();
                window.location.href = "./times.html";
            })
            .catch((error) => {
                // se der erros haverá um alerta especificando o erro e fechará a tela de carregamento
                HideLoading();
                alert(this.GetErrorMessage(error));
            });
    }
    // Função para deslogar
    Logout() {
        // função de deslogar do firebase
        signOut(auth).then(() => {
            // se der certo será redirecionado para index.html
            window.location.href = "../index.html";
        }).catch((error) => {
            // se der errado mostrará o erro
            alert('Erro ao fazer logout: ' + error);
        });
    }
    // Função para recuperar senha
    RecuperarSenha(email) {
        // chamada da tela de carregamento
        ShowLoading();
        // função de mudar a senha do firebase
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // se der certo eviará a mensagem e fechará a tela de carregamento
                HideLoading();
                alert('Email enviado com sucesso')
            })
            .catch((error) => {
                // se der erros haverá um alerta especificando o erro e fechará a tela de carregamento
                HideLoading();
                alert(GetErrorMessage(error));
            });
    }
    // função para cadastrar usuario
    CadastrarUsuario(email, password) {
        // chamada da tela de carregamento
        ShowLoading();
        // função de criar usuario do firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                HideLoading();
                // se der certo será redirecionado para times.html e fechará a tela de carregamento
                alert("Usuario cadastrado com sucesso");
                window.location.href = "./times.html";
            })
            .catch((error) => {
                // se der erros haverá um alerta especificando o erro e fechará a tela de carregamento
                HideLoading();
                alert(this.GetErrorMessage(error));
            });
    }
    // função para capturar possíveis erros
    GetErrorMessage(error) {
        // trocando a mensagem se o tipo de erro for de credencial inválida, ou seja, email ou senha não estão cadastrados
        if (error.code == "auth/invalid-credential") {
            return "Email ou senha incorretos"
        }
        // trocando a mensagem se o email cdastrados já estiver em uso
        if (error.code == "auth/email-already-in-use") {
            return "Email já está em uso";
        }
        return error.message
    }
}