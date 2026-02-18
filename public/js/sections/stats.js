// Counter Animation
function initStatsCounter() {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;

    let hasAnimated = false;

    function animateCounters() {
        if (hasAnimated) return;
        hasAnimated = true;

        counters.forEach(function(counter) {
            const target = +counter.getAttribute('data-count');
            let current = 0;

            // Slower: interval calculation based on target
            const duration = 2000; // 2 second
            const steps = 60;
            const increment = target / steps;
            const interval = duration / steps;

            const timer = setInterval(function() {
                current += increment;
                if (current >= target) {
                    counter.textContent = target.toLocaleString() + '+';
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString() + '+';
                }
            }, interval);
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
}

// Waiting for stats.html to load
document.addEventListener('component-loaded', function(e) {
    if (e.detail.path.includes('stats.html')) {
        initStatsCounter();
    }
});
