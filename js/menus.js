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

    // Seleccionamos elementos dinámicamente cada vez, por si el header se acaba de renderizar
    const currentFlag = document.getElementById('current-lang-flag');
    const currentText = document.getElementById('current-lang-text');

    // Traducir textos del Header
    // Al haber cambiado el HTML a <span>, esto ahora traduce solo el texto y respeta las flechas <i>
    const headerTranslatables = document.querySelectorAll('.header [data-es][data-en]');
    headerTranslatables.forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    // Actualizar Bandera y Texto
    if (currentFlag && currentText) {
        if (lang === 'es') {
            currentFlag.src = '/splendorherbs/img/co.png';
            currentText.textContent = 'ESP';
        } else {
            currentFlag.src = '/splendorherbs/img/us.png';
            currentText.textContent = 'EN';
        }
    }

    // Disparar evento global
    const event = new CustomEvent('languageChanged', { detail: { language: lang } });
    document.dispatchEvent(event);
}

// =======================
// 3. LISTENERS DE IDIOMA
// =======================
if (langEsBtn) langEsBtn.addEventListener('click', () => applyLanguage('es'));
if (langEnBtn) langEnBtn.addEventListener('click', () => applyLanguage('en'));

// Cargar idioma inicial al ejecutar el script
const savedLang = localStorage.getItem('language') || 'es';
// Aplicamos visualmente al header, pero sin disparar el evento global para evitar bucles infinitos al cargar
if (currentFlag && currentText) {
    if (savedLang === 'es') {
        currentFlag.src = '/splendorherbs/img/co.png';
        currentText.textContent = 'ESP';
    } else {
        currentFlag.src = '/splendorherbs/img/us.png';
        currentText.textContent = 'EN';
    }
}
// Traducir textos del header inmediatamente
document.querySelectorAll('.header [data-es][data-en]').forEach(el => {
    el.textContent = el.getAttribute(`data-${savedLang}`);
});


// =======================
// 4. MENU MOVIL
// =======================
function toggleMobileMenu() {
    if (!navMenu || !menuBtn) return;
    const isActive = navMenu.classList.contains('active');
    
    menuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    if(overlay) overlay.classList.toggle('active');
    
    document.body.style.overflow = isActive ? 'auto' : 'hidden';
}

if (menuBtn) menuBtn.addEventListener('click', toggleMobileMenu);
if (overlay) overlay.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) toggleMobileMenu();
});

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