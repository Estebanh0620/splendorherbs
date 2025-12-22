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

    if(menuBtn) menuBtn.addEventListener('click', toggleMobileMenu);
    if(overlay) overlay.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) toggleMobileMenu();
    });

    // 2. DROPDOWNS
    const closeDropdown = (content, icon) => {
        if(content) content.classList.remove('show');
        if(icon) { icon.classList.remove('rotate'); icon.style.transform = ''; }
    };

    const openDropdown = (content, icon) => {
        if(content) content.classList.add('show');
        if(icon) icon.classList.add('rotate');
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


