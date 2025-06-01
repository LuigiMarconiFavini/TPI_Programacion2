document.addEventListener("DOMContentLoaded", function () {
    // Referencias a elementos del DOM
    const contenedorCarrito = document.getElementById("carritoItems");
    const textoTotalCarrito = document.getElementById("totalCarrito");
    const botonLimpiar = document.getElementById("btn-limpiar");
    const botonComprar = document.getElementById("btn-comprar");

    botonComprar.addEventListener("click", function () {
        alert("¡Compra Exitosa!");
    });

    // Cargar carrito desde localStorage o iniciar como arreglo vacío
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Asegurar que cada producto tenga la propiedad cantidad, si no, poner 1
    carrito = carrito.map(producto => {
        return {
            ...producto,
            cantidad: producto.cantidad ? producto.cantidad : 1
        };
    });

    // Guardar carrito actualizado en localStorage
    function guardarCarritoEnStorage() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    // Calcular el total sumando (precio * cantidad) de cada producto
    function calcularTotalCarrito() {
        let total = 0;
        for (let producto of carrito) {
            total += producto.precio * producto.cantidad;
        }
        return total;
    }

    // Mostrar productos del carrito en pantalla
    function mostrarCarrito() {
        // Limpiar el contenido actual
        contenedorCarrito.innerHTML = "";

        if (carrito.length === 0) {
            // Si no hay productos, mostrar mensaje
            contenedorCarrito.innerHTML = "<p>Tu carrito está vacío.</p>";
            textoTotalCarrito.textContent = "Total: $0";
            return;
        }

        // Recorrer productos y crear el HTML para cada uno
        carrito.forEach((producto, indice) => {
            // Crear un div para el producto
            const productoDiv = document.createElement("div");
            productoDiv.className = "carrito-item";

            productoDiv.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="carrito-detalles">
                    <p>${producto.nombre}</p>
                    <p>Precio unitario: $${producto.precio}</p>
                </div>
                <input type="number" min="1" value="${producto.cantidad}" class="cantidad-input" data-indice="${indice}" />
                <p>Subtotal: $${(producto.precio * producto.cantidad).toFixed(2)}</p>
                <button class="btn-eliminar" data-indice="${indice}">Eliminar</button>
            `;

            // Agregar el div al contenedor
            contenedorCarrito.appendChild(productoDiv);
        });

        // Mostrar el total actualizado
        textoTotalCarrito.textContent = `Total: $${calcularTotalCarrito().toFixed(2)}`;
    }

    // Eliminar un producto del carrito por índice
    function eliminarProductoDelCarrito(indice) {
        carrito.splice(indice, 1);
        guardarCarritoEnStorage();
        mostrarCarrito();
    }

    // Actualizar cantidad de un producto y validar que sea al menos 1
    function actualizarCantidadProducto(indice, nuevaCantidad) {
        if (nuevaCantidad < 1) {
            nuevaCantidad = 1;
        }
        carrito[indice].cantidad = nuevaCantidad;
        guardarCarritoEnStorage();
        mostrarCarrito();
    }

    // Vaciar todo el carrito
    function vaciarCarrito() {
        carrito = [];
        guardarCarritoEnStorage();
        mostrarCarrito();
    }

    // Manejar eventos de click en botones eliminar usando delegación
    contenedorCarrito.addEventListener("click", function (evento) {
        if (evento.target.classList.contains("btn-eliminar")) {
            const indice = evento.target.getAttribute("data-indice");
            eliminarProductoDelCarrito(indice);
        }
    });

    // Manejar cambios en input cantidad usando delegación
    contenedorCarrito.addEventListener("input", function (evento) {
        if (evento.target.classList.contains("cantidad-input")) {
            const indice = evento.target.getAttribute("data-indice");
            const nuevaCantidad = parseInt(evento.target.value);
            if (!isNaN(nuevaCantidad)) {
                actualizarCantidadProducto(indice, nuevaCantidad);
            }
        }
    });

    // Evento para limpiar el carrito con confirmación
    botonLimpiar.addEventListener("click", function () {
        const confirmar = confirm("¿Estás seguro de que quieres vaciar el carrito?");
        if (confirmar) {
            vaciarCarrito();
        }
    });

    // Mostrar el carrito la primera vez al cargar la página
    mostrarCarrito();
});