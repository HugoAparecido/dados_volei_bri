// importações necessárias
import { Validation } from "./classes/validation_class.js";
import { Auth } from "./classes/auth_class.js";
// Elementos htmls
const form = {
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoesntMatchError: () => document.getElementById('password_doesnt_match_error'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email_invalid_error'),
    emailRequiredError: () => document.getElementById('email_required_error'),
    password: () => document.getElementById('password'),
    passwordMinLenghtError: () => document.getElementById('password_min_length_error'),
    passwordRequiredError: () => document.getElementById('password_required_error'),
    registerButton: () => document.getElementById("register_button")
}
// Gerencia de atenticação
const auth = new Auth;
auth.UsuarioNaoLogado();
// validacoes
let validacoes = new Validation(form.email(), form.password());
form.email().addEventListener('change', () => {
    validacoes.OnChangeEmailRegister(form.emailRequiredError, form.emailInvalidError, form.registerButton);
});
form.password().addEventListener('change', () => {
    validacoes.OnChangePasswordRegister(form.passwordRequiredError, form.passwordMinLenghtError, form.registerButton, form.confirmPassword, form.confirmPasswordDoesntMatchError);
});
form.confirmPassword().addEventListener('change', () => {
    validacoes.OnChangeConfirmPassword(form.confirmPassword, form.confirmPasswordDoesntMatchError, form.registerButton)
})
// eventos
form.registerButton().addEventListener('click', () => {
    auth.CadastrarUsuario(form.email().value, form.password().value);
})