// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modals = document.querySelectorAll('.modal');
    const detailButtons = document.querySelectorAll('.btn-details');
    const closeButtons = document.querySelectorAll('.modal-close');

    // Open modal
    detailButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const projectId = button.getAttribute('data-project');
            const modal = document.getElementById('modal-' + projectId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const modal = button.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close on outside click
    modals.forEach(function(modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(function(modal) {
                modal.classList.remove('active');
            });
            document.body.style.overflow = 'auto';
        }
    });
});
