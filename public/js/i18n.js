const i18n = {
    currentLang: 'uz',
    translations: {},

    init: function(lang) {
        const savedLang = localStorage.getItem('language') || lang || 'uz';
        this.loadLanguage(savedLang);
    },

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
                document.dispatchEvent(new CustomEvent('language-changed', {
                    detail: { lang: lang, translations: data }
                }));
            })
            .catch(err => {
                console.error('Failed to load language:', err);
                if (lang !== 'uz') this.loadLanguage('uz');
            });
    },

    translatePage: function() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            if (translation === null || typeof translation === 'object') return;

            if (typeof translation === 'string' && translation.includes('<')) {
                el.innerHTML = translation;
            } else {
                el.textContent = translation;
            }
        });
    },

    // Array index ham ishlaydi: "modals.scienceid.role_items.0"
    getTranslation: function(key) {
        const keys = key.split('.');
        let value = this.translations;
        for (let k of keys) {
            if (value === null || value === undefined) return null;
            // Array index
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

    changeLanguage: function(lang) {
        if (lang !== this.currentLang) {
            this.loadLanguage(lang);
        }
    }
};

document.addEventListener('component-loaded', function() {
    setTimeout(function() { i18n.translatePage(); }, 100);
});

// Export for global use
window.i18n = i18n;
