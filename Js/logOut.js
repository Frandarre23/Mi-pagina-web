let usuarioActual = obtenerUsuarioActual();

let btnLogout = document.querySelector("#btnLogout");
let nombreLogIn = document.querySelector("#usuarioLogueado");

// mostrar usuario
if (usuarioActual && nombreLogIn) {
    nombreLogIn.textContent = "Bienvenido " + usuarioActual.email;
}

// mostrar / ocultar botón
if (btnLogout) {

    if (usuarioActual) {
        btnLogout.style.display = "block";
    } else {
        btnLogout.style.display = "none";
    }

    btnLogout.addEventListener("click", logout);
}

// logout
function logout() {
    localStorage.removeItem("usuarioActual");
    Toastify({
        text: "Sesion cerrada correctamente",
        duration: 1500,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "#27ae60",
        }
    }).showToast();

    setTimeout(() => {
        actualizarHeader();
    }, 1500);
}

function actualizarHeader() {

    let usuarioActual = obtenerUsuarioActual();

    let nombre = document.querySelector("#usuarioLogueado");
    let btnLogout = document.querySelector("#btnLogout");

    if (usuarioActual) {
        if (nombre) nombre.textContent = "Hola " + usuarioActual.email;
        if (btnLogout) btnLogout.style.display = "block";
    } else {
        if (nombre) nombre.textContent = "";
        if (btnLogout) btnLogout.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", actualizarHeader);