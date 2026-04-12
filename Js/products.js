// Productos
document.addEventListener("click", (e) => {

    if (e.target.classList.contains("btn-agregar")) {

        let nombre = e.target.dataset.nombre;
        let precio = parseInt(e.target.dataset.precio);

        agregarAlCarrito(nombre, precio);
    }
});

async function cargarProductos() {

    try {

        let res = await fetch("https://sheetdb.io/api/v1/ers2l3iahuwip");

        if (!res.ok) {
            throw new error("Error en la API");
        }

        let productos = await res.json();

        renderCategoria(productos, "suplementacion", "#suplementacion");
        renderCategoria(productos, "musculosas", "#musculosas");
        renderCategoria(productos, "remeras", "#remeras");
        renderCategoria(productos, "buzos", "#buzos");
        renderCategoria(productos, "medias", "#medias");

    } catch (error) {
        console.error("Error cargando productos", error);

        if (container) {
            container.innerHTML = "<p>Error cargando productos</p>";
        }
    }
}

function renderCategoria(productos, categoria, selector) {

    let container = document.querySelector(selector);

    if (!container) return;

    container.innerHTML = "";

    let filtrados = productos.filter(p => p.categoria === categoria).sort((a, b) => a.precio - b.precio);

    container.innerHTML = filtrados.map(prod => `
    <div class="producto">
        <img src="${prod.imagen}" alt="${prod.nombre}">
        <p>$${parseInt(prod.precio).toLocaleString()}</p>

        <button class="btn-agregar"
            data-nombre="${prod.nombre}"
            data-precio="${parseInt(prod.precio)}"
            data-imagen="${prod.imagen}">
            Agregar
        </button>
    </div>
`).join("");
    /*filtrados.forEach(prod => {

        container.innerHTML += `
            <div class="producto">
                <img src="${prod.imagen}" alt="${prod.nombre}">
                <p>$${prod.precio}</p>

                <button class="btn-agregar"
                    data-nombre="${prod.nombre}"
                    data-precio="${parseInt(prod.precio)}">
                    Agregar
                </button>
            </div>
        `;
    });*/
}

cargarProductos();


// Ofertas
if (!localStorage.getItem("promoMostrada")) {

    Swal.fire({
        title: "🔥 PROMO ACTIVA",
        html: "¡Hasta el <b>20 de mayo</b>!<br>Superando $70.000 tenés <b>ENVÍO GRATIS</b>",
        icon: "success",
        confirmButtonText: "Buenísimo",
        background: "#eb4a00",
        color: "#000",
        confirmButtonColor: "#000"
    });

    localStorage.setItem("promoMostrada", "true");
}

localStorage.removeItem("promoMostrada");