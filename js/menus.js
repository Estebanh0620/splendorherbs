/* menus.js - VERSIÓN DEFINITIVA Y DINÁMICA */

(function() {
    // =======================
    // 1. DETECCIÓN AUTOMÁTICA DE RUTA
    // =======================
    // Si la URL contiene '/html/', estamos en una subcarpeta, usamos '../img/'
    // Si no, estamos en la raíz, usamos 'img/' (o '/img/' si usas servidor absoluto)
    const isSubFolder = window.location.pathname.includes('/html/');
    const imgPath = isSubFolder ? '../img/' : 'img/'; 

    // =======================
    // 2. INICIALIZACIÓN
    // =======================
    function initHeaderLogic() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        const overlay = document.getElementById('menu-overlay');
        const dropdowns = document.querySelectorAll('.dropdown');
        const langEsBtn = document.getElementById('lang-es');
        const langEnBtn = document.getElementById('lang-en');

        // Listeners de idioma
        if (langEsBtn) langEsBtn.addEventListener('click', () => applyLanguage('es'));
        if (langEnBtn) langEnBtn.addEventListener('click', () => applyLanguage('en'));

        // Menú Móvil
        if (menuBtn) {
            menuBtn.addEventListener('click', () => {
                const isActive = navMenu.classList.contains('active');
                menuBtn.classList.toggle('active');
                navMenu.classList.toggle('active');
                if (overlay) overlay.classList.toggle('active');
                document.body.style.overflow = isActive ? 'auto' : 'hidden';
            });
        }
        
        if (overlay) overlay.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) menuBtn.click();
        });

        // Idioma inicial
        const savedLang = localStorage.getItem('language') || 'es';
        applyLanguage(savedLang);

        // Dropdowns
        initDropdowns(dropdowns);
    }

    // =======================
    // 3. FUNCIÓN DE IDIOMA (Con ruta corregida)
    // =======================
    function applyLanguage(lang) {
        localStorage.setItem('language', lang);

        const currentFlag = document.getElementById('current-lang-flag');
        const currentText = document.getElementById('current-lang-text');

        if (currentFlag && currentText) {
            // Usamos la variable imgPath calculada arriba
            if (lang === 'es') {
                currentFlag.src = imgPath + 'co.png';
                currentText.textContent = 'ESP';
            } else {
                currentFlag.src = imgPath + 'us.png';
                currentText.textContent = 'EN';
            }
        }

        // Traducir textos
        document.querySelectorAll('[data-es][data-en]').forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });
    }

    function initDropdowns(dropdowns) {
        // (Mantén tu lógica de dropdowns aquí igual que antes, está bien)
        const closeAllDropdowns = () => {
            document.querySelectorAll('.dropdown-content').forEach(c => c.classList.remove('show'));
            document.querySelectorAll('.arrow-icon').forEach(i => {
                i.classList.remove('rotate');
                i.style.transform = '';
            });
        };
        // ... resto de tu lógica de dropdowns ...
        
        // Lógica del selector de idioma (Dropdown)
        const langBtn = document.querySelector('.lang-selected');
        const langDrop = document.querySelector('.language-dropdown');
        if(langBtn && langDrop){
             langBtn.addEventListener('click', (e) => {
                 e.stopPropagation();
                 langDrop.classList.toggle('active-lang');
             });
             document.addEventListener('click', e => {
                 if(!langDrop.contains(e.target)) langDrop.classList.remove('active-lang');
             });
        }
    }

    // Ejecutar inmediatamente
    initHeaderLogic();
})();