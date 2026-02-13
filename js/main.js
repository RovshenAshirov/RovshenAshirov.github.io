// Calculate experience automatically from November 2021
function calculateExperience() {
    const startDate = new Date('2021-11-01');
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - startDate);
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
    const years = Math.floor(diffYears);
    const months = Math.floor((diffYears - years) * 12);
    
    return {
        years: years,
        months: months,
        display: years + (months >= 6 ? '+' : '')
    };
}

// Update experience immediately (don't wait for DOMContentLoaded)
(function() {
    const exp = calculateExperience();
    
    // Store in a global variable for later use
    window.portfolioExperience = exp;
    
    // Try to update immediately if elements exist
    function updateExperience() {
        const experienceYears = document.getElementById('experienceYears');
        const aboutExperience = document.getElementById('aboutExperience');
        const statExperience = document.getElementById('statExperience');
        const codeExperience = document.getElementById('codeExperience');
        
        if (experienceYears) experienceYears.textContent = exp.display + '+';
        if (aboutExperience) aboutExperience.textContent = exp.display + '+';
        if (statExperience) {
            statExperience.textContent = exp.years;
            statExperience.setAttribute('data-count', exp.years);
        }
        if (codeExperience) codeExperience.textContent = exp.display + '+ years';
    }
    
    // Update on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateExperience);
    } else {
        updateExperience();
    }
})();

// Initialize AOS after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with better settings
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
            disable: 'mobile' // Disable on mobile for better performance
        });
    }
});

// Loading Screen - Hide after everything is loaded
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        // Small delay to ensure smooth transition
        setTimeout(function() {
            loadingScreen.classList.add('hidden');
        }, 500);
    }
});

// Theme Toggle
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const theme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    });
    
    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
});

// Mobile Menu
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (!mobileMenuBtn || !navLinks) return;
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        }
    });
    
    // Close mobile menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Typing Animation
document.addEventListener('DOMContentLoaded', function() {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;
    
    const texts = [
        'Backend Developer',
        'Software Engineer',
        'Django Expert',
        'Laravel Specialist',
        'Full-stack Developer',
        'Microservices Architect',
        'OAuth2 Specialist'
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
            setTimeout(function() { isDeleting = true; }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(type, speed);
    }
    
    type();
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

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

// Certificate lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    const certificateCards = document.querySelectorAll('.certificate-card');
    
    certificateCards.forEach(function(card) {
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
        });
    });
});
