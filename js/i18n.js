// i18n - Internationalization System
const i18n = {
    currentLang: 'uz',
    translations: {},

    // Initialize
    init: function(lang = 'uz') {
        // Get language from URL or localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        const savedLang = localStorage.getItem('language');

        this.currentLang = urlLang || savedLang || lang;
        this.loadLanguage(this.currentLang);
    },

    // Load translation file
    loadLanguage: function(lang) {
        fetch(`translations/${lang}.json`)
            .then(res => {
                if (!res.ok) throw new Error('Translation file not found');
                return res.json();
            })
            .then(data => {
                this.translations = data;
                this.currentLang = lang;
                localStorage.setItem('language', lang);
                this.translatePage();
                this.updateLanguageUI();
            })
            .catch(err => {
                console.error('Failed to load language:', err);
                // Fallback to Uzbek
                if (lang !== 'uz') {
                    this.loadLanguage('uz');
                }
            });
    },

    // Translate entire page
    translatePage: function() {
        // Translate elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.getTranslation(key);

            if (typeof translation === 'string' && translation.includes('<')) {
                el.innerHTML = translation;
            } else {
                el.textContent = translation;
            }
        });

        // Translate placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const translation = this.getTranslation(key);
            if (translation) {
                el.placeholder = translation;
            }
        });

        // Update typing animation if exists
        if (window.updateTypingTexts && this.translations.hero && this.translations.hero.roles) {
            window.updateTypingTexts(this.translations.hero.roles);
        }

        // Trigger custom event
        document.dispatchEvent(new CustomEvent('language-changed', {
            detail: { lang: this.currentLang, translations: this.translations }
        }));
    },

    // Get nested translation
    getTranslation: function(key) {
        const keys = key.split('.');
        let value = this.translations;

        for (let k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return null;
            }
        }

        return value;
    },

    // Update language selector UI
    updateLanguageUI: function() {
        const flags = {
            'uz': '🇺🇿',
            'ru': '🇷🇺',
            'en': '🇬🇧',
            'tr': '🇹🇷'
        };

        const langTexts = {
            'uz': 'UZ',
            'ru': 'RU',
            'en': 'EN',
            'tr': 'TR'
        };

        // Update toggle button
        const toggleFlag = document.querySelector('.language-toggle .flag');
        const toggleText = document.querySelector('.language-toggle .lang-text');

        if (toggleFlag) toggleFlag.textContent = flags[this.currentLang];
        if (toggleText) toggleText.textContent = langTexts[this.currentLang];

        // Update active state in dropdown
        document.querySelectorAll('.language-option').forEach(option => {
            const lang = option.getAttribute('data-lang');
            if (lang === this.currentLang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    },

    // Change language
    changeLanguage: function(lang) {
        if (lang !== this.currentLang) {
            this.loadLanguage(lang);
        }
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    i18n.init();

    // Setup language selector clicks
    setTimeout(function() {
        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');
                i18n.changeLanguage(lang);
            });
        });
    }, 1000);
});

// Listen for component loaded events
document.addEventListener('component-loaded', function() {
    setTimeout(function() {
        i18n.translatePage();

        // Re-attach language selector listeners
        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');
                i18n.changeLanguage(lang);
            });
        });
    }, 100);
});

// Export for global use
window.i18n = i18n;
