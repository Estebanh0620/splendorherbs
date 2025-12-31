/* menus.js */

// Seleccionamos elementos
const menuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const overlay = document.getElementById('menu-overlay');
const dropdowns = document.querySelectorAll('.dropdown');

// =======================
// 1. MENU MOVIL
// =======================
function toggleMobileMenu() {
    // Verificamos si existe el menu antes de actuar
    if (!navMenu || !menuBtn || !overlay) return;

    const isActive = navMenu.classList.contains('active');
    menuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = isActive ? 'auto' : 'hidden';
}

if (menuBtn) menuBtn.addEventListener('click', toggleMobileMenu);
if (overlay) overlay.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) toggleMobileMenu();
});

// =======================
// 2. DROPDOWNS
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
            // Solo prevenimos default si es móvil (pantalla pequeña)
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

    // Hover para desktop
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
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    closeAllDropdowns();
});

// =======================
// 3. IDIOMAS
// =======================
const langEsBtn = document.getElementById('lang-es');
const langEnBtn = document.getElementById('lang-en');

// Estos IDs ahora SI existen en el HTML corregido
const currentFlag = document.getElementById('current-lang-flag');
const currentText = document.getElementById('current-lang-text');

const translatableItems = document.querySelectorAll('[data-es][data-en]');

function applyLanguage(lang) {
    // Actualizar Textos de la página
    translatableItems.forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    // Actualizar Bandera y Texto del Header
    if (currentFlag && currentText) {
        if (lang === 'es') {
            currentFlag.src = '/splendorherbs/img/co.png';
            currentText.textContent = 'ESP';
        } else {
            currentFlag.src = '/splendorherbs/img/us.png';
            currentText.textContent = 'EN';
        }
    }

    // Guardar preferencia
    localStorage.setItem('language', lang);
}

// Event Listeners para botones de idioma
if (langEsBtn) langEsBtn.addEventListener('click', () => applyLanguage('es'));
if (langEnBtn) langEnBtn.addEventListener('click', () => applyLanguage('en'));

// Ejecutar inmediatamente al cargar el script (porque el HTML ya se inyectó)
const savedLang = localStorage.getItem('language') || 'es';
applyLanguage(savedLang);

// =======================
// 4. DROPDOWN DE IDIOMAS
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