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
    alert("Sesión cerrada");
    window.location.href = "../pages/login.html";
}