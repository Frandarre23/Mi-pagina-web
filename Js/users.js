let btnRegistro = document.querySelector("#btnRegistro");
let email = document.querySelector("#email")
let password = document.querySelector("#password")

class usuario {
    constructor(email, password) {
        this.email = email
        this.password = password
        this.carrito = []
    }
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
            let nuevoUser = new usuario(email.value, password.value);

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
                    background:  "#27ae60",
                }}).showToast();
        }

    })
}

let usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

if(usuarioActual){
    console.log("Bienvenido", usuarioActual.email);
}

