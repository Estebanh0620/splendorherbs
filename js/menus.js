document.addEventListener('DOMContentLoaded', () => {

    // =======================
    // 1. SELECCIÓN DE ELEMENTOS
    // =======================
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.getElementById('menu-overlay');
    
    // =======================
    // 2. IDIOMA (Lógica mantenida)
    // =======================
    const langEsBtn = document.getElementById('lang-es');
    const langEnBtn = document.getElementById('lang-en');

    function applyLanguage(lang) {
        localStorage.setItem('language', lang);
        const currentFlag = document.getElementById('current-lang-flag');
        const currentText = document.getElementById('current-lang-text');

        if (currentFlag && currentText) {
            if (lang === 'es') {
                currentFlag.src = '/img/co.png';
                currentText.textContent = 'ESP';
            } else {
                currentFlag.src = '/img/us.png';
                currentText.textContent = 'EN';
            }
        }
        document.querySelectorAll('[data-es][data-en]').forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });
    }

    if (langEsBtn) langEsBtn.addEventListener('click', () => applyLanguage('es'));
    if (langEnBtn) langEnBtn.addEventListener('click', () => applyLanguage('en'));

    const savedLang = localStorage.getItem('language') || 'es';
    const initFlag = document.getElementById('current-lang-flag');
    const initText = document.getElementById('current-lang-text');

    if (initFlag && initText) {
        if (savedLang === 'es') {
            initFlag.src = '/img/co.png';
            initText.textContent = 'ESP';
        } else {
            initFlag.src = 'img/us.png';
            initText.textContent = 'EN';
        }
    }
    document.querySelectorAll('[data-es][data-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-${savedLang}`);
    });

    // Dropdown de idiomas UI
    const langDropdown = document.querySelector('.language-dropdown');
    const langSelectedBtn = document.querySelector('.lang-selected');

    if (langSelectedBtn) {
        langSelectedBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (langDropdown) langDropdown.classList.toggle('active-lang');
        });
    }
    document.addEventListener('click', (e) => {
        if (langDropdown && !langDropdown.contains(e.target)) {
            langDropdown.classList.remove('active-lang');
        }
    });

    // =======================
    // 3. MENU MOVIL
    // =======================
    function toggleMobileMenu() {
        if (!navMenu || !menuBtn) return;
        const isActive = navMenu.classList.contains('active');
        
        menuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        if(overlay) overlay.classList.toggle('active');
        
        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
        document.body.style.overflow = isActive ? 'auto' : 'hidden';
    }

    if (menuBtn) menuBtn.addEventListener('click', toggleMobileMenu);
    if (overlay) overlay.addEventListener('click', toggleMobileMenu);


    // =======================
    // 4. DROPDOWNS (SOLUCIÓN DEFINITIVA)
    // =======================
    const closeAllDropdowns = () => {
        document.querySelectorAll('.dropdown-content').forEach(c => c.classList.remove('show'));
        document.querySelectorAll('.arrow-icon').forEach(i => i.classList.remove('rotate'));
    };

    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const content = item.querySelector('.dropdown-content');
        const icon = item.querySelector('.arrow-icon');

        if (link && content) {
            // --- CLICK (Móvil y Tablet) ---
            link.addEventListener('click', (e) => {
                // Solo activamos click si es pantalla menor a 1240px
                if (window.innerWidth <= 1240) {
                    e.preventDefault(); // Evita recargar o saltar
                    e.stopPropagation(); // Evita burbujeo

                    const isOpen = content.classList.contains('show');
                    
                    // Comenta la siguiente línea si quieres permitir múltiples menús abiertos a la vez
                    closeAllDropdowns(); 

                    if (!isOpen) {
                        content.classList.add('show');
                        if (icon) icon.classList.add('rotate');
                    }
                }
            });

            // --- HOVER (Escritorio) ---
            item.addEventListener('mouseenter', () => {
                if (window.innerWidth > 1240) {
                    closeAllDropdowns();
                    content.classList.add('show');
                    if (icon) icon.classList.add('rotate');
                }
            });

            item.addEventListener('mouseleave', () => {
                if (window.innerWidth > 1240) {
                    content.classList.remove('show');
                    if (icon) icon.classList.remove('rotate');
                }
            });
        }
    });

    // Cerrar al dar click fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-item')) {
            closeAllDropdowns();
        }
    });
});