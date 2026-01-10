// js/menus.js

// Definimos la función en el objeto window para que sea global
window.iniciarMenu = function() {
    console.log("Iniciando lógica del menú..."); 

    // Ajusta esto si tu proyecto está en una subcarpeta (ej: '/mi-proyecto/img/')
    // Si estás en la raíz, déjalo como '/img/'
    const BASE_IMG_PATH = '/img/'; 

    const menuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.getElementById('menu-overlay');

    // Verificación de seguridad
    if (!menuBtn || !navMenu) {
        console.error("Error: No se encontró el botón o el menú. Verifica que el HTML del header ya cargó.");
        return;
    }

    // --- Lógica Menú Móvil ---
    // Clonamos el nodo para eliminar listeners previos si la función se llama dos veces
    const newMenuBtn = menuBtn.cloneNode(true);
    menuBtn.parentNode.replaceChild(newMenuBtn, menuBtn);
    
    newMenuBtn.addEventListener('click', () => {
        newMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    if (overlay) {
        overlay.addEventListener('click', () => {
            newMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // --- Dropdowns Móvil ---
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(d => {
        const link = d.querySelector('.nav-link');
        const content = d.querySelector('.dropdown-content');
        const icon = d.querySelector('.arrow-icon');

        if (link) {
            // Removemos listeners viejos clonando
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            newLink.addEventListener('click', (e) => {
                // Solo activamos click en móvil (pantallas < 900px o según tu CSS)
                if (window.innerWidth <= 1024) { 
                    e.preventDefault();
                    content.classList.toggle('show');
                    if (icon) icon.classList.toggle('rotate');
                }
            });
        }
    });

    // --- Lógica de Idioma ---
    initLanguage(BASE_IMG_PATH);
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
        document.onclick = () => dropdown.classList.remove('active-lang');
    }

    if (langEs) langEs.onclick = () => changeLang('es', basePath);
    if (langEn) langEn.onclick = () => changeLang('en', basePath);

    const saved = localStorage.getItem('language') || 'es';
    changeLang(saved, basePath);
}

function changeLang(lang, basePath) {
    localStorage.setItem('language', lang);
    
    const flag = document.getElementById('current-lang-flag');
    const text = document.getElementById('current-lang-text');

    if (flag && text) {
        flag.src = lang === 'es' ? basePath + 'co.png' : basePath + 'us.png';
        text.textContent = lang === 'es' ? 'ESP' : 'EN';
    }

    document.querySelectorAll('[data-es]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });
}