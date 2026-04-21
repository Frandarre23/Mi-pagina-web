// Ofertas
document.addEventListener("click", (e) => {

    if (e.target.classList.contains("btn-agregar")) {

        let nombre = e.target.dataset.nombre;
        let precio = parseInt(e.target.dataset.precio);

        agregarAlCarrito(nombre, precio);
        actualizarContadorCarrito();
    }
});

async function cargarOfertas() {
    try {
        let res = await fetch("../data/ofertas.json");
        let ofertas = await res.json();

        renderCategoria(ofertas, "suplementacion", "#ofertas-suplementacion");
        renderCategoria(ofertas, "medias", "#ofertas-medias");

    } catch (error) {
        console.error("Error cargando ofertas", error);
    }
}

function renderCategoria(productos, categoria, selector) {

    let container = document.querySelector(selector);

    if (!container) return;

    let filtrados = productos.filter(p => p.categoria === categoria);

    container.innerHTML = filtrados.map(prod => `
        <div class="producto">
            <h3>${prod.nombre}</h3>
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <p>$${prod.precio.toLocaleString()}</p>

            <button class="btn-agregar"
                data-nombre="${prod.nombre}"
                data-precio="${prod.precio}">
                Agregar
            </button>
        </div>
    `).join("");
}

cargarOfertas();