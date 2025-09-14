// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay') || document.createElement('div');
    
    // Create overlay if it doesn't exist
    if (!document.querySelector('.mobile-menu-overlay')) {
        mobileMenuOverlay.className = 'mobile-menu-overlay';
        document.body.appendChild(mobileMenuOverlay);
    }

    // Toggle mobile menu
    function toggleMenu() {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true' || false;
        const scrollY = window.scrollY;
        
        // Toggle menu state
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        
        // Toggle body scroll
        if (isExpanded) {
            // Close menu
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(document.body.style.getPropertyValue('--scroll-y') || '0') * -1);
            document.body.style.removeProperty('--scroll-y');
        } else {
            // Open menu
            document.body.style.setProperty('--scroll-y', `${window.scrollY}`);
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
        }
    }

    // Close menu when clicking outside or on a link
    function closeMenu(e) {
        const isClickInsideNav = nav.contains(e.target);
        const isClickOnMenuBtn = mobileMenuBtn.contains(e.target);
        
        if (!isClickInsideNav && !isClickOnMenuBtn) {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        }
    }

    // Event Listeners
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    mobileMenuOverlay.addEventListener('click', function(e) {
        if (nav.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Close menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                toggleMenu();
            }
        });
    });

    // Close menu when changing language
    document.addEventListener('click', function(e) {
        if (e.target.closest('.language-btn')) {
            if (window.innerWidth <= 992 && nav.classList.contains('active')) {
                toggleMenu();
            }
        }
    });

    // Handle window resize
    function handleResize() {
        if (window.innerWidth > 992) {
            // Reset menu on desktop
            const scrollY = document.body.style.top;
            nav.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
                document.body.style.removeProperty('--scroll-y');
            }
        }
    }

    // Initialize
    window.addEventListener('resize', handleResize);
    document.addEventListener('click', closeMenu);
});
