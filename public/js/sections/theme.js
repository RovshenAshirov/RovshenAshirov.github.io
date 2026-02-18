// Theme Toggle
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle || themeToggle._initialized) return;
    themeToggle._initialized = true;

    const htmlElement = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', function() {
        const theme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    });

    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// waiting for navigation.html to load
document.addEventListener('component-loaded', function(e) {
    if (e.detail.path.includes('navigation.html')) {
        initTheme();
    }
});
