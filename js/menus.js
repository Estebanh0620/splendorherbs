const menuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const overlay = document.getElementById('menu-overlay');
const dropdowns = document.querySelectorAll('.dropdown');

// =======================
// 1. MENU MOVIL
// =======================
function toggleMobileMenu() {
    const isActive = navMenu.classList.contains('active');
    menuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = isActive ? 'auto' : 'hidden';
}

menuBtn?.addEventListener('click', toggleMobileMenu);
overlay?.addEventListener('click', () => {
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

    link?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isOpen = content.classList.contains('show');
        closeAllDropdowns();
        if (!isOpen) {
            content.classList.add('show');
            icon?.classList.add('rotate');
        }
    });

    dropdown.addEventListener('mouseenter', () => {
        if (window.innerWidth > 900) {
            closeAllDropdowns();
            content.classList.add('show');
            icon?.classList.add('rotate');
        }
    });
});

document.addEventListener('click', e => {
    if (!e.target.closest('.dropdown')) closeAllDropdowns();
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
        navMenu.classList.remove('active');
        menuBtn.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    closeAllDropdowns();
});

// =======================
// 3. IDIOMAS (SOLUCIÓN FINAL)
// =======================
const langEsBtn = document.getElementById('lang-es');
const langEnBtn = document.getElementById('lang-en');

const currentFlag = document.getElementById('current-lang-flag');
const currentText = document.getElementById('current-lang-text');

const translatableItems = document.querySelectorAll('[data-es][data-en]');

function applyLanguage(lang) {
    // Textos
    translatableItems.forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    // Bandera + texto
    if (currentFlag && currentText) {
        if (lang === 'es') {
            currentFlag.src = '/splendorherbs/img/co.png';
            currentText.textContent = 'ESP';
        } else {
            currentFlag.src = '/splendorherbs/img/us.png';
            currentText.textContent = 'EN';
        }
    }

    localStorage.setItem('language', lang);

    document.dispatchEvent(
        new CustomEvent('languageChanged', {
            detail: { language: lang }
        })
    );
}

// Click idioma
langEsBtn?.addEventListener('click', () => applyLanguage('es'));
langEnBtn?.addEventListener('click', () => applyLanguage('en'));

// Cargar idioma guardado
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'es';
    applyLanguage(savedLang);
});

// =======================
// 4. DROPDOWN DE IDIOMAS
// =======================
const langDropdown = document.querySelector('.language-dropdown');
const langSelectedBtn = document.querySelector('.lang-selected');

langSelectedBtn?.addEventListener('click', e => {
    e.stopPropagation();
    langDropdown.classList.toggle('active-lang');
});

document.addEventListener('click', e => {
    if (langDropdown && !langDropdown.contains(e.target)) {
        langDropdown.classList.remove('active-lang');
    }
});
