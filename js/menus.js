/* menus.js - VERSIÓN CORREGIDA */

// Encapsulamos todo en un bloque o función autoejecutable para evitar conflictos
(function() {
    // Definir la ruta base de tus imágenes. 
    // Si tu proyecto está en la raíz del dominio usa '/img/'
    // Si está en una carpeta llamada splendorherbs, usa '/splendorherbs/img/'
    const BASE_IMG_PATH = '/img/'; // <--- AJUSTA ESTO SI ES NECESARIO

    // =======================
    // 1. INICIALIZACIÓN
    // =======================
    function initHeaderLogic() {
        // Seleccionamos los elementos AQUÍ, no afuera, para asegurar que ya existen
        const menuBtn = document.getElementById('mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        const overlay = document.getElementById('menu-overlay');
        const dropdowns = document.querySelectorAll('.dropdown');
        const langEsBtn = document.getElementById('lang-es');
        const langEnBtn = document.getElementById('lang-en');

        // Listeners de idioma
        if (langEsBtn) langEsBtn.addEventListener('click', () => applyLanguage('es'));
        if (langEnBtn) langEnBtn.addEventListener('click', () => applyLanguage('en'));

        // Listener Menú Móvil
        if (menuBtn) menuBtn.addEventListener('click', () => toggleMobileMenu(menuBtn, navMenu, overlay));
        if (overlay) overlay.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) toggleMobileMenu(menuBtn, navMenu, overlay);
        });

        // Configuración inicial de idioma
        const savedLang = localStorage.getItem('language') || 'es';
        applyLanguage(savedLang); // Esto cargará las banderas y textos
        
        // Inicializar Dropdowns
        initDropdowns(dropdowns, navMenu, menuBtn, overlay);
    }

    // =======================
    // 2. FUNCIONES LÓGICAS
    // =======================

    function applyLanguage(lang) {
        localStorage.setItem('language', lang);

        const currentFlag = document.getElementById('current-lang-flag');
        const currentText = document.getElementById('current-lang-text');

        // AQUÍ ESTABA EL ERROR: Usar rutas absolutas
        if (currentFlag && currentText) {
            if (lang === 'es') {
                currentFlag.src = BASE_IMG_PATH + 'co.png'; // Ruta absoluta
                currentText.textContent = 'ESP';
            } else {
                currentFlag.src = BASE_IMG_PATH + 'us.png'; // Ruta absoluta
                currentText.textContent = 'EN';
            }
        }

        // Traducción de textos en toda la página
        const allElements = document.querySelectorAll('[data-es][data-en]');
        allElements.forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });
        
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }

    function toggleMobileMenu(btn, menu, ol) {
        if (!menu || !btn) return;
        const isActive = menu.classList.contains('active');
        
        btn.classList.toggle('active');
        menu.classList.toggle('active');
        if(ol) ol.classList.toggle('active');
        
        document.body.style.overflow = isActive ? 'auto' : 'hidden';
    }

    function initDropdowns(dropdowns, navMenu, menuBtn, overlay) {
        const closeAllDropdowns = () => {
            document.querySelectorAll('.dropdown-content').forEach(c => c.classList.remove('show'));
            document.querySelectorAll('.arrow-icon').forEach(i => {
                i.classList.remove('rotate');
                i.style.transform = '';
            });
        };

        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');
            const content = dropdown.querySelector('.dropdown-content');
            const icon = dropdown.querySelector('.arrow-icon');

            if (link) {
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 900) {
                        e.preventDefault();
                        e.stopPropagation();
                        const isOpen = content.classList.contains('show');
                        closeAllDropdowns();
                        if (!isOpen) {
                            content.classList.add('show');
                            if (icon) icon.classList.add('rotate');
                        }
                    }
                });
            }

            dropdown.addEventListener('mouseenter', () => {
                if (window.innerWidth > 900 && content) {
                    closeAllDropdowns();
                    content.classList.add('show');
                    if (icon) icon.classList.add('rotate');
                }
            });
        });

        document.addEventListener('click', e => {
            if (!e.target.closest('.dropdown')) closeAllDropdowns();
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                if (navMenu) navMenu.classList.remove('active');
                if (menuBtn) menuBtn.classList.remove('active');
                if(overlay) overlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            closeAllDropdowns();
        });
        
        // Lógica del dropdown de idioma
        const langSelectedBtn = document.querySelector('.lang-selected');
        const langDropdown = document.querySelector('.language-dropdown');
        if (langSelectedBtn && langDropdown) {
            langSelectedBtn.addEventListener('click', e => {
                e.stopPropagation();
                langDropdown.classList.toggle('active-lang');
            });
            document.addEventListener('click', e => {
                if (!langDropdown.contains(e.target)) {
                    langDropdown.classList.remove('active-lang');
                }
            });
        }
    }

    // Ejecutar la lógica inmediatamente
    initHeaderLogic();

})();