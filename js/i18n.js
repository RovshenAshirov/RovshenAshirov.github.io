// i18n - Internationalization System (Astro optimized)
const i18n = {
    currentLang: 'uz',
    translations: {},

    // Initialize i18n
    init: function(lang) {
        if (window._i18nInitialized) return;
        window._i18nInitialized = true;

        const savedLang = localStorage.getItem('language') || lang || 'uz';
        this.currentLang = savedLang;
        
        // Load translations for dynamic features (typing animation, etc.)
        this.loadLanguage(savedLang);
    },

    // Load translation file
    loadLanguage: function(lang) {
        // Astro SSG: content already rendered, just load for dynamic features
        fetch(`/translations/${lang}.json`)
            .then(res => {
                if (!res.ok) throw new Error('Translation file not found');
                return res.json();
            })
            .then(data => {
                this.translations = data;
                this.currentLang = lang;
                localStorage.setItem('language', lang);
                
                // Dispatch event for dynamic features
                document.dispatchEvent(new CustomEvent('language-changed', {
                    detail: { lang: lang, translations: data }
                }));
            })
            .catch(err => {
                console.error('Failed to load language:', err);
                if (lang !== 'uz') this.loadLanguage('uz');
            });
    },

    // Get translation value
    getTranslation: function(key) {
        const keys = key.split('.');
        let value = this.translations;
        
        for (let k of keys) {
            if (value === null || value === undefined) return null;
            // Array index support
            if (Array.isArray(value) && !isNaN(k)) {
                value = value[parseInt(k)];
            } else if (value[k] !== undefined) {
                value = value[k];
            } else {
                return null;
            }
        }
        return value;
    },

    // Change language (redirect to appropriate page)
    changeLanguage: function(lang) {
        if (lang !== this.currentLang) {
            // Astro SSG: redirect to language page
            const urls = {
                'uz': '/',
                'en': '/en/',
                'ru': '/ru/',
                'tr': '/tr/'
            };
            
            if (urls[lang]) {
                localStorage.setItem('language', lang);
                window.location.href = urls[lang];
            }
        }
    }
};

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // Get current language from URL
        const path = window.location.pathname;
        let currentLang = 'uz';
        if (path.startsWith('/en')) currentLang = 'en';
        else if (path.startsWith('/ru')) currentLang = 'ru';
        else if (path.startsWith('/tr')) currentLang = 'tr';
        
        i18n.init(currentLang);
    });
} else {
    const path = window.location.pathname;
    let currentLang = 'uz';
    if (path.startsWith('/en')) currentLang = 'en';
    else if (path.startsWith('/ru')) currentLang = 'ru';
    else if (path.startsWith('/tr')) currentLang = 'tr';
    
    i18n.init(currentLang);
}

// Re-run on Astro page transitions
document.addEventListener('astro:page-load', function() {
    const path = window.location.pathname;
    let currentLang = 'uz';
    if (path.startsWith('/en')) currentLang = 'en';
    else if (path.startsWith('/ru')) currentLang = 'ru';
    else if (path.startsWith('/tr')) currentLang = 'tr';
    
    i18n.init(currentLang);
});

// Export for global use
window.i18n = i18n;
