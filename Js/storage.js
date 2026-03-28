function guardarUser(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
}
function obtenerUser() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}