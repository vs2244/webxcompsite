// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Typed.js
    const typed = new Typed('.typing', {
        strings: [
            "If you don't have a website, you don't have a business",
            "Your website is your digital storefront",
            "Transform your business with AI-powered web solutions",
            "Stand out in the digital world"
        ],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        backDelay: 2000,
        startDelay: 1000
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = '#ffffff';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
        }
    });

    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);

    // Replace with your Google Apps Script deployment URL
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx67Zb6JCnXcwp0nrdGkPcbd0FHPD8xLPOliS1lIS9ODFiKipHIQ3Sq-zJCNCJqDG-aMw/exec';
    

    // Contact form elements
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitButton = form.querySelector('.submit-btn');

    // Form validation functions
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
        return /^\+?[\d\s-]{10,}$/.test(phone);
    }

    function validateField(field) {
        const errorClass = 'error';
        let isValid = true;

        if (field.value.trim() === '') {
            isValid = false;
        } else if (field.type === 'email' && !validateEmail(field.value)) {
            isValid = false;
        } else if (field.type === 'tel' && !validatePhone(field.value)) {
            isValid = false;
        }

        field.classList.toggle(errorClass, !isValid);
        return isValid;
    }

    // Validate individual fields on blur
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });

    // Single form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate all fields before submission
        const inputs = form.querySelectorAll('input, textarea');
        const isFormValid = Array.from(inputs).every(validateField);

        if (!isFormValid) {
            formStatus.textContent = 'Please correct the errors in the form.';
            formStatus.className = 'form-status error';
            return;
        }

        // Disable submit button and show sending status
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        formStatus.textContent = '';

        try {
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };

            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Important for Google Apps Script
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Reset form and show success message
            form.reset();
            formStatus.textContent = 'Message sent successfully!';
            formStatus.className = 'form-status success';

        } catch (error) {
            console.error('Error:', error);
            formStatus.textContent = 'Error sending message. Please try again.';
            formStatus.className = 'form-status error';
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
});