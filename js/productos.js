document.addEventListener("DOMContentLoaded", function () {
    const botonesAgregar = document.querySelectorAll(".agregar-carrito");

    botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", function () {
        const nombre = this.getAttribute("data-nombre");
        const precio = parseFloat(this.getAttribute("data-precio"));
        const imagen = this.getAttribute("data-imagen");

        const nuevoProducto = { nombre, precio, imagen };

        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.push(nuevoProducto);
        localStorage.setItem("carrito", JSON.stringify(carrito));

        alert(`"${nombre}" fue agregado al carrito.`);
    });
    });
});