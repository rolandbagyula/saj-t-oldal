/**
 * Cookie Consent Banner
 * Handles the display and user interaction with the cookie consent banner
 */
const CookieConsent = {
    // Initialize the cookie consent banner
    init() {
        // Check if user has already made a choice
        if (!this.getCookie('cookie_consent')) {
            this.createBanner();
            this.setupEventListeners();
            // Show banner with a small delay for better UX
            setTimeout(() => {
                this.showBanner();
            }, 1000);
        }
    },

    // Create the banner HTML
    createBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Cookie tájékoztató');
        
        banner.innerHTML = `
            <div class="cookie-consent-content">
                <p class="cookie-consent-text">
                    Ez a weboldal sütiket használ a jobb felhasználói élmény érdekében. A böngészés folytatásával elfogadja a sütik használatát.
                </p>
                <div class="cookie-consent-buttons">
                    <button type="button" class="cookie-consent-btn reject" id="reject-cookies">Elutasítom</button>
                    <button type="button" class="cookie-consent-btn accept" id="accept-cookies">Elfogadom</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);
    },

    // Show the banner with animation
    showBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            // Trigger reflow
            banner.offsetHeight;
            banner.classList.add('show');
        }
    },

    // Hide the banner with animation
    hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.remove('show');
            // Remove from DOM after animation completes
            setTimeout(() => {
                banner.remove();
            }, 400);
        }
    },

    // Set a cookie with the given name, value and expiration in days
    setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '') + expires + '; path=/; SameSite=Lax';
    },

    // Get the value of a cookie by name
    getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },

    // Set up event listeners for the banner buttons
    setupEventListeners() {
        // Accept button
        const acceptBtn = document.getElementById('accept-cookies');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                this.setCookie('cookie_consent', 'accepted', 365);
                this.hideBanner();
                this.initializeAnalytics(); // Initialize analytics if needed
            });
        }

        // Reject button
        const rejectBtn = document.getElementById('reject-cookies');
        if (rejectBtn) {
            rejectBtn.addEventListener('click', () => {
                this.setCookie('cookie_consent', 'rejected', 30);
                this.hideBanner();
            });
        }
    },

    // Initialize analytics (placeholder for future implementation)
    initializeAnalytics() {
        // This is a placeholder for analytics initialization
        // Example: Google Analytics, Facebook Pixel, etc.
        console.log('Analytics initialized');
    }
};

// Initialize the cookie consent when the DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        CookieConsent.init();
    });
} else {
    CookieConsent.init();
}
