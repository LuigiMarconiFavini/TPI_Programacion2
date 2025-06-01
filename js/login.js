document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const formMessages = document.getElementById('formMessages');

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            emailError.textContent = 'Correo electrónico inválido.';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }

    function validatePassword() {
        const password = passwordInput.value.trim();

        if (password.length < 6) {
            passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres.';
            return false;
        } else {
            passwordError.textContent = '';
            return true;
        }
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        formMessages.textContent = '';
        formMessages.className = '';

        let valid = true;
        let firstErrorField = null;

        if (!validateEmail()) {
            valid = false;
            firstErrorField = emailInput;
        }

        if (!validatePassword()) {
            valid = false;
            if (!firstErrorField) firstErrorField = passwordInput;
        }

        if (valid) {
            formMessages.textContent = '¡Inicio de sesión exitoso!';
            formMessages.className = 'success';
            form.reset();
        } else {
            formMessages.textContent = 'Por favor corrige los errores antes de continuar.';
            formMessages.className = 'error';
            if (firstErrorField) firstErrorField.focus();
        }
    });

    // Eventos para email
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', validateEmail);
    emailInput.addEventListener('focus', () => {
        emailError.textContent = '';
    });

    // Eventos para password
    passwordInput.addEventListener('blur', validatePassword);
    passwordInput.addEventListener('input', validatePassword);
    passwordInput.addEventListener('focus', () => {
        passwordError.textContent = '';
    });
});