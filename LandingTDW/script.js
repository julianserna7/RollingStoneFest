const filas = document.querySelectorAll('.fila');

filas.forEach(fila => {
    fila.addEventListener('click', () => {
        fila.classList.toggle('abierta');
    });
});