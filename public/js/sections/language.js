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

    // Language option click - port to i18n
    document.querySelectorAll('.language-option').forEach(function(option) {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            languageSelector.classList.remove('active');

            // Language switching via i18n
            if (window.i18n) {
                window.i18n.changeLanguage(lang);
            }
        });
    });
}

// waiting for navigation.html to load
document.addEventListener('component-loaded', function(e) {
    if (e.detail.path.includes('navigation.html')) {
        initLanguageSelector();
    }
});

// UI update when language changes
document.addEventListener('language-changed', function(e) {
    const lang = e.detail.lang;

    const flags = { 'uz': '🇺🇿', 'ru': '🇷🇺', 'en': '🇬🇧', 'tr': '🇹🇷' };
    const langTexts = { 'uz': 'UZ', 'ru': 'RU', 'en': 'EN', 'tr': 'TR' };

    // Toggle button update
    const flagEl = document.querySelector('.language-toggle .flag');
    const textEl = document.querySelector('.language-toggle .lang-text');
    if (flagEl) flagEl.textContent = flags[lang];
    if (textEl) textEl.textContent = langTexts[lang];

    // Active state update
    document.querySelectorAll('.language-option').forEach(function(option) {
        option.classList.toggle('active', option.getAttribute('data-lang') === lang);
    });
});
