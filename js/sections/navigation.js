// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (!mobileMenuBtn || !navLinks || mobileMenuBtn._initialized) return;
    mobileMenuBtn._initialized = true;

    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
        });
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    if (window._navbarScrollInitialized) return;
    window._navbarScrollInitialized = true;

    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        if (anchor._smoothScrollInitialized) return;
        anchor._smoothScrollInitialized = true;

        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Language dropdown toggle
function initLanguageDropdown() {
    const languageToggle = document.getElementById('languageToggle');
    const languageSelector = document.querySelector('.language-selector');

    if (!languageToggle || !languageSelector || languageToggle._initialized) return;
    languageToggle._initialized = true;

    languageToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        languageSelector.classList.toggle('active');
    });

    // Close when clicking outside
    document.addEventListener('click', function(e) {
        if (!languageSelector.contains(e.target)) {
            languageSelector.classList.remove('active');
        }
    });
}

// Initialize all navigation features
function initNavigation() {
    initMobileMenu();
    initNavbarScroll();
    initSmoothScroll();
    initLanguageDropdown();
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
} else {
    initNavigation();
}

// Re-run on Astro page transitions (if using View Transitions)
document.addEventListener('astro:page-load', initNavigation);
