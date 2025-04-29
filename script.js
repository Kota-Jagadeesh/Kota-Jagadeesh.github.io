// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav-link, .back-to-top').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Form Submission (Placeholder)
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! This is a placeholder; form submission is not implemented.');
    contactForm.reset();
});

// Animate Progress Bars on Scroll
const progressBars = document.querySelectorAll('.progress');
const skillsSection = document.querySelector('#skills');

const animateProgress = () => {
    if (skillsSection.getBoundingClientRect().top < window.innerHeight - 100) {
        progressBars.forEach(bar => {
            bar.style.width = bar.getAttribute('style').split(': ')[1];
        });
        window.removeEventListener('scroll', animateProgress);
    }
};

window.addEventListener('scroll', animateProgress);

// Fade-in Animation for Sections
const sections = document.querySelectorAll('.section');

const fadeInSections = () => {
    sections.forEach(section => {
        if (section.getBoundingClientRect().top < window.innerHeight - 50) {
            section.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', fadeInSections);

// Back to Top Button Visibility
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: { value: 100, density: { enable: true, value_area: 700 } },
        color: { value: '#00c4b4' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#7b2cbf', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out' }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

// Typing Effect for Hero Section
const typewriterName = document.getElementById('typewriter-name');
const typewriterTitle = document.getElementById('typewriter-title');
const typewriterDesc = document.getElementById('typewriter-desc');

const texts = [
    { element: typewriterName, text: 'Hello, I’m Jagadeesh Kota 👋', speed: 100 },
    { element: typewriterTitle, text: 'B.Tech AIDS Student | Developer | amFOSS Member 💻', speed: 80 },
    { element: typewriterDesc, text: 'Passionate about AI, Data Science, and innovative solutions 🌟.', speed: 60 }
];

let currentTextIndex = 0;

function typeText() {
    const { element, text, speed } = texts[currentTextIndex];
    let i = 0;

    function type() {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1);
            i++;
            setTimeout(type, speed);
        } else {
            currentTextIndex++;
            if (currentTextIndex < texts.length) {
                setTimeout(typeText, 500); // Delay before next text
            } else {
                // Restart typing effect after a pause
                setTimeout(() => {
                    currentTextIndex = 0;
                    texts.forEach(({ element }) => element.innerHTML = '');
                    typeText();
                }, 2000);
            }
        }
    }

    type();
}

// Start typing effect on page load
document.addEventListener('DOMContentLoaded', () => {
    typeText();
    sections.forEach(section => {
        if (section.getBoundingClientRect().top < window.innerHeight) {
            section.classList.add('visible');
        }
    });
});