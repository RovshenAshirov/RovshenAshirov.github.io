// Counter Animation
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;

    const speed = 200;
    let hasAnimated = false;

    function animateCounters() {
        if (hasAnimated) return;
        hasAnimated = true;

        counters.forEach(function(counter) {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;

            function updateCount() {
                const current = +counter.innerText;
                if (current < target) {
                    counter.innerText = Math.ceil(current + increment);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            }

            updateCount();
        });
    }

    // Trigger counter animation when in viewport
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsSection);
    }
});
