// Initialize AOS Animation
function initAOS() {
    if (window._aosInitialized) return;

    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
            disable: 'mobile' // Disable on mobile for better performance
        });
        window._aosInitialized = true;
    }
}

// Loading Screen - Hide after everything is loaded
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen && !loadingScreen._hidden) {
        loadingScreen._hidden = true;
        // Small delay to ensure smooth transition
        setTimeout(function() {
            loadingScreen.classList.add('hidden');
        }, 500);
    }
}

// Initialize all main features
function initMain() {
    initAOS();
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMain);
} else {
    initMain();
}

// Hide loading screen on full load
window.addEventListener('load', hideLoadingScreen);

// Re-run on Astro page transitions (if using View Transitions)
document.addEventListener('astro:page-load', function() {
    initMain();
    // Refresh AOS on page change
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});

document.addEventListener('astro:after-swap', function() {
    hideLoadingScreen();
});
