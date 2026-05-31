document.addEventListener('DOMContentLoaded', () => {

    // LÓGICA PARA LAS FILAS (preguntas frecuentes)
    const filasFAQ = document.querySelectorAll('.grillaFAQ .fila');

    filasFAQ.forEach(fila => {
        fila.addEventListener('click', () => {
            const estaAbierta = fila.classList.contains('abierta');
            filasFAQ.forEach(f => f.classList.remove('abierta'));
            if (!estaAbierta) {
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
                    ? seleccionados.join(', ')
                    : 'Seleccionar géneros';
            }
        });
    });

    const radios = document.querySelectorAll('input[name="fuente"]'); // Actualizar texto del botón fuente (radios)
    const btnFuente = document.getElementById('btn-fuente');

    radios.forEach(rd => {
        rd.addEventListener('change', () => {
            if (rd.checked && btnFuente) {
                btnFuente.textContent = rd.parentElement.textContent.trim();
            }
        });
    });

    // --- LÓGICA PARA LOS DROPDOWNS DEL FORMULARIO ---
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector('.dropbtn');
        const content = dropdown.querySelector('.dropdown-content');

        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que se cierre al abrirlo
            // Opcional: Cierra otros dropdowns si quieres que solo uno esté abierto a la vez
            document.querySelectorAll('.dropdown-content').forEach(c => {
                if (c !== content) c.classList.remove('mostrar');
            });
            content.classList.toggle('mostrar');
        });

        // Esto es lo que soluciona tu problema: 
        // evita que el clic dentro del contenido cierre el dropdown
        content.addEventListener('click', (e) => {
            e.stopPropagation(); 
        });
    });

    // Cierra los dropdowns si haces clic en cualquier otro lugar de la pantalla
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-content').forEach(c => {
            c.classList.remove('mostrar');
        });
    });


    // MENU MOBILE - cerrar al hacer click en un link
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

                if (btnGenero) btnGenero.textContent = 'Seleccionar géneros';
                if (btnFuente) btnFuente.textContent = 'Seleccionar opción';
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

        if (!error) {
            const nombreInput = document.getElementById('nombre').value; // 1. CAPTURAR VALORES
            const emailInput = document.getElementById('email').value;   

            document.getElementById('nombre-usuario').innerText = nombreInput; // 2. INYECTAR DATOS EN EL POPUP
            document.getElementById('mail-usuario').innerText = emailInput;

            popup.classList.add('activo'); // 3. MOSTRAR POPUP
            form.reset();
        }
    });

    btnCerrar.addEventListener('click', () => { // Cerrar el Pop-up
        popup.classList.remove('activo');
    });


    // ANIMACION APARICIÓN
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
    // FIN DE ANIMACION APARICIÓN

});