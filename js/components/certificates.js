// Certificate lightbox functionality
function initCertificateLightbox() {
    const certificateCards = document.querySelectorAll('.certificate-card');

    if (certificateCards.length === 0) return;

    certificateCards.forEach(function(card) {
        // Prevent multiple event bindings
        if (card._lightboxInitialized) return;
        card._lightboxInitialized = true;

        card.addEventListener('click', function() {
            const img = card.querySelector('.certificate-image img');
            if (!img) return;

            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = '<div class="lightbox-content"><span class="lightbox-close">&times;</span><img src="' + img.src + '" alt="' + img.alt + '"></div>';

            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            setTimeout(function() {
                lightbox.classList.add('active');
            }, 10);

            function closeLightbox() {
                lightbox.classList.remove('active');
                setTimeout(function() {
                    if (document.body.contains(lightbox)) {
                        document.body.removeChild(lightbox);
                    }
                    document.body.style.overflow = 'auto';
                }, 300);
            }

            const closeBtn = lightbox.querySelector('.lightbox-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', closeLightbox);
            }

            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });

            // ESC key to close
            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', escHandler);
                }
            });
        });
    });
}

// Initialize on page load (Astro SSG: certificates already rendered)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCertificateLightbox);
} else {
    initCertificateLightbox();
}

// Re-run on Astro page transitions
document.addEventListener('astro:page-load', initCertificateLightbox);
