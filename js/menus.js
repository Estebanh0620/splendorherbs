(function() {
    console.log("Iniciando menus.js..."); // Para depurar

    const BASE_IMG_PATH = '/img/'; // Ruta absoluta para dominio personalizado

    function initHeaderLogic() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        const overlay = document.getElementById('menu-overlay');
        
        // Verificación de seguridad
        if (!menuBtn || !navMenu) {
            console.error("Menus.js: No se encontró el botón de menú o el menú en el HTML.");
            return;
        }

        // Lógica Menú Móvil
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            if (overlay) overlay.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        if (overlay) {
            overlay.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        // Dropdowns para móvil
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(d => {
            const link = d.querySelector('.nav-link');
            const content = d.querySelector('.dropdown-content');
            const icon = d.querySelector('.arrow-icon');

            if (link) {
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 900) {
                        e.preventDefault();
                        content.classList.toggle('show');
                        if (icon) icon.classList.toggle('rotate');
                    }
                });
            }
        });

        // Lógica de Idioma
        initLanguage();
    }

    function initLanguage() {
        const langEs = document.getElementById('lang-es');
        const langEn = document.getElementById('lang-en');
        const dropdown = document.querySelector('.language-dropdown');
        const selectedBtn = document.querySelector('.lang-selected');

        // Toggle dropdown idioma
        if (selectedBtn && dropdown) {
            selectedBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('active-lang');
            });
            document.addEventListener('click', () => dropdown.classList.remove('active-lang'));
        }

        if (langEs) langEs.addEventListener('click', () => changeLang('es'));
        if (langEn) langEn.addEventListener('click', () => changeLang('en'));

        // Cargar idioma guardado
        const saved = localStorage.getItem('language') || 'es';
        changeLang(saved);
    }

    function changeLang(lang) {
        localStorage.setItem('language', lang);
        
        const flag = document.getElementById('current-lang-flag');
        const text = document.getElementById('current-lang-text');

        if (flag && text) {
            flag.src = lang === 'es' ? BASE_IMG_PATH + 'co.png' : BASE_IMG_PATH + 'us.png';
            text.textContent = lang === 'es' ? 'ESP' : 'EN';
        }

        document.querySelectorAll('[data-es]').forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });
    }

    // Ejecutar
    initHeaderLogic();
})();