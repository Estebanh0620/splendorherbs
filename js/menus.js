/* js/menus.js - VERSIÓN FINAL PARA GITHUB PAGES */

// =======================
// 1. LÓGICA DE IDIOMA
// =======================
function applyLanguage(lang) {
    // 1. Guardar preferencia
    localStorage.setItem('language', lang);

    // 2. Actualizar textos VISIBLES (Header y Navegación)
    // Buscamos en todo el documento por si el header ya cargó
    const translatables = document.querySelectorAll('[data-es][data-en]');
    translatables.forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    // 3. Actualizar Bandera y Texto del Selector (Header)
    const currentFlag = document.getElementById('current-lang-flag');
    const currentText = document.getElementById('current-lang-text');
    
    // Rutas relativas absolutas para asegurar que cargue la imagen correcta
    // Usamos una ruta que funcione desde la raíz o subcarpetas si es absoluta,
    // pero para GitHub Pages es mejor asegurar la ruta base.
    // TRUCO: Detectamos si estamos en subcarpeta para la ruta de la imagen
    const isSubfolder = window.location.pathname.includes('/html/');
    const basePath = isSubfolder ? '../img/' : 'img/'; // Ajuste dinámico de ruta

    if (currentFlag && currentText) {
        if (lang === 'es') {
            currentFlag.src = basePath + 'co.png';
            currentText.textContent = 'ESP';
        } else {
            currentFlag.src = basePath + 'us.png';
            currentText.textContent = 'EN';
        }
    }

    // 4. AVISAR A LA PÁGINA (Disparar evento)
    // Esto hace que el formulario de contacto o los productos sepan que deben cambiar
    const event = new CustomEvent('languageChanged', { detail: { language: lang } });
    document.dispatchEvent(event);
}

// =======================
// 2. DETECTAR CLICS (Delegación de Eventos)
// =======================
// Esto soluciona el problema de que el botón "no existe" al cargar la página
document.addEventListener('click', (e) => {
    
    // --- IDIOMA ESPAÑOL ---
    const btnEs = e.target.closest('#lang-es');
    if (btnEs) {
        applyLanguage('es');
        closeLanguageDropdown();
    }

    // --- IDIOMA INGLÉS ---
    const btnEn = e.target.closest('#lang-en');
    if (btnEn) {
        applyLanguage('en');
        closeLanguageDropdown();
    }

    // --- ABRIR/CERRAR DROPDOWN IDIOMA ---
    const langSelector = e.target.closest('.lang-selected');
    if (langSelector) {
        e.stopPropagation();
        const dropdown = document.querySelector('.language-dropdown');
        if (dropdown) dropdown.classList.toggle('active-lang');
    }

    // --- MENÚ HAMBURGUESA (MÓVIL) ---
    const menuBtn = e.target.closest('#mobile-menu-btn');
    if (menuBtn) {
        const navMenu = document.querySelector('.nav-menu');
        const overlay = document.getElementById('menu-overlay');
        
        menuBtn.classList.toggle('active');
        if (navMenu) navMenu.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
        
        // Bloquear scroll
        if (navMenu && navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }
});

// Cerrar dropdowns si hago clic fuera
document.addEventListener('click', (e) => {
    const langDropdown = document.querySelector('.language-dropdown');
    if (langDropdown && !e.target.closest('.language-dropdown')) {
        langDropdown.classList.remove('active-lang');
    }
    
    // Cerrar menú móvil al tocar el overlay
    const overlay = document.getElementById('menu-overlay');
    if (e.target === overlay) {
        document.querySelector('.nav-menu').classList.remove('active');
        document.getElementById('mobile-menu-btn').classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

function closeLanguageDropdown() {
    const dropdown = document.querySelector('.language-dropdown');
    if(dropdown) dropdown.classList.remove('active-lang');
}

// =======================
// 3. INICIALIZAR AL CARGAR
// =======================
// Intentamos aplicar el idioma guardado apenas se pueda
setTimeout(() => {
    const savedLang = localStorage.getItem('language') || 'es';
    applyLanguage(savedLang);
}, 100); // Pequeño retraso para dar tiempo al Header a aparecer