// Modal functionality
function initModals() {
    // Open modal
    document.querySelectorAll('.btn-details').forEach(function(button) {
        if (button._initialized) return;
        button._initialized = true;

        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const modal = document.getElementById('modal-' + projectId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    document.querySelectorAll('.modal-close').forEach(function(button) {
        if (button._initialized) return;
        button._initialized = true;

        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Outside click
    document.querySelectorAll('.modal').forEach(function(modal) {
        if (modal._initialized) return;
        modal._initialized = true;

        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
}

    // Close on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(function(modal) {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }
});

// Call initModals when each component is loaded
document.addEventListener('component-loaded', function() {
    initModals();
});
