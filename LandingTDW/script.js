// Lógica para las filas (preguntas frecuentes)
const filas = document.querySelectorAll('.fila');

filas.forEach(fila => {
    fila.addEventListener('click', () => {
        fila.classList.toggle('abierta');
    });
});

// Lógica para Géneros (Checkboxes - Múltiple)
const checkboxes = document.querySelectorAll('input[name="genero"]');
const btnGenero = document.getElementById('btn-genero');

checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
        const seleccionados = Array.from(checkboxes)
            .filter(i => i.checked)
            .map(i => i.parentElement.textContent.trim());
        
        if(btnGenero) { // Verificamos que el botón exista
            btnGenero.innerText = seleccionados.length > 0 
                ? seleccionados.join(', ') + " ▼" 
                : "Seleccionar géneros ▼";
        }
    });
});

// Lógica para Fuente (Radio - Único)
const radios = document.querySelectorAll('input[name="fuente"]');
const btnFuente = document.getElementById('btn-fuente');

radios.forEach(rd => {
    rd.addEventListener('change', () => {
        if (rd.checked && btnFuente) {
            btnFuente.innerText = rd.parentElement.textContent.trim() + " ▼";
        }
    });
});