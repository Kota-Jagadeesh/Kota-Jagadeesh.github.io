console.log('Script.js loaded');

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'night' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.querySelector('.fa-sun').style.display = newTheme === 'dark' ? 'inline' : 'none';
    themeToggle.querySelector('.fa-moon').style.display = newTheme === 'dark' ? 'none' : 'inline';
    console.log(`Switched to ${newTheme} mode`);
});

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    themeToggle.querySelector('.fa-sun').style.display = savedTheme === 'dark' ? 'inline' : 'none';
    themeToggle.querySelector('.fa-moon').style.display = savedTheme === 'dark' ? 'none' : 'inline';
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav-link, .back-to-top').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
        console.log(`Navigating to ${targetId}`);
    });
});

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    console.log('Hamburger menu toggled');
});

// Form Submission with Validation and Confetti
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('input[name="name"]').value;
    const email = contactForm.querySelector('input[name="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    if (name && email && message) {
        // Confetti animation
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const confetti = [];
        for (let i = 0; i < 100; i++) {
            confetti.push({
                x: Math.random() * canvas.width,
                y: Math.random() * -canvas.height,
                speed: Math.random() * 5 + 2,
                angle: Math.random() * 360,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`
            });
        }
        
        function animateConfetti() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            confetti.forEach(p => {
                p.y += p.speed;
                p.x += Math.sin(p.angle) * 2;
                p.angle += 0.1;
                ctx.fillStyle = p.color;
                ctx.fillRect(p.x, p.y, 5, 5);
            });
            if (confetti.some(p => p.y < canvas.height)) {
                requestAnimationFrame(animateConfetti);
            } else {
                canvas.remove();
            }
        }
        
        animateConfetti();
        alert('Thank you for your message! This is a placeholder; form submission is not implemented.');
        contactForm.reset();
        console.log('Form submitted successfully');
    } else {
        alert('Please fill out all fields.');
    }
});

// Animate Progress Bars on Scroll
const progressBars = document.querySelectorAll('.progress');
const skillsSection = document.querySelector('#skills');
const animateProgress = () => {
    if (skillsSection.getBoundingClientRect().top < window.innerHeight - 100) {
        progressBars.forEach(bar => {
            bar.style.width = bar.getAttribute('data-width');
        });
        window.removeEventListener('scroll', animateProgress);
        console.log('Progress bars animated');
    }
};
window.addEventListener('scroll', animateProgress);

// Fade-in and Staggered Animations for Sections and Timeline Items
const sections = document.querySelectorAll('.section');
const timelineItems = document.querySelectorAll('.timeline-item');
const fadeInSections = () => {
    sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top < window.innerHeight - 50) {
            section.classList.add('visible');
            section.style.animationDelay = `${index * 0.2}s`;
        }
    });
    timelineItems.forEach(item => {
        if (item.getBoundingClientRect().top < window.innerHeight - 50) {
            item.classList.add('visible');
        }
    });
};
window.addEventListener('scroll', fadeInSections);

// Project Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filter = button.getAttribute('data-filter');
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.classList.add('visible');
            } else {
                card.style.display = 'none';
            }
        });
        console.log(`Filtered projects by ${filter}`);
    });
});

// Vanilla Tilt for Project Cards
VanillaTilt.init(document.querySelectorAll('.project-card, .personal-card'), {
    max: 15,
    speed: 400,
    glare: true,
    'max-glare': 0.5
});

// Back to Top Button and Scroll Progress
const backToTop = document.querySelector('.back-to-top');
const scrollProgress = document.createElement('div');
scrollProgress.classList.add('scroll-progress');
document.querySelector('.navbar').appendChild(scrollProgress);
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = `${scrollPercent}%`;
});

// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: { value: 150, density: { enable: true, value_area: 500 } },
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
}, () => {
    console.log('Particles.js initialized');
});

// Typing Effect for Hero Section
const typewriterName = document.getElementById('typewriter-name');
const typewriterTitle = document.getElementById('typewriter-title');
const typewriterDesc = document.getElementById('typewriter-desc');
const texts = [
    { element: typewriterName, text: 'Hey there, I’m Jagadeesh Kota 👋', speed: 100 },
    { element: typewriterTitle, text: 'Crafting code @ amFOSS 💻', speed: 80 },
    { element: typewriterDesc, text: 'AI • DS • Open Source 🚀 🌟.', speed: 60 }
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

// Initialize typing effect and section visibility
document.addEventListener('DOMContentLoaded', () => {
    typeText();
    sections.forEach(section => {
        if (section.getBoundingClientRect().top < window.innerHeight) {
            section.classList.add('visible');
        }
    });
    console.log('Page loaded, typing effect started');
});

// Vanilla Tilt for Timeline Cards
VanillaTilt.init(document.querySelectorAll('.timeline-card'), {
    max: 10,
    speed: 600,
    glare: true,
    'max-glare': 0.3,
    scale: 1.05
});