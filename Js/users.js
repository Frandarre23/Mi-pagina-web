let btnRegistro = document.querySelector("#btnRegistro");
let email = document.querySelector("#email")
let password = document.querySelector("#password")

class Usuario {
    constructor(email, password) {
        this.email = email
        this.password = password
        this.carrito = []
    }
}

let usuarioActual = obtenerUsuarioActual();

if (usuarioActual) {
    window.location.href = "../index.html";
}


if (btnRegistro) {
    btnRegistro.addEventListener("click", (e) => {

        e.preventDefault();

        if (!email.value || !password.value) {
            alert("Completa todos los campos");
            return;
        }

        let usuarios = obtenerUser()
        let existe = usuarios.find(u => u.email === email.value)

        if (existe) {
            alert("Este usuario ya existe en laa pagina")
            return;
        } else {
            let nuevoUser = new Usuario(email.value, password.value);

            usuarios.push(nuevoUser);
            guardarUser(usuarios);

            Toastify({
                text: "Usuario registrado correctamente",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#27ae60",
                }
            }).showToast();

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500)
        }

    })
}