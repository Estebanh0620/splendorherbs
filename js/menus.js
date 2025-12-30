const menuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const overlay = document.getElementById('menu-overlay');
const dropdowns = document.querySelectorAll('.dropdown');

// 1. MENU MOVIL
function toggleMobileMenu() {
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

// 2. DROPDOWNS
const closeDropdown = (content, icon) => {
    if (content) content.classList.remove('show');
    if (icon) { icon.classList.remove('rotate'); icon.style.transform = ''; }
};

const openDropdown = (content, icon) => {
    if (content) content.classList.add('show');
    if (icon) icon.classList.add('rotate');
};

const closeAllDropdowns = () => {
    document.querySelectorAll('.dropdown-content').forEach(c => c.classList.remove('show'));
    document.querySelectorAll('.arrow-icon').forEach(i => { i.classList.remove('rotate'); i.style.transform = ''; });
};

dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.nav-link');
    const content = dropdown.querySelector('.dropdown-content');
    const icon = dropdown.querySelector('.arrow-icon');
    let hoverJustOpened = false;

    link.addEventListener('click', (e) => {
        e.preventDefault(); e.stopPropagation();
        if (hoverJustOpened) return;

        const isCurrentlyOpen = content.classList.contains('show');
        if (isCurrentlyOpen) closeDropdown(content, icon);
        else { closeAllDropdowns(); openDropdown(content, icon); }
    });

    // Hover solo en PC
    dropdown.addEventListener('mouseenter', () => {
        if (window.innerWidth > 900) {
            if (!content.classList.contains('show')) {
                closeAllDropdowns();
                openDropdown(content, icon);
                hoverJustOpened = true;
                setTimeout(() => { hoverJustOpened = false; }, 300);
            }
        }
    });
});

document.addEventListener('click', (e) => {
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

// 3. GESTION DE IDIOMAS
const langEsBtn = document.getElementById('lang-es');
const langEnBtn = document.getElementById('lang-en');

// Todos los elementos que tienen traducciones
const translatableItems = document.querySelectorAll('[data-es][data-en]');
const currentLangDisplay = document.getElementById('current-lang-display');

// Función A: Solo actualiza la parte VISUAL (Textos, Banderas, Clases)
// Esta función se ejecuta cada vez que la página carga
function applyLanguageToDom(lang) {
    // 1. Actualizar textos estáticos
    translatableItems.forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    // 2. Actualizar el visor del dropdown
    const imgSrc = lang === 'es' ? '/img/co.png' : '/img/us.png';
    const textCode = lang === 'es' ? 'ESP' : 'EN';
    
    if (currentLangDisplay) {
        currentLangDisplay.innerHTML = `<img src="${imgSrc}" alt="${textCode}"> <span>${textCode}</span>`;
    }

    // 3. Actualizar botones activos
    if (lang === 'es') {
        langEsBtn?.classList.add('active');
        langEnBtn?.classList.remove('active');
    } else {
        langEnBtn?.classList.add('active');
        langEsBtn?.classList.remove('active');
    }

    // 4. Disparar evento (útil si tienes otros scripts escuchando)
    document.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language: lang } 
    }));
}

// Función B: Maneja el CLICK del usuario (Guarda y Recarga)
function handleLanguageChange(newLang) {
    const currentLang = localStorage.getItem('language');

    // Solo recargamos si el idioma seleccionado es diferente al actual
    if (currentLang !== newLang) {
        localStorage.setItem('language', newLang);
        window.location.reload(); // <--- AQUÍ OCURRE LA RECARGA
    }
}

// Event Listeners: Llaman a la función de cambio y recarga
langEsBtn?.addEventListener('click', () => handleLanguageChange('es'));
langEnBtn?.addEventListener('click', () => handleLanguageChange('en'));

// INICIALIZACIÓN:
// Al cargar la página (o después del reload), leemos el idioma y aplicamos los cambios visuales
const savedLang = localStorage.getItem('language') || 'es';
applyLanguageToDom(savedLang);


// --- Lógica del Dropdown de Idiomas (se mantiene igual) ---
const langDropdown = document.querySelector('.language-dropdown');
const langSelectedBtn = document.querySelector('.lang-selected');

if (langSelectedBtn) {
    langSelectedBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('active-lang');
    });
}

const langOptions = document.querySelectorAll('.lang-option');
langOptions.forEach(option => {
    option.addEventListener('click', () => {
        langDropdown.classList.remove('active-lang');
    });
});

document.addEventListener('click', (e) => {
    if (langDropdown && !langDropdown.contains(e.target)) {
        langDropdown.classList.remove('active-lang');
    }
});