// Main script (migrated from root script.js) + cookie consent + mobile menu

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href) return;
        // Only prevent default for internal anchor links (starting with #)
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        // External links will work normally
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(26, 26, 26, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
});

// Animate stats numbers
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const numeric = parseFloat(stat.textContent);
        const target = isNaN(numeric) ? 0 : numeric;
        const increment = target / 100 || 0;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            if (stat.textContent.includes('+')) {
                stat.textContent = Math.floor(current) + '+';
            } else if (stat.textContent.includes('.')) {
                stat.textContent = current.toFixed(1);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// Intersection Observer for animations
const observerOptions = { threshold: 0.3, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            if (entry.target.classList.contains('stats')) {
                animateStats();
            }
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .skill-item, .stat-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    const statsSection = document.querySelector('.stats');
    if (statsSection) observer.observe(statsSection);

    // CTA Button click handler
    const ctaButton = document.querySelector('.cta-button');
    const projectsSection = document.querySelector('#projects');
    if (ctaButton && projectsSection) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // Lazy load images (if data-src present)
    const images = document.querySelectorAll('img[data-src]');
    if (images.length) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        images.forEach(img => imageObserver.observe(img));
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) backToTopBtn.classList.add('show');
            else backToTopBtn.classList.remove('show');
        });
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Mobile menu toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    if (mobileBtn && nav) {
        mobileBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
        // Close on link click (mobile)
        nav.querySelectorAll('.nav-link').forEach(a => a.addEventListener('click', () => {
            nav.classList.remove('active');
        }));
    }

    // Cookie consent
    initCookieConsent();
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image .image-placeholder');
    if (heroImage) heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
});

// Hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
        this.style.boxShadow = '0 20px 40px rgba(0, 212, 170, 0.2)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    });
});

document.querySelectorAll('.cta-button, .view-all-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 30px rgba(0, 212, 170, 0.6)';
    });
    btn.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// Cookie consent implementation
function initCookieConsent() {
    const banner = document.getElementById('cookieBanner');
    if (!banner) return;
    const accepted = localStorage.getItem('cookie_consent');
    if (!accepted) {
        banner.classList.add('show');
    }
    const acceptBtn = document.getElementById('cookieAccept');
    const denyBtn = document.getElementById('cookieDeny');
    if (acceptBtn) acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'accepted');
        banner.classList.remove('show');
    });
    if (denyBtn) denyBtn.addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'denied');
        banner.classList.remove('show');
    });
}

// Expose global scrollToTop for header image click
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Bind UI events without inline handlers
document.addEventListener('DOMContentLoaded', () => {
    // Header image click -> scroll top
    const headerImg = document.querySelector('.header-image');
    if (headerImg) {
        headerImg.style.cursor = 'pointer';
        headerImg.addEventListener('click', scrollToTop);
    }

    // Contact form demo submit
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Űrlap elküldve! (Demo verzió)');
        });
    }
});

