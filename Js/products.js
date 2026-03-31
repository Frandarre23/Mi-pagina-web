let btnAgregar = document.querySelectorAll(".btn-agregar");

btnAgregar.forEach(boton => {
    boton.addEventListener("click", () => {

        let nombre = boton.dataset.nombre;
        let precio = parseInt(boton.dataset.precio);

        agregarAlCarrito(nombre, precio);
    });
});
