export class Validation {
    //Toda vez que a classe é istanciada ela já recebe o campo email e senha
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    // Função para mudanças no campo email
    OnChangeEmail(emailRequiredError, emailInvalidError, recoverPassword, loginButton) {
        this.ToggleButtonDisabled(recoverPassword, loginButton);
        this.ToggleEmailErrors(emailRequiredError, emailInvalidError);
    }
    // Função para mudanças no campo email do register.html
    OnChangeEmailRegister(emailRequiredError, emailInvalidError, registerButton) {
        const email = this.email.value;
        emailRequiredError().style.display = email ? "none" : "block";
        emailInvalidError().style.display = this.ValidateEmail(email) ? "none" : "block";
        this.ToggleRegisterButtonDisabled(registerButton);
    }
    // Função para mudanças no campo senha
    OnChangePassword(recoverPassword, loginButton, passwordRequiredError) {
        this.ToggleButtonDisabled(recoverPassword, loginButton);
        this.TogglePasswordErrors(passwordRequiredError);
    }
    // Função para mudanças no campo email do register.html
    OnChangePasswordRegister(passwordRequiredError, passwordMinLenghtError, registerButton, confirmPasswordForm, confirmPasswordDoesntMatchError) {
        const password = this.password.value;
        passwordRequiredError().style.display = password ? "none" : "block";
        passwordMinLenghtError().style.display = password.length >= 6 ? "none" : "block";
        this.ValidatePasswordMatch(confirmPasswordForm, confirmPasswordDoesntMatchError);
        this.ToggleRegisterButtonDisabled(registerButton);
    }
    // Função para mudanças no campo confirmar senha do register.html
    OnChangeConfirmPassword(confirmPassword, confirmPasswordDoesntMatchError, registerButton) {
        this.ValidatePasswordMatch(confirmPassword, confirmPasswordDoesntMatchError);
        this.ToggleRegisterButtonDisabled(registerButton);
    }
    // verificar se  verificação de senha é igual a senha
    ValidatePasswordMatch(confirmPasswordForm, confirmPasswordDoesntMatchError) {
        const password = this.password.value;
        const confirmPassword = confirmPasswordForm().value;
        confirmPasswordDoesntMatchError().style.display = password == confirmPassword ? "none" : "block";
    }
    // Mostrar os erros do email
    ToggleEmailErrors(emailRequiredError, emailInvalidError) {
        const email = this.email.value;
        emailRequiredError().style.display = email ? "none" : "block";
        emailInvalidError().style.display = this.ValidateEmail(email) ? "none" : "block";
    }
    // Mostrar os erros da senha
    TogglePasswordErrors(passwordRequiredError) {
        const password = this.password.value;
        passwordRequiredError().style.display = password ? "none" : "block";
    }
    // Ativar o botao de login
    ToggleButtonDisabled(recoverPassword, loginButton) {
        const emailValid = this.IsEmailValid();
        recoverPassword().disabled = !emailValid;
        const passwordValid = this.IsPassawordValid();
        loginButton().disabled = !emailValid || !passwordValid;
    }
    // Ativar o botão de registrar
    ToggleRegisterButtonDisabled(registerButton) {
        registerButton().disabled = !this.IsFormValid();
    }
    // Se o campo senha tem um valor diferente de ""
    IsPassawordValid() {
        const password = this.password.value
        if (!password) {
            return false;
        }
        return true;
    }
    // Se o campo senha tem um valor diferente de ""
    IsEmailValid() {
        const email = this.email.value;
        if (!email) {
            return false;
        }
        return this.ValidateEmail(email);
    }
    // Se o formulario é válido
    IsFormValid() {
        const email = this.email.value;
        if (!email || !this.ValidateEmail(email)) {
            return false;
        }
        const password = this.password.value;
        // se a senha tiver menos de 6 caracteres ele não aceitará
        if (!password || password.length < 6) {
            return false;
        }
        return true;
    }
    // Forma para validar o email
    ValidateEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    // Funções para evitar erros
    RemoverDepoisDoSegundoCaractere(str, char) { //Função gerada pela IA Bing e adapatada para a aplicação
        var partes = str.split(char);
        if (partes.length <= 2) {
            return str; // O caractere não aparece duas vezes
        }
        return partes[0] + char + partes[1]; // Retorna a string até o segundo caractere
    }
    TratarInputTextComoNumber(constInput) {
        constInput.value = this.RemoverDepoisDoSegundoCaractere(constInput.value, '.')
        constInput.value = this.RemoverDepoisDoSegundoCaractere(constInput.value, ',')
        constInput.value = constInput.value.replace(',', '.')
        constInput.addEventListener('input', function (e) {
            // Verificando se o valor é um número de ponto flutuante
            if (!/^[-+]?[0-9]*\.?[0-9]+$/g.test(this.value)) {
                // Se não for, limpa o valor
                this.value = '';
            }
        });
    }
    VerificarTimeSelecionadoExistente() {
        if (localStorage.getItem("timeAtualID") === null) {
            window.location.href = "./times.html";
        }
    }
}
