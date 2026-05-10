document.addEventListener('DOMContentLoaded', () => {

    // LÓGICA PARA LAS FILAS (preguntas frecuentes)
    const filas = document.querySelectorAll('.fila');

    filas.forEach(fila => {
        fila.addEventListener('click', () => {
            const estaAbierta = fila.classList.contains('abierta');

            filas.forEach(f => f.classList.remove('abierta')); // 1. Cerramos TODAS las filas primero (esta es la clave para que solo haya una abierta)

            if (!estaAbierta) { // 2. Si la fila que clickeamos NO estaba abierta, la abrimos (Si ya estaba abierta, se queda cerrada por el paso anterior)
                fila.classList.add('abierta');
            }
        });
    });

    // CONTADOR
    const fechaFestival = new Date('2026-11-13T14:00:00');

    function actualizarContador() {
        const ahora = new Date();
        const diferencia = fechaFestival - ahora;

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        document.getElementById('dias').textContent = String(dias).padStart(2, '0');
        document.getElementById('horas').textContent = String(horas).padStart(2, '0');
        document.getElementById('minutos').textContent = String(minutos).padStart(2, '0');
        document.getElementById('segundos').textContent = String(segundos).padStart(2, '0');
    }

    setInterval(actualizarContador, 1000);
    actualizarContador();

    // DROPDOWNS (click-toggled)
    function setupDropdown(btnId, contentId) {
        const btn = document.getElementById(btnId);
        const content = document.getElementById(contentId);
        if (!btn || !content) return;

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = content.classList.contains('open');

            document.querySelectorAll('.dropdown-content').forEach(d => d.classList.remove('open')); // Cerrar todos los dropdowns

            if (!isOpen) content.classList.add('open');
        });
    }

    document.addEventListener('click', () => { // Cerrar dropdowns al hacer click fuera
        document.querySelectorAll('.dropdown-content').forEach(d => d.classList.remove('open'));
    });

    setupDropdown('btn-genero', 'dropdown-genero');
    setupDropdown('btn-fuente', 'dropdown-fuente');
    
    const checkboxes = document.querySelectorAll('input[name="genero"]'); // Actualizar texto del botón géneros (checkboxes)
    const btnGenero = document.getElementById('btn-genero');

    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const seleccionados = Array.from(checkboxes)
                .filter(i => i.checked)
                .map(i => i.parentElement.textContent.trim());

            if (btnGenero) {
                btnGenero.textContent = seleccionados.length > 0
                    ? seleccionados.join(', ') + ' ▼'
                    : 'Seleccionar géneros ▼';
            }
        });
    });

    const radios = document.querySelectorAll('input[name="fuente"]'); // Actualizar texto del botón fuente (radios)
    const btnFuente = document.getElementById('btn-fuente');

    radios.forEach(rd => {
        rd.addEventListener('change', () => {
            if (rd.checked && btnFuente) {
                btnFuente.textContent = rd.parentElement.textContent.trim() + ' ▼';
            }
        });
    });


    // MENU MOBILE — cerrar al hacer click en un link
    const menuCheck = document.getElementById('menu-check');
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuCheck) menuCheck.checked = false;
        });
    });



    // POP-UP CONFIRMACIÓN REGISTRO
    const formRegistro = document.getElementById('form-registro');
    const popupConfirmacion = document.getElementById('popup-confirmacion');
    const cerrarConfirmacion = document.getElementById('cerrar-confirmacion');

    function validarForm() {
        let valido = true;

        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        const errorNombre = document.getElementById('error-nombre');
        const errorEmail = document.getElementById('error-email');

        [nombre, email].forEach(el => el && el.classList.remove('invalido')); // Reset
        if (errorNombre) errorNombre.textContent = '';
        if (errorEmail) errorEmail.textContent = '';

        if (!nombre || nombre.value.trim().length < 2) { // Validar nombre
            valido = false;
            if (nombre) nombre.classList.add('invalido');
            if (errorNombre) errorNombre.textContent = 'Por favor ingresá tu nombre.';
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validar email
        if (!email || !emailRegex.test(email.value.trim())) {
            valido = false;
            if (email) email.classList.add('invalido');
            if (errorEmail) errorEmail.textContent = 'Ingresá un email válido.';
        }

        return valido;
    }

    if (formRegistro) {
        formRegistro.addEventListener('submit', e => {
            e.preventDefault();
            if (validarForm()) {
                abrirPopup(popupConfirmacion);
                formRegistro.reset();
                
                if (btnGenero) btnGenero.textContent = 'Seleccionar géneros ▼'; // Resetear textos de dropdowns
                if (btnFuente) btnFuente.textContent = 'Seleccionar opción ▼';
            }
        });
    }

    if (cerrarConfirmacion) {
        cerrarConfirmacion.addEventListener('click', () => cerrarPopup(popupConfirmacion));
    }

    if (popupConfirmacion) {
        popupConfirmacion.addEventListener('click', e => {
            if (e.target === popupConfirmacion) cerrarPopup(popupConfirmacion);
        });
    }

    // CERRAR POPUPS CON ESC
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            cerrarPopup(popupLineup);
            cerrarPopup(popupConfirmacion);
        }
    });

    // VALIDACIÓN Y POP-UP
    const form = document.getElementById('form-registro');
    const popup = document.getElementById('popup-confirmacion');
    const btnCerrar = document.getElementById('cerrar-confirmacion');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue

        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        let error = false;
      
        if (nombre.value.trim() === "") { // Validación simple de nombre
            document.getElementById('error-nombre').innerText = "Por favor, ingresá tu nombre";
            nombre.classList.add('invalido');
            error = true;
        } else {
            document.getElementById('error-nombre').innerText = "";
            nombre.classList.remove('invalido');
        }
        
        if (email.value.trim() === "") { // Validación simple de email
            document.getElementById('error-email').innerText = "El email es obligatorio";
            email.classList.add('invalido');
            error = true;
        } else {
            document.getElementById('error-email').innerText = "";
            email.classList.remove('invalido');
        }
        
        if (!error) { // Si no hay errores, mostramos el cartel
            popup.classList.add('activo');
            form.reset(); // Limpia el formulario
        }
    });

    btnCerrar.addEventListener('click', () => { // Cerrar el Pop-up
        popup.classList.remove('activo');
    });



    /* ANIMACION APARICION */
const revealEls = document.querySelectorAll(
        '.reveal-fade-up, .reveal-slide-left, .reveal-slide-right'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(el => revealObserver.observe(el));

    /* FIN DE ANIMACION APARICION */

});


