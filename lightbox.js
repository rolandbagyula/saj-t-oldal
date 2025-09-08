// Carousel functionality for project cards
function initCarousels() {
    document.querySelectorAll('.image-carousel').forEach(carousel => {
        const images = carousel.querySelectorAll('.project-image');
        const prevBtn = carousel.parentElement.querySelector('.carousel-prev');
        const nextBtn = carousel.parentElement.querySelector('.carousel-next');
        let currentIndex = 0;

        function showImage(index) {
            // Hide all images
            images.forEach(img => img.classList.remove('active'));
            // Show the current image
            images[index].classList.add('active');
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        }

        // Initialize first image
        if (images.length > 0) {
            showImage(0);
        }

        // Add event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showPrev();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showNext();
            });
        }
    });
}

// Lightbox functionality for project images
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousels
    initCarousels();
    
    console.log('Initializing lightbox...');
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    if (!lightbox || !lightboxImg) {
        console.error('Lightbox elements not found!');
        return;
    }
    
    let currentGallery = '';
    let currentIndex = 0;
    let images = [];
    
    // Function to show image in lightbox
    function showImage(index) {
        if (images.length === 0) return;
        
        currentIndex = index;
        const img = images[currentIndex];
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || '';
        
        if (lightboxTitle) {
            lightboxTitle.textContent = img.dataset.title || img.alt || '';
        }
        
        console.log('Showing image:', currentIndex, 'of', images.length - 1, img.src);
    }
    
    // Next/previous image navigation
    function showNext() {
        if (images.length === 0) return;
        const newIndex = (currentIndex + 1) % images.length;
        console.log('Next image:', newIndex);
        showImage(newIndex);
    }
    
    function showPrev() {
        if (images.length === 0) return;
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        console.log('Previous image:', newIndex);
        showImage(newIndex);
    }
    
    // Click handler for project images
    document.addEventListener('click', function(e) {
        const projectImage = e.target.closest('.project-image');
        if (projectImage) {
            e.preventDefault();
            e.stopPropagation();
            
            // Get all images in the same lightbox group
            const galleryName = projectImage.dataset.lightbox;
            if (!galleryName) {
                console.error('No lightbox group specified');
                return;
            }
            
            currentGallery = galleryName;
            images = Array.from(document.querySelectorAll(`.project-image[data-lightbox="${galleryName}"]`));
            
            if (images.length === 0) {
                console.error('No images found in gallery:', galleryName);
                return;
            }
            
            currentIndex = Math.max(0, images.findIndex(img => img === projectImage));
            console.log('Opening lightbox with', images.length, 'images in gallery', galleryName, 'starting at index', currentIndex);
            
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
            e.preventDefault();
            e.stopPropagation();
            showPrev();
        });
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showNext();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('show')) return;
        
        e.preventDefault();
        
        if (e.key === 'Escape') {
            lightbox.classList.remove('show');
            document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowRight') {
            showNext();
        } else if (e.key === 'ArrowLeft') {
            showPrev();
        }
    });
    
    console.log('Lightbox initialized');
});
