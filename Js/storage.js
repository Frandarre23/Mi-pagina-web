function guardarUser(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
}

function obtenerUser() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function obtenerUsuarioActual(){
    return JSON.parse(localStorage.getItem("usuarioActual"));
}

function guardarUsuarioActual(usuario){
    localStorage.setItem("usuarioActual", JSON.stringify(usuario));
}