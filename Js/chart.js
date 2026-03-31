let container = document.querySelector("#carritoContainer")
let muestraTotal = document.querySelector("#total")
let btnVaciar = document.querySelector("#btnVaciar")

let usuarioActual = obtenerUsuarioActual();
let users = obtenerUser();


function agregarAlCarrito(nombre, precio) {

    if (!usuarioActual) {
        alert("Primero debe iniciar sesion");
        window.location.href = "login.html";
        return;
    }

    let user = users.find(u => u.email === usuarioActual.email);

    let existente = user.carrito.find(p => p.nombre === nombre);

    if (existente) {
        existente.cantidad++;
    } else {
        user.carrito.push({ nombre, precio, cantidad: 1 });
    }

    guardarUser(users);
    guardarUsuarioActual(user);

    Toastify({
        text: "Producto agregado correctamente al carrito",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "#27ae60",
        }
    }).showToast();
}

function mostrarCarrito() {

    let usuarioActual = obtenerUsuarioActual();

    if (!usuarioActual) {
        alert("Debe iniciar sesion");
        window.location.href = "../pages/login.html"
    }

    container.innerHTML = "";

    usuarioActual.carrito.forEach((producto, indice) => {

        container.innerHTML += `
            <div class="item-carrito">
                <p>${producto.nombre}</p>
                <p>$${producto.precio}</p>

                <div class="cantidad">
                    <button class="btn-restar" data-index="${indice}">-</button>
                    <span>${producto.cantidad}</span>
                    <button class="btn-sumar" data-index="${indice}">+</button>
                </div>

                <button class="btn-eliminar" data-index="${indice}">Eliminar</button>
            </div>
        `;
    });

    let total = usuarioActual.carrito.reduce(
        (acc, prod) => acc + prod.precio * (prod.cantidad || 1),
        0
    );

    muestraTotal.textContent = "Total: $" + total.toLocaleString();

}

mostrarCarrito();

function eliminarDelCarrito(indice) {
    let user = users.find(u => u.email === usuarioActual.email)

    user.carrito.splice(indice, 1);

    guardarUser(users);
    guardarUsuarioActual(producto)

    mostrarCarrito();
}

function modificarCarrito(indice, cambio) {

    let user = user.find(u => u.email === usuarioActual.email);

    user.carrito[indice].cantidad += cambio;

    if (user.carrito[indice].cantidad <= 0) {
        user.carrito.splice(indice, 1);
    }

    guardarUser(users);
    guardarUsuarioActual(user);

    mostrarCarrito();
}

if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {

        let user = users.find(u => u.email === usuarioActual.email);

        if (user.carrito.length === 0) {
            alert("El carrito ya está vacío");
            return;
        }

        user.carrito = [];

        guardarUser(users);
        guardarUsuarioActual(user);

        if(user.carrito.length > 0){
          Toastify({
            text: "Carrito vaciado",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#27ae60",
            }
        }).showToast();  
        }

        mostrarCarrito();
    });
}

document.addEventListener("click", (e) => {

    let usuarioActual = obtenerUsuarioActual();
    let usuarios = obtenerUser();
    let user = usuarios.find(u => u.email === usuarioActual.email);

    if (!user) return;

    // eliminar
    if (e.target.classList.contains("btn-eliminar")) {
        let index = e.target.dataset.index;
        user.carrito.splice(index, 1);
    }

    // sumar
    if (e.target.classList.contains("btn-sumar")) {
        let index = e.target.dataset.index;
        user.carrito[index].cantidad++;
    }

    // restar
    if (e.target.classList.contains("btn-restar")) {
        let index = e.target.dataset.index;

        user.carrito[index].cantidad--;

        if (user.carrito[index].cantidad <= 0) {
            user.carrito.splice(index, 1);
        }
    }

    guardarUser(usuarios);
    guardarUsuarioActual(user);

    mostrarCarrito();
});