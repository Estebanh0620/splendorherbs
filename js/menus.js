// =======================
// 1. SELECCIÓN DE ELEMENTOS
// =======================
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

    const allElements = document.querySelectorAll('[data-es][data-en]');
    allElements.forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    const event = new CustomEvent('languageChanged', { detail: { language: lang } });
    document.dispatchEvent(event);
}

// =======================
// 3. LISTENERS DE IDIOMA & CARGA INICIAL
// =======================
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
    
    // --- LÓGICA PARA CAMBIAR EL ÍCONO ---
    const icon = menuBtn.querySelector('i');
    if (icon) {
        if (menuBtn.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times'); // Cambia a X
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars'); // Vuelve a barras
        }
    }

    document.body.style.overflow = isActive ? 'auto' : 'hidden';
}

// --- ¡AQUÍ ESTÁ LA CORRECCIÓN! FALTABA DETECTAR EL CLIC ---
if (menuBtn) {
    menuBtn.addEventListener('click', toggleMobileMenu);
}
// También detecta si el usuario hace clic fuera del menú (en el fondo oscuro) para cerrarlo
if (overlay) {
    overlay.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) toggleMobileMenu();
    });
}
// -----------------------------------------------------------

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
            // El menú móvil se activa a los 1240px
            if (window.innerWidth <= 1240) {
                e.preventDefault();
                e.stopPropagation();
                const isOpen = content.classList.contains('show');
                
                // Cierra los otros submenús si abres uno nuevo
                closeAllDropdowns(); 

                if (!isOpen) {
                    content.classList.add('show');
                    if (icon) icon.classList.add('rotate');
                }
            }
        });
    }

    dropdown.addEventListener('mouseenter', () => {
        if (window.innerWidth > 1240 && content) {
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
        if (menuBtn) {
            menuBtn.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            if(icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
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