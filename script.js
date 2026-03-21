/* scroll reveal */

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("active")
        }

    })
})

document.querySelectorAll(".reveal").forEach(el => {
    revealObserver.observe(el)
})



/* animated counters */

const counters = document.querySelectorAll(".counter")

counters.forEach(counter => {

    const update = () => {

        const target = +counter.getAttribute("data-target")
        const current = +counter.innerText

        const increment = target / 100

        if (current < target) {

            counter.innerText = Math.ceil(current + increment)

            setTimeout(update, 20)

        }
        else {

            counter.innerText = target + "+"

        }

    }

    update()

})



/* theme toggle */

const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    const logo = document.querySelector('.logo-img');

    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.textContent = '☀️';
        if (logo) logo.src = 'assets/logo-light.jpeg';
    } else {
        themeToggle.textContent = '🌙';
        if (logo) logo.src = 'assets/logo-dark.png';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        themeToggle.textContent = isLight ? '☀️' : '🌙';
        if (logo) logo.src = isLight ? 'assets/logo-light.jpeg' : 'assets/logo-dark.png';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.querySelector('nav');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('open');
    });
}

// Scroll-triggered animations
const cardObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            cardObserver.unobserve(entry.target);
        }
    });
}, cardObserverOptions);

// Observe all cards and sections
document.querySelectorAll('.feature-card, .blog-list-item, .event-card, .team-profile, .stat-item, .resource-card, .opp-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    cardObserver.observe(el);
});