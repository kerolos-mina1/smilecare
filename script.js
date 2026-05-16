
// ── Navbar scroll shadow ──────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Hamburger menu ────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
});

// Close mobile nav on link click
document.querySelectorAll('.mobile-link, .mobile-nav .btn').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
    });
});

// ── Scroll reveal ─────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // stagger siblings
            const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
            const idx = siblings.indexOf(entry.target);
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, idx * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// ── Contact form ──────────────────────────────────────
document.getElementById('submitBtn').addEventListener('click', () => {
    const fname = document.getElementById('fname').value.trim();
    const email = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value;

    if (!fname || !email || !service) {
        alert('Please fill in your name, email, and select a service.');
        return;
    }
    // Simulate submission
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
    setTimeout(() => {
        btn.style.display = 'none';
        document.getElementById('formSuccess').classList.add('show');
    }, 1400);
});

// ── Active nav link on scroll ─────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--primary)' : '';
    });
});