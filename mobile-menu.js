// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing mobile menu...');
    
    const menuButton = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const html = document.documentElement;
    
    if (!menuButton || !nav) {
        console.error('Mobile menu elements not found!');
        return;
    }
    
    // Toggle menu function
    function toggleMenu(show) {
        const isOpen = nav.classList.contains('active');
        const shouldOpen = show !== undefined ? show : !isOpen;
        
        if (shouldOpen === isOpen) return;
        
        // Toggle classes
        nav.classList.toggle('active', shouldOpen);
        menuButton.classList.toggle('active', shouldOpen);
        
        // Update ARIA attributes
        menuButton.setAttribute('aria-expanded', shouldOpen);
        menuButton.setAttribute('aria-label', shouldOpen ? 'Menü bezárása' : 'Menü megnyitása');
        
        // Toggle body scroll
        if (shouldOpen) {
            html.style.overflow = 'hidden';
            // Focus on first link when opening
            setTimeout(() => {
                const firstLink = nav.querySelector('a');
                if (firstLink) firstLink.focus();
            }, 100);
        } else {
            html.style.overflow = '';
            // Return focus to menu button when closing
            menuButton.focus();
        }
        
        console.log('Menu toggled. isOpen:', shouldOpen);
    }
    
    // Event listeners
    function handleMenuButtonClick(e) {
        e.stopPropagation();
        e.preventDefault();
        console.log('Menu button clicked');
        toggleMenu();
    }
    
    function handleLinkClick() {
        if (window.innerWidth <= 768) {
            toggleMenu(false);
        }
    }
    
    function handleDocumentClick(e) {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !menuButton.contains(e.target)) {
            toggleMenu(false);
        }
    }
    
    function handleKeyDown(e) {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            e.preventDefault();
            toggleMenu(false);
        }
    }
    
    // Add event listeners
    menuButton.addEventListener('click', handleMenuButtonClick);
    navLinks.forEach(link => link.addEventListener('click', handleLinkClick));
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleKeyDown);
    
    console.log('Mobile menu initialized successfully!');
});
