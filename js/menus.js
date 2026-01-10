(function() {
    // AL USAR DOMINIO PERSONALIZADO, LA RUTA BASE ES LA RAÍZ
    const BASE_IMG_PATH = '/img/'; 

    function initHeaderLogic() {
        // Elementos del DOM
        const menuBtn = document.getElementById('mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        const overlay = document.getElementById('menu-overlay');
        const dropdowns = document.querySelectorAll('.dropdown');
        
        // Elementos de Idioma
        const langEsBtn = document.getElementById('lang-es');
        const langEnBtn = document.getElementById('lang-en');
        const langSelectedBtn = document.querySelector('.lang-selected');
        const langDropdown = document.querySelector('.language-dropdown');

        // 1. Lógica de Idioma
        if (langEsBtn) langEsBtn.addEventListener('click', () => {
            applyLanguage('es');
            if(langDropdown) langDropdown.classList.remove('active-lang');
        });
        
        if (langEnBtn) langEnBtn.addEventListener('click', () => {
            applyLanguage('en');
            if(langDropdown) langDropdown.classList.remove('active-lang');
        });

        // Toggle del dropdown de idioma
        if (langSelectedBtn && langDropdown) {
            langSelectedBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                langDropdown.classList.toggle('active-lang');
            });
            document.addEventListener('click', (e) => {
                if (!langDropdown.contains(e.target)) {
                    langDropdown.classList.remove('active-lang');
                }
            });
        }

        // Cargar idioma guardado
        const savedLang = localStorage.getItem('language') || 'es';
        applyLanguage(savedLang);

        // 2. Lógica Menú Móvil
        if (menuBtn && navMenu) {
            menuBtn.addEventListener('click', () => {
                menuBtn.classList.toggle('active');
                navMenu.classList.toggle('active');
                if (overlay) overlay.classList.toggle('active');
                
                // Bloquear scroll del body
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
            });
        }

        if (overlay) {
            overlay.addEventListener('click', () => {
                if (navMenu) navMenu.classList.remove('active');
                if (menuBtn) menuBtn.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        // 3. Lógica Dropdowns (Móvil y Desktop)
        initDropdowns(dropdowns);
    }

    function applyLanguage(lang) {
        localStorage.setItem('language', lang);
        
        // Actualizar bandera y texto del selector
        const currentFlag = document.getElementById('current-lang-flag');
        const currentText = document.getElementById('current-lang-text');

        if (currentFlag && currentText) {
            if (lang === 'es') {
                currentFlag.src = BASE_IMG_PATH + 'co.png';
                currentText.textContent = 'ESP';
            } else {
                currentFlag.src = BASE_IMG_PATH + 'us.png';
                currentText.textContent = 'EN';
            }
        }

        // Traducir elementos con atributos data-es / data-en
        const allElements = document.querySelectorAll('[data-es][data-en]');
        allElements.forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });
    }

    function initDropdowns(dropdowns) {
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');
            const content = dropdown.querySelector('.dropdown-content');
            const icon = dropdown.querySelector('.arrow-icon');

            // Click en móvil
            if (link) {
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 900) {
                        e.preventDefault(); // Evita navegar si es un dropdown
                        
                        // Cerrar otros dropdowns
                        dropdowns.forEach(d => {
                            if (d !== dropdown) {
                                const c = d.querySelector('.dropdown-content');
                                const i = d.querySelector('.arrow-icon');
                                if(c) c.classList.remove('show');
                                if(i) i.classList.remove('rotate');
                            }
                        });

                        if (content) content.classList.toggle('show');
                        if (icon) icon.classList.toggle('rotate');
                    }
                });
            }
        });
    }

    // Ejecutar lógica
    initHeaderLogic();
})();