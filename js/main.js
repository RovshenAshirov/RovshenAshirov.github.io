// AOS init
document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
            disable: 'mobile'
        });
    }
});

// Loading Screen - Waiting for loading.html to load
document.addEventListener('component-loaded', function(e) {
    if (e.detail.path.includes('loading.html')) {
        window.addEventListener('load', function() {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                setTimeout(function() {
                    loadingScreen.classList.add('hidden');
                }, 500);
            }
        });

        // Fallback: load already exists
        if (document.readyState === 'complete') {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                setTimeout(function() {
                    loadingScreen.classList.add('hidden');
                }, 500);
            }
        }
    }
});
