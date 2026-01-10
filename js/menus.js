// js/menus.js

// Definimos la función globalmente
window.iniciarMenu = function() {
    console.log("Iniciando lógica del menú corregida..."); 

    // Configuración
    const BASE_IMG_PATH = '/img/'; 

    // Selectores
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.getElementById('menu-overlay');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Validación
    if (!menuBtn || !navMenu) {
        console.warn("Elementos del menú no encontrados. ¿El HTML cargó correctamente?");
        return;
    }

    // --- 1. Lógica Menú Móvil (Hamburguesa) ---
    // No usamos cloneNode, simplemente asignamos el evento onclick para evitar acumulaciones
    menuBtn.onclick = function() {
        menuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
        
        // Bloquear scroll del body cuando el menú está abierto
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    };

    // Cerrar al dar click en el overlay (fondo oscuro)
    if (overlay) {
        overlay.onclick = function() {
            cerrarMenuMovil();
        };
    }

    function cerrarMenuMovil() {
        menuBtn.classList.remove('active');
        navMenu.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // --- 2. Lógica Dropdowns (Desplegables) ---
    dropdowns.forEach(d => {
        const link = d.querySelector('.nav-link');
        const content = d.querySelector('.dropdown-content');
        const icon = d.querySelector('.arrow-icon');

        if (link && content) {
            link.onclick = function(e) {
                // Si la pantalla es pequeña (Móvil/Tablet)
                if (window.innerWidth <= 1024) {
                    e.preventDefault(); // Evita navegar si es un link
                    content.classList.toggle('show');
                    if (icon) icon.classList.toggle('rotate');
                } 
                // Si es Desktop, dejamos que el CSS (:hover) se encargue, 
                // o si quieres clic en desktop también, quita el 'if' de arriba.
            };
        }
    });

    // --- 3. Lógica de Idioma ---
    initLanguage(BASE_IMG_PATH);
};

function initLanguage(basePath) {
    const langEs = document.getElementById('lang-es');
    const langEn = document.getElementById('lang-en');
    const dropdown = document.querySelector('.language-dropdown');
    const selectedBtn = document.querySelector('.lang-selected');

    if (selectedBtn && dropdown) {
        // Toggle del menú de idiomas
        selectedBtn.onclick = (e) => {
            e.stopPropagation(); // Evita que el click se propague al documento
            dropdown.classList.toggle('active-lang');
        };

        // Cerrar menú de idioma al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active-lang');
            }
        });
    }

    if (langEs) langEs.onclick = () => changeLang('es', basePath);
    if (langEn) langEn.onclick = () => changeLang('en', basePath);

    // Cargar idioma guardado
    const saved = localStorage.getItem('language') || 'es';
    changeLang(saved, basePath);
}

function changeLang(lang, basePath) {
    localStorage.setItem('language', lang);
    
    const flag = document.getElementById('current-lang-flag');
    const text = document.getElementById('current-lang-text');
    const dropdown = document.querySelector('.language-dropdown');

    if (flag && text) {
        flag.src = lang === 'es' ? basePath + 'co.png' : basePath + 'us.png';
        text.textContent = lang === 'es' ? 'ESP' : 'EN';
    }

    // Cambiar textos en la página (busca elementos con data-es y data-en)
    document.querySelectorAll('[data-es]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    // Cerrar el dropdown después de elegir
    if(dropdown) dropdown.classList.remove('active-lang');
}