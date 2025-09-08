// Lightbox functionality for project images
function initLightbox() {
    console.log('Initializing lightbox...');
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentGallery = '';
    let currentIndex = 0;
    let images = [];
    
    // Function to show image in lightbox
    function showImage(index) {
        if (images.length === 0) return;
        
        currentIndex = index;
        const img = images[currentIndex];
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        if (lightboxTitle) {
            lightboxTitle.textContent = img.dataset.title || img.alt;
        }
    }
    
    // Next/previous image navigation
    function showNext() {
        if (images.length === 0) return;
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }
    
    function showPrev() {
        if (images.length === 0) return;
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }
    
    // Click handler for project images
    document.addEventListener('click', function(e) {
        const projectImage = e.target.closest('.project-image');
        if (projectImage) {
            e.preventDefault();
            e.stopPropagation();
            
            // Get all images in the same lightbox group
            const galleryName = projectImage.dataset.lightbox;
            currentGallery = galleryName;
            images = Array.from(document.querySelectorAll(`.project-image[data-lightbox="${galleryName}"]`));
            currentIndex = images.findIndex(img => img === projectImage);
            
            // Show the clicked image
            showImage(currentIndex);
            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
        
        // Close lightbox
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            lightbox.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Navigation buttons
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            showPrev();
        });
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            showNext();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('show')) return;
        
        if (e.key === 'Escape') {
            lightbox.classList.remove('show');
            document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowRight') {
            showNext();
        } else if (e.key === 'ArrowLeft') {
            showPrev();
        }
    });
}

// Initialize when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightbox);
} else {
    // `DOMContentLoaded` has already fired
    setTimeout(initLightbox, 0);
}


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
                        method: 'POST',
                        headers: { 'Accept': 'application/json' },
                        body: formData
                    });
                    if (res.ok) {
                        statusEl.textContent = 'Köszönöm az üzenetedet, hamarosan jelentkezem!';
                        statusEl.classList.add('success');
                        contactForm.reset();
                    } else {
                        const data = await res.json().catch(() => ({}));
                        const msg = data?.errors?.map(e => e.message).join(', ') || 'Váratlan hiba történt. Próbáld újra később.';
                        statusEl.textContent = `Hiba: ${msg}`;
                        statusEl.classList.add('error');
                    }
                } catch (err) {
                    statusEl.textContent = 'Hálózati hiba. Ellenőrizd az internetkapcsolatot és próbáld újra.';
                    statusEl.classList.add('error');
                } finally {
                    submitBtn.disabled = false;
                }
            });
        }
    }
});

