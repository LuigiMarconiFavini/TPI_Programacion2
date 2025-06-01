document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const iva = document.getElementById('iva').value;
    const condicionCompra = document.querySelector('input[name="condicion"]:checked');

    // Limpiar mensajes
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('subjectError').textContent = '';
    document.getElementById('messageError').textContent = '';
    document.getElementById('errorIva').textContent = '';
    document.getElementById('errorCondicion').textContent = '';
    document.getElementById('formMessages').textContent = '';

    let valid = true;
    let firstErrorField = null;

    // Validaciones
    if (name.length < 5) {
        document.getElementById('nameError').textContent = 'El nombre debe tener al menos 5 caracteres.';
        if (!firstErrorField) firstErrorField = document.getElementById('name');
        valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'El correo electrónico no es válido.';
        if (!firstErrorField) firstErrorField = document.getElementById('email');
        valid = false;
    }

    if (iva === '') {
        document.getElementById('errorIva').textContent = 'Por favor seleccione una condición de IVA.';
        if (!firstErrorField) firstErrorField = document.getElementById('iva');
        valid = false;
    }

    if (!condicionCompra) {
        document.getElementById('errorCondicion').textContent = 'Por favor seleccione una condición de compra.';
        if (!firstErrorField) firstErrorField = document.querySelector('input[name="condicion"]');
        valid = false;
    }

    if (subject.length < 10) {
        document.getElementById('subjectError').textContent = 'El asunto debe tener al menos 10 caracteres.';
        if (!firstErrorField) firstErrorField = document.getElementById('subject');
        valid = false;
    }

    if (message.length < 25) {
        document.getElementById('messageError').textContent = 'El mensaje debe tener al menos 25 caracteres.';
        if (!firstErrorField) firstErrorField = document.getElementById('message');
        valid = false;
    }

    if (valid) {
        document.getElementById('formMessages').textContent = '¡Formulario enviado con éxito!';
        document.getElementById('formMessages').className = 'success';
        document.getElementById('contactForm').reset();
    } else {
        document.getElementById('formMessages').textContent = 'Por favor corrige los errores antes de enviar.';
        document.getElementById('formMessages').className = 'error';
        if (firstErrorField) firstErrorField.focus();
    }
});

// Funciones de validación individuales
function validarNombre() {
    const name = document.getElementById('name').value.trim();
    document.getElementById('nameError').textContent = name.length < 5 ? 'El nombre debe tener al menos 5 caracteres.' : '';
}

function validarEmail() {
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    document.getElementById('emailError').textContent = !emailRegex.test(email) ? 'El correo electrónico no es válido.' : '';
}

function validarIva() {
    const iva = document.getElementById('iva').value;
    document.getElementById('errorIva').textContent = iva === '' ? 'Por favor seleccione una condición de IVA.' : '';
}

function validarCondicionCompra() {
    const selected = document.querySelector('input[name="condicion"]:checked');
    document.getElementById('errorCondicion').textContent = !selected ? 'Por favor seleccione una condición de compra.' : '';
}

function validarAsunto() {
    const subject = document.getElementById('subject').value.trim();
    document.getElementById('subjectError').textContent = subject.length < 10 ? 'El asunto debe tener al menos 10 caracteres.' : '';
}

function validarMensaje() {
    const message = document.getElementById('message').value.trim();
    document.getElementById('messageError').textContent = message.length < 25 ? 'El mensaje debe tener al menos 25 caracteres.' : '';
}

// Asignar eventos blur + input a cada campo

document.getElementById('name').addEventListener('blur', validarNombre);
document.getElementById('name').addEventListener('input', validarNombre);

document.getElementById('email').addEventListener('blur', validarEmail);
document.getElementById('email').addEventListener('input', validarEmail);

document.getElementById('iva').addEventListener('blur', validarIva);
document.getElementById('iva').addEventListener('input', validarIva);

document.getElementsByName('condicion').forEach(radio => {
    radio.addEventListener('blur', validarCondicionCompra);
    radio.addEventListener('change', validarCondicionCompra); // cambio en radios
});

document.getElementById('subject').addEventListener('blur', validarAsunto);
document.getElementById('subject').addEventListener('input', validarAsunto);

document.getElementById('message').addEventListener('blur', validarMensaje);
document.getElementById('message').addEventListener('input', validarMensaje);