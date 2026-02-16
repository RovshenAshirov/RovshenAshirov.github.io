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
