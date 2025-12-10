// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// Burger animation
burger.addEventListener('click', () => {
    burger.classList.toggle('toggle');
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.padding = '0.5rem 0';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '1rem 0';
        header.style.boxShadow = 'none';
    }
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Dark/Light Mode Toggle
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;
const themeIcon = themeToggleBtn.querySelector('i');

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
}

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Update icon based on current theme with animation
    if (body.classList.contains('dark-mode')) {
        // First rotate the icon
        themeIcon.style.transform = 'rotate(360deg)';
        
        // After rotation completes, change the icon
        setTimeout(() => {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            themeIcon.style.transform = 'rotate(0deg)';
        }, 300);
        
        localStorage.setItem('theme', 'dark');
    } else {
        // First rotate the icon
        themeIcon.style.transform = 'rotate(360deg)';
        
        // After rotation completes, change the icon
        setTimeout(() => {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            themeIcon.style.transform = 'rotate(0deg)';
        }, 300);
        
        localStorage.setItem('theme', 'light');
    }
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For demonstration purposes, we'll just log it and show a success message
        console.log({ name, email, subject, message });
        
        // Show success message
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => group.style.display = 'none');
        
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out. I'll get back to you soon.</p>
            <button class="btn btn-primary" id="resetForm">Send Another Message</button>
        `;
        
        contactForm.appendChild(successMessage);
        
        // Reset form button
        document.getElementById('resetForm').addEventListener('click', () => {
            contactForm.reset();
            successMessage.remove();
            formGroups.forEach(group => group.style.display = 'block');
        });
    });
}

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .education-card, .certification-card, .timeline-item, .skill-category, .learning-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.querySelectorAll('.project-card, .education-card, .certification-card, .timeline-item, .skill-category, .learning-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Run animation on scroll
window.addEventListener('scroll', animateOnScroll);
// Run once on load to check for elements already in view
window.addEventListener('load', animateOnScroll);

// ========================================
// Enhanced Scroll Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-item, .tech-badge, .progress-bar');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// ========================================
// Rotating Photos Feature
// ========================================
// Array of all your photos from resources folder (excluding main.jpg and main2.webp)
const rotatingPhotos = [
    'resources/IMG-20221212-WA0013.jpg',
    'resources/IMG_20221212_202506_411.webp',
    'resources/IMG_20221212_202506_520.webp',
    'resources/IMG_20221212_202507_056.webp'
];

// Keep track of current photo index for sequential display
let currentPhotoIndex = 0;

// Function to get the next photo in sequence
function getNextPhoto() {
    const photo = rotatingPhotos[currentPhotoIndex];
    currentPhotoIndex = (currentPhotoIndex + 1) % rotatingPhotos.length; // Loop back to start
    return photo;
}

// Function to change the photo with fade effect
function changePhoto() {
    const rotatingPhotoElement = document.getElementById('rotating-photo');
    if (rotatingPhotoElement && rotatingPhotos.length > 0) {
        // Fade out
        rotatingPhotoElement.style.opacity = '0';
        
        // Change image after fade out
        setTimeout(() => {
            const nextPhoto = getNextPhoto();
            rotatingPhotoElement.src = nextPhoto;
            
            // Fade in
            rotatingPhotoElement.style.opacity = '1';
        }, 300);
    }
}

// Set the rotating photo on page load
document.addEventListener('DOMContentLoaded', () => {
    const rotatingPhotoElement = document.getElementById('rotating-photo');
    if (rotatingPhotoElement && rotatingPhotos.length > 0) {
        // Set main2.webp as the initial photo
        rotatingPhotoElement.src = 'resources/main2.webp';
        
        // Add smooth transition for photo changes
        rotatingPhotoElement.style.transition = 'opacity 0.3s ease-in-out';
        
        // Handle image load error - hide if photo doesn't exist
        rotatingPhotoElement.onerror = function() {
            this.parentElement.style.display = 'none';
        };
        
        // Auto-rotate through photos sequentially every 5 seconds
        setInterval(changePhoto, 5000);
    }
});