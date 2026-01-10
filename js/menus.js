/* menus.js */

// =======================
// 1. SELECCIÓN DE ELEMENTOS
// =======================
// Usamos funciones getters o búsqueda dinámica dentro de applyLanguage
// para asegurar que el elemento existe tras la carga asíncrona del header.

const menuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const overlay = document.getElementById('menu-overlay');
const dropdowns = document.querySelectorAll('.dropdown');

const langEsBtn = document.getElementById('lang-es');
const langEnBtn = document.getElementById('lang-en');

// =======================
// 2. FUNCIÓN PRINCIPAL DE IDIOMA
// =======================
function applyLanguage(lang) {
    localStorage.setItem('language', lang);

    // Actualizar Bandera y Texto (Si existen en el header)
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

    // ------------------------------------------------------
    // AQUÍ ESTÁ LA CLAVE: 
    // Usamos `document` sin especificar clase padre.
    // Esto busca en Header, Main, Footer y cualquier otro lugar.
    // ------------------------------------------------------
    const allElements = document.querySelectorAll('[data-es][data-en]');
    
    allElements.forEach(el => {
        // Aplica la traducción a cada elemento encontrado
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    // Disparar evento global (opcional, por si usas otros scripts)
    const event = new CustomEvent('languageChanged', { detail: { language: lang } });
    document.dispatchEvent(event);
}

// =======================
// 3. LISTENERS DE IDIOMA
// =======================
if (langEsBtn) langEsBtn.addEventListener('click', () => applyLanguage('es'));
if (langEnBtn) langEnBtn.addEventListener('click', () => applyLanguage('en'));

// =======================
// CARGA INICIAL
// =======================
// Obtener idioma guardado o usar español por defecto
const savedLang = localStorage.getItem('language') || 'es';

// Aplicar visualmente los iconos del header (Bandera/Texto)
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

// Ejecutar la traducción inmediatamente al cargar
// Nuevamente: busca en TODO el documento (Header + Main)
document.querySelectorAll('[data-es][data-en]').forEach(el => {
    el.textContent = el.getAttribute(`data-${savedLang}`);
});


// =======================
// 4. MENU MOVIL
// =======================
function toggleMobileMenu() {
    if (!navMenu || !menuBtn) return;
    const isActive = navMenu.classList.contains('active');
    
    // Toggling clases
    menuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    if(overlay) overlay.classList.toggle('active');
    
    // --- LÓGICA AGREGADA PARA CAMBIAR EL ÍCONO ---
    const icon = menuBtn.querySelector('i');
    if (menuBtn.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times'); // Cambia a X
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars'); // Vuelve a barras
    }
    // ---------------------------------------------

    document.body.style.overflow = isActive ? 'auto' : 'hidden';
}

// =======================
// 5. DROPDOWNS
// =======================
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
            if (window.innerWidth <= 1240) {
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
    if (window.innerWidth > 1240) {
        if (navMenu) navMenu.classList.remove('active');
        if (menuBtn) menuBtn.classList.remove('active');
        if(overlay) overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    closeAllDropdowns();
});

// =======================
// 6. DROPDOWN DE IDIOMAS (UI)
// =======================
const langDropdown = document.querySelector('.language-dropdown');
const langSelectedBtn = document.querySelector('.lang-selected');

if (langSelectedBtn) {
    langSelectedBtn.addEventListener('click', e => {
        e.stopPropagation();
        if (langDropdown) langDropdown.classList.toggle('active-lang');
    });
}

document.addEventListener('click', e => {
    if (langDropdown && !langDropdown.contains(e.target)) {
        langDropdown.classList.remove('active-lang');
    }
});