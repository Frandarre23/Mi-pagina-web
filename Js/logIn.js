let btnLogIn = document.querySelector("#btnLogin")
let loginEmail = document.querySelector("#loginEmail");
let loginPassword = document.querySelector("#loginPassword");

// login
if (btnLogIn) {
    btnLogIn.addEventListener("click", (e) => {

        e.preventDefault();

        if (!loginEmail.value.includes("@")) {
            Toastify({
                text: "Email invalido",
                duration: 1500,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#27ae60",
                }
            }).showToast();
            return;
        }

        if (loginPassword.value.length < 7) {
            Toastify({
                text: "La contraseña debe tener al menos 7 caracteres",
                duration: 1500,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#27ae60",
                }
            }).showToast();
            return;
        }

        let usuarios = obtenerUser();

        let usuarioEncontrado = usuarios.find(u => u.email === loginEmail.value && u.password === loginPassword.value);

        if (usuarioEncontrado) {
            Toastify({
                text: "Sesion iniciada correctamente",
                duration: 1500,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#27ae60",
                }
            }).showToast();
            guardarUsuarioActual(usuarioEncontrado);
            setTimeout(() => {
                window.location.href = "../index.html";
            }, 1500);
        } else {
            Toastify({
                text: "Datos incorrectos",
                duration: 1500,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#27ae60",
                }
            }).showToast();
        }
    });
}

// sesion
let usuarioActual = obtenerUsuarioActual();

// mostrar usuario logueado
if (usuarioActual) {
    nombreLogIn.textContent = "Bienvenido " + usuarioActual.email;
}

// verificar sesión
function verificarSesion() {
    if (!usuarioActual) {
        window.location.href = "login.html";
    }
}