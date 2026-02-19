// Typing Animation
let typingTimeout = null;  // Global - to stop the old animation

function initTyping() {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;

    // Stop old animation
    if (typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
    }

    // Get roles from i18n, default if not present
    const texts = (window.i18n && window.i18n.getTranslation('hero.roles'))
        || [
            'Backend Developer',
            'Software Engineer',
            'Django Expert',
            'Laravel Specialist',
            'Full-stack Developer'
        ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingTimeout = setTimeout(function() {
                isDeleting = true;
                typingTimeout = setTimeout(type, 50);
            }, 2000);
            return;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        const speed = isDeleting ? 50 : 100;
        typingTimeout = setTimeout(type, speed);
    }

    // Starting over
    typingText.textContent = '';
    type();
}

// Initialize on page load (Astro SSG: hero already rendered)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTyping);
} else {
    initTyping();
}

// When i18n loads (for typing texts)
document.addEventListener('language-changed', function() {
    initTyping();
});

// Re-run on Astro page transitions
document.addEventListener('astro:page-load', initTyping);
