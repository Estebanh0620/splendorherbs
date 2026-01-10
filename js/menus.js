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
// 5. DROPDOWNS (CORREGIDO PARA MÓVIL)
// =======================
const closeAllDropdowns = () => {
    // Cierra todos los contenidos
    document.querySelectorAll('.dropdown-content').forEach(c => c.classList.remove('show'));
    // Resetea todas las flechas
    document.querySelectorAll('.arrow-icon').forEach(i => {
        i.classList.remove('rotate');
    });
};

// Seleccionamos TODOS los items de navegación, no solo los que tengan clase .dropdown
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const content = item.querySelector('.dropdown-content');
    const icon = item.querySelector('.arrow-icon');

    // Solo aplicamos lógica si este item realmente tiene un submenú (content)
    if (link && content) {
        
        // Evento Click (Principal para Móviles/Tablets)
        link.addEventListener('click', (e) => {
            // Verificamos si estamos en resolución móvil/tablet (según tu breakpoint 1240px)
            if (window.innerWidth <= 1240) {
                // Prevenir que el enlace navegue a otra página
                e.preventDefault();
                e.stopPropagation();

                const isOpen = content.classList.contains('show');

                // Primero cerramos todo para efecto acordeón (opcional, si quieres que se cierre uno al abrir otro)
                closeAllDropdowns();

                // Si no estaba abierto, lo abrimos ahora
                if (!isOpen) {
                    content.classList.add('show');
                    if (icon) icon.classList.add('rotate');
                }
            }
        });

        // Evento Mouseenter (Solo para lógica de escritorio si se requiere soporte híbrido)
        item.addEventListener('mouseenter', () => {
            if (window.innerWidth > 1240) {
                closeAllDropdowns();
                content.classList.add('show');
                if (icon) icon.classList.add('rotate');
            }
        });
        
        // Evento Mouseleave (Para escritorio)
        item.addEventListener('mouseleave', () => {
             if (window.innerWidth > 1240) {
                content.classList.remove('show');
                if (icon) icon.classList.remove('rotate');
             }
        });
    }
});

// Cerrar menús si se hace clic fuera
document.addEventListener('click', (e) => {
    // Si el clic NO fue dentro de un nav-item, cerramos todo
    if (!e.target.closest('.nav-item')) {
        closeAllDropdowns();
    }
});

// Limpieza al redimensionar pantalla
window.addEventListener('resize', () => {
    if (window.innerWidth > 1240) {
        // En escritorio reseteamos estilos inline o clases móviles si fuera necesario
        // Pero mantenemos la lógica de hover CSS nativa
    } else {
        // En móvil nos aseguramos que no queden estados "a medias"
    }
    // Opcional: Cerrar al cambiar de tamaño drásticamente
    // closeAllDropdowns(); 
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