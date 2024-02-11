// importações necessárias
import { Validation } from "./classes/validation_class.js";
import { Auth } from "./classes/auth_class.js";
// Elementos htmls
const form = {
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    loginButton: () => document.getElementById("login-button"),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById("password-required-error"),
    recoverPassword: () => document.getElementById("recover-password-button"),
    register: () => document.getElementById("register-button")
}
// Gerencia de atenticação
const auth = new Auth;
auth.UsuarioLogado();
// validacoes
let validacoes = new Validation(form.email(), form.password());
form.email().addEventListener('change', () => {
    validacoes.OnChangeEmail(form.emailRequiredError, form.emailInvalidError, form.recoverPassword, form.loginButton);
});
form.password().addEventListener('change', () => {
    validacoes.OnChangePassword(form.recoverPassword, form.loginButton, form.passwordRequiredError)
});
// eventos
form.loginButton().addEventListener('click', () => {
    auth.Login(form.email().value, form.password().value)
});
form.recoverPassword().addEventListener('click', () => {
    auth.RecuperarSenha(form.email().value);
});