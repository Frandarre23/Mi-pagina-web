let btnLogIn = document.querySelector("#btnLogin")
let loginEmail = document.querySelector("#loginEmail");
let loginPassword = document.querySelector("#loginPassword");

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
            localStorage.setItem("usuarioActual", JSON.stringify(usuarioEncontrado));
            window.location.href = "index.html";
        } else {
            alert("Datos incorrectos");
        }
    });
}

let usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

if(usuarioActual){
    console.log("Bienvenido", usuarioActual.email);
}