export class Validation {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    OnChangeEmail(emailRequiredError, emailInvalidError, recoverPassword, loginButton) {
        this.ToggleButtonDisabled(recoverPassword, loginButton);
        this.ToggleEmailErrors(emailRequiredError, emailInvalidError);
    }
    OnChangeEmailRegister(emailRequiredError, emailInvalidError, registerButton) {
        const email = this.email.value;
        emailRequiredError().style.display = email ? "none" : "block";
        emailInvalidError().style.display = this.ValidateEmail(email) ? "none" : "block";
        this.ToggleRegisterButtonDisabled(registerButton);
    }
    OnChangePassword(recoverPassword, loginButton, passwordRequiredError) {
        this.ToggleButtonDisabled(recoverPassword, loginButton);
        this.TogglePasswordErrors(passwordRequiredError);
    }
    OnChangePasswordRegister(passwordRequiredError, passwordMinLenghtError, registerButton, confirmPasswordForm, confirmPasswordDoesntMatchError) {
        const password = this.password.value;
        passwordRequiredError().style.display = password ? "none" : "block";
        passwordMinLenghtError().style.display = password.length >= 6 ? "none" : "block";
        this.ValidatePasswordMatch(confirmPasswordForm, confirmPasswordDoesntMatchError);
        this.ToggleRegisterButtonDisabled(registerButton);
    }
    OnChangeConfirmPassword(confirmPassword, confirmPasswordDoesntMatchError, registerButton) {
        this.ValidatePasswordMatch(confirmPassword, confirmPasswordDoesntMatchError);
        this.ToggleRegisterButtonDisabled(registerButton);
    }
    ValidatePasswordMatch(confirmPasswordForm, confirmPasswordDoesntMatchError) {
        const password = this.password.value;
        const confirmPassword = confirmPasswordForm().value;
        confirmPasswordDoesntMatchError().style.display = password == confirmPassword ? "none" : "block";
    }
    ToggleEmailErrors(emailRequiredError, emailInvalidError) {
        const email = this.email.value;
        emailRequiredError().style.display = email ? "none" : "block";
        emailInvalidError().style.display = this.ValidateEmail(email) ? "none" : "block";
    }
    TogglePasswordErrors(passwordRequiredError) {
        const password = this.password.value;
        passwordRequiredError().style.display = password ? "none" : "block";
    }
    ToggleButtonDisabled(recoverPassword, loginButton) {
        const emailValid = this.IsEmailValid();
        recoverPassword().disabled = !emailValid;
        const passwordValid = this.IsPassawordValid();
        loginButton().disabled = !emailValid || !passwordValid;
    }
    ToggleRegisterButtonDisabled(registerButton) {
        registerButton().disabled = !this.IsFormValid();
    }
    IsPassawordValid() {
        const password = this.password.value
        if (!password) {
            return false;
        }
        return true;
    }
    IsEmailValid() {
        const email = this.email.value;
        if (!email) {
            return false;
        }
        return this.ValidateEmail(email);
    }
    IsFormValid() {
        const email = this.email.value;
        if (!email || !this.ValidateEmail(email)) {
            return false;
        }
        const password = this.password.value;
        if (!password || password.length < 6) {
            return false;
        }
        return true;
    }
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
