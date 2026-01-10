// js/menus.js

// Aceptamos un parámetro pathPrefix para arreglar rutas de imágenes
window.iniciarMenu = function(pathPrefix = 'img/') {
    console.log("Iniciando menú...");

    const menuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.getElementById('menu-overlay');
    const dropdowns = document.querySelectorAll('.dropdown');

    // 1. Menú Hamburguesa
    if (menuBtn && navMenu) {
        menuBtn.onclick = function() {
            menuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            if (overlay) overlay.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        };
    }

    if (overlay) {
        overlay.onclick = function() {
            if(menuBtn) menuBtn.classList.remove('active');
            if(navMenu) navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        };
    }

    // 2. Submenús (Dropdowns) para Móvil
    dropdowns.forEach(d => {
        const link = d.querySelector('.nav-link');
        const content = d.querySelector('.dropdown-content');
        const icon = d.querySelector('.arrow-icon');

        if (link && content) {
            link.onclick = function(e) {
                // Solo prevenimos la navegación y abrimos el menú si estamos en móvil
                if (window.innerWidth <= 1024) {
                    e.preventDefault(); 
                    content.classList.toggle('show');
                    if (icon) icon.classList.toggle('rotate');
                }
            };
        }
    });

    // 3. Idioma
    initLanguage(pathPrefix);
};

function initLanguage(basePath) {
    const langEs = document.getElementById('lang-es');
    const langEn = document.getElementById('lang-en');
    const dropdown = document.querySelector('.language-dropdown');
    const selectedBtn = document.querySelector('.lang-selected');

    if (selectedBtn && dropdown) {
        selectedBtn.onclick = (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active-lang');
        };

        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active-lang');
            }
        });
    }

    // Aseguramos que la ruta no tenga // dobles
    const cleanPath = basePath.endsWith('/') ? basePath : basePath + '/';

    if (langEs) langEs.onclick = () => changeLang('es', cleanPath);
    if (langEn) langEn.onclick = () => changeLang('en', cleanPath);

    const saved = localStorage.getItem('language') || 'es';
    changeLang(saved, cleanPath);
}

function changeLang(lang, basePath) {
    localStorage.setItem('language', lang);
    
    const flag = document.getElementById('current-lang-flag');
    const text = document.getElementById('current-lang-text');
    const dropdown = document.querySelector('.language-dropdown');

    if (flag && text) {
        // Usa la ruta dinámica para encontrar la imagen correcta
        flag.src = lang === 'es' ? basePath + 'co.png' : basePath + 'us.png';
        text.textContent = lang === 'es' ? 'ESP' : 'EN';
    }

    document.querySelectorAll('[data-es]').forEach(el => {
        const newText = el.getAttribute(`data-${lang}`);
        if(newText) el.textContent = newText;
    });

    if(dropdown) dropdown.classList.remove('active-lang');
}