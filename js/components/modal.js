// Modal functionality
function initModals() {
    // Open modal
    document.querySelectorAll('.btn-details').forEach(function (button) {
        if (button._initialized) return;
        button._initialized = true;

        button.addEventListener('click', function () {
            const projectId = this.getAttribute('data-project');
            const modal = document.getElementById('modal-' + projectId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    document.querySelectorAll('.modal-close').forEach(function (button) {
        if (button._initialized) return;
        button._initialized = true;

        button.addEventListener('click', function () {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Modal image click - lightbox
    document.querySelectorAll('.modal-image').forEach(function (img) {
        if (img._initialized) return;
        img._initialized = true;

        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function () {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = '<div class="lightbox-content"><span class="lightbox-close">&times;</span><img src="' + img.src + '"></div>';
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            setTimeout(function () {
                lightbox.classList.add('active');
            }, 10);

            lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function (e) {
                if (e.target === lightbox) closeLightbox();
            });

            function closeLightbox() {
                lightbox.classList.remove('active');
                setTimeout(function () {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        });
    });

    // Outside click
    document.querySelectorAll('.modal').forEach(function (modal) {
        if (modal._initialized) return;
        modal._initialized = true;

        modal.addEventListener('click', function (e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
}

// Close on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(function (modal) {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }
});

// Call initModals when each component is loaded
document.addEventListener('component-loaded', function () {
    initModals();
});
