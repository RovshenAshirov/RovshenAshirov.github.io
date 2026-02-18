// Initialize AOS after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with better settings
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
            disable: 'mobile' // Disable on mobile for better performance
        });
    }
});

// Loading Screen - Hide after everything is loaded
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        // Small delay to ensure smooth transition
        setTimeout(function() {
            loadingScreen.classList.add('hidden');
        }, 500);
    }
});
