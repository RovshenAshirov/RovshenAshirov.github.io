// Language Selector
function initLanguageSelector() {
    const languageToggle = document.getElementById('languageToggle');
    const languageSelector = document.querySelector('.language-selector');

    if (!languageToggle || !languageSelector || languageToggle._initialized) return;
    languageToggle._initialized = true;

    // Toggle dropdown
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

    // Language option click - Astro SSG: just redirect
    document.querySelectorAll('.language-option').forEach(function(option) {
        // Already has href attribute from Navigation.astro
        // No need to add click handler - let the link work naturally
        option.addEventListener('click', function(e) {
            languageSelector.classList.remove('active');
            // href will handle the navigation
        });
    });
}

// Initialize on page load (Astro SSG: navigation already rendered)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageSelector);
} else {
    initLanguageSelector();
}

// Re-run on Astro page transitions
document.addEventListener('astro:page-load', initLanguageSelector);
