let btnLogIn = document.querySelector("#btnLogin")
let loginEmail = document.querySelector("#loginEmail");
let loginPassword = document.querySelector("#loginPassword");

// login
if (btnLogIn) {
    btnLogIn.addEventListener("click", (e) => {

        e.preventDefault();

        if (!loginEmail.value || !loginPassword.value) {
            alert("Completa todos los campos");
            return;
        }

        let usuarios = obtenerUser();

        let usuarioEncontrado = usuarios.find(u => u.email === loginEmail.value && u.password === loginPassword.value);

        if (usuarioEncontrado) {
            alert("Login correcto");
            guardarUsuarioActual(usuarioEncontrado);
            window.location.href = "../index.html";
        } else {
            alert("Datos incorrectos");
        }
    });
}

// sesion
let usuarioActual = obtenerUsuarioActual();

// mostrar usuario logueado
if(usuarioActual){
    nombreLogIn.textContent = "Bienvenido " + usuarioActual.email;
}

// verificar sesión
function verificarSesion() {
    if (!usuarioActual) {
        window.location.href = "login.html";
    }
}