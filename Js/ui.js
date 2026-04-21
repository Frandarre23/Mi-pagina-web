// Carrito funcional
function actualizarContadorCarrito() {

    let usuarioActual = obtenerUsuarioActual();
    let contador = document.querySelector("#contadorCarrito");

    if (!contador) return;

    if (usuarioActual && usuarioActual.carrito) {

        let total = usuarioActual.carrito.reduce(
            (acc, prod) => acc + (prod.cantidad || 1),
            0
        );

        contador.textContent = total;

    } else {
        contador.textContent = 0;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
});