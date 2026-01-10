// ==========================================
// 1. FUNCIÓN DE INICIALIZACIÓN (Exportable)
// ==========================================
function initMenu() {
    console.log("Inicializando menú...");

    // Selectores (Se ejecutan DENTRO de la función para asegurar que el DOM existe)
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.getElementById('menu-overlay');
    const dropdowns = document.querySelectorAll('.nav-item.dropdown'); // Selector ajustado
    const langBtn = document.querySelector('.lang-selected');
    const langDropdown = document.querySelector('.language-dropdown');
    const langEsBtn = document.getElementById('lang-es');
    const langEnBtn = document.getElementById('lang-en');

    // --- A. Lógica Menú Hamburguesa ---
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita conflictos
            toggleMobileMenu();
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            closeMobileMenu();
        });
    }

    function toggleMobileMenu() {
        const isActive = navMenu.classList.contains('active');
        if (isActive) {
            closeMobileMenu();
        } else {
            menuBtn.classList.add('active');
            navMenu.classList.add('active');
            if(overlay) overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Bloquear scroll
            menuBtn.innerHTML = '<i class="fas fa-times"></i>'; // Cambiar icono a X
        }
    }

    function closeMobileMenu() {
        if(menuBtn) {
            menuBtn.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
        if(navMenu) navMenu.classList.remove('active');
        if(overlay) overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Cerrar también los dropdowns internos y el idioma
        document.querySelectorAll('.dropdown-content').forEach(c => c.classList.remove('show'));
        if(langDropdown) langDropdown.classList.remove('active-lang');
    }

    // --- B. Lógica Dropdowns (Acordeón en Móvil) ---
    dropdowns.forEach(group => {
        const link = group.querySelector('.nav-link');
        const content = group.querySelector('.dropdown-content');
        const arrow = group.querySelector('.arrow-icon');

        if (link && content) {
            link.addEventListener('click', (e) => {
                // Solo aplicar comportamiento de acordeón en pantallas menores a 1240px
                if (window.innerWidth < 1240) {
                    e.preventDefault(); // Evitar navegación
                    
                    // Toggle de la clase show
                    const isOpen = content.classList.contains('show');
                    
                    // Opcional: Cerrar otros abiertos (comentar si quieres permitir múltiples abiertos)
                    document.querySelectorAll('.dropdown-content').forEach(c => c.classList.remove('show'));
                    document.querySelectorAll('.arrow-icon').forEach(i => i.classList.remove('rotate'));

                    if (!isOpen) {
                        content.classList.add('show');
                        if(arrow) arrow.classList.add('rotate');
                    }
                }
            });
        }
    });

    // --- C. Lógica Selector de Idioma (Móvil Click) ---
    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Importante para que no se cierre inmediatamente
            langDropdown.classList.toggle('active-lang');
            
            // Si abrimos idioma, aseguramos que el icono de flecha gire (opcional)
            const arrow = langBtn.querySelector('.arrow-icon');
            if(arrow) arrow.classList.toggle('rotate');
        });

        // Cerrar al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!langDropdown.contains(e.target) && !langBtn.contains(e.target)) {
                langDropdown.classList.remove('active-lang');
                const arrow = langBtn.querySelector('.arrow-icon');
                if(arrow) arrow.classList.remove('rotate');
            }
        });
    }

    // Listeners para cambiar idioma
    if (langEsBtn) langEsBtn.addEventListener('click', () => applyLanguage('es'));
    if (langEnBtn) langEnBtn.addEventListener('click', () => applyLanguage('en'));

    // Cargar idioma guardado al iniciar
    const savedLang = localStorage.getItem('language') || 'es';
    applyLanguage(savedLang);
}

// ==========================================
// 2. FUNCIÓN DE TRADUCCIÓN GLOBAL
// ==========================================
function applyLanguage(lang) {
    localStorage.setItem('language', lang);
    console.log("Cambiando idioma a:", lang);

    // 1. Actualizar Header (Bandera y Texto)
    const currentFlag = document.getElementById('current-lang-flag');
    const currentText = document.getElementById('current-lang-text');

    if (currentFlag && currentText) {
        if (lang === 'es') {
            currentFlag.src = '/img/co.png'; // Asegúrate que la ruta sea correcta
            currentText.textContent = 'ESP';
        } else {
            currentFlag.src = '/img/us.png';
            currentText.textContent = 'EN';
        }
    }

    // 2. Traducir textos (Busca en todo el documento)
    const allElements = document.querySelectorAll('[data-es][data-en]');
    allElements.forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });
    
    // Cerrar dropdown de idioma si está abierto
    const langDropdown = document.querySelector('.language-dropdown');
    if(langDropdown) langDropdown.classList.remove('active-lang');
}