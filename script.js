document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        // Toggle menu visibility
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
        // Animate navigation items
        if (navLinks.classList.contains('active')) {
            navItems.forEach((item, index) => {
                item.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            });
        } else {
            navItems.forEach(item => {
                item.style.animation = '';
            });
        }
    });
    
    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('no-scroll');
                navItems.forEach(item => {
                    item.style.animation = '';
                });
            }
        });
    });
    
    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('no-scroll');
                navItems.forEach(item => {
                    item.style.animation = '';
                });
            }
        });
    });
    
    // Experience tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Initialize first tab as active
    if (tabBtns.length > 0) {
        tabBtns[0].click();
    }
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[type="text"]').value;
            const message = this.querySelector('textarea').value;
            
            // Here you would typically send the form data to a server
            // For now, we'll just log it and show an alert
            console.log({ name, email, subject, message });
            alert('Thank you for your message! We will contact you soon.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Add animation styles dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .no-scroll {
            overflow: hidden;
            height: 100%;
        }
        
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Detect touch devices
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints;
    }
    
    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
        
        // Remove hover effects on touch devices
        const hoverElements = document.querySelectorAll('.profile-card, .btn');
        hoverElements.forEach(el => {
            el.style.transition = 'none';
        });
    }
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.profile-card, .timeline-item, .experience-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    window.addEventListener('load', () => {
        const elements = document.querySelectorAll('.profile-card, .timeline-item, .experience-item');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Trigger animation once after small delay
        setTimeout(() => {
            animateOnScroll();
        }, 300);
    });
    
    window.addEventListener('scroll', animateOnScroll);
});