// Productos
document.addEventListener("click", (e) => {

    if (e.target.classList.contains("btn-agregar")) {

        let nombre = e.target.dataset.nombre;
        let precio = parseInt(e.target.dataset.precio);

        agregarAlCarrito(nombre, precio,);
        actualizarContadorCarrito();
    }
});

function agregarAlCarrito(nombre, precio, imagen) {

    let usuarioActual = obtenerUsuarioActual();
    let usuarios = obtenerUser();

    if (!usuarioActual) {
        Toastify({
            text: "Primero debes iniciar sesión",
            duration: 1500,
            gravity: "top",
            position: "right",
            style: {
                background: "#e74c3c",
            }
        }).showToast();

        window.location.href = "login.html";
        return;
    }

    let user = usuarios.find(u => u.email === usuarioActual.email);

    let existente = user.carrito.find(p => p.nombre === nombre);

    if (existente) {
        existente.cantidad++;
    } else {
        user.carrito.push({
            nombre,
            precio,
            imagen,
            cantidad: 1
        });
    }

    guardarUser(usuarios);
    guardarUsuarioActual(user);

    Toastify({
        text: "Producto agregado al carrito",
        duration: 1500,
        gravity: "top",
        position: "right",
        style: {
            background: "#27ae60",
        }
    }).showToast();

    actualizarContadorCarrito();
}

async function cargarProductos() {

    try {

        let res = await fetch("https://sheetdb.io/api/v1/ers2l3iahuwip");

        if (!res.ok) {
            throw new Error("Error en la API");
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