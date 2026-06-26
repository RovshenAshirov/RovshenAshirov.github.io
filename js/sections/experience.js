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

function updateExperience() {
    const exp = calculateExperience();
    window.portfolioExperience = exp;

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

// Initialize on page load (Astro SSG: all sections already rendered)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateExperience);
} else {
    updateExperience();
}

// Re-run on Astro page transitions
document.addEventListener('astro:page-load', updateExperience);
