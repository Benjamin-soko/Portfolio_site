document.addEventListener('DOMContentLoaded', () => {
    // Remove smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView();
            }
        });
    });

    // Remove intersection observer and reveal animations
    const revealElements = document.querySelectorAll('.about-content, .project-card, .skill-category, h2');
    revealElements.forEach(element => {
        element.style.opacity = "1";
        element.style.transform = "none";
    });

    // Keep only essential navigation functionality
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function updateActiveSection() {
        const scrollPosition = window.pageYOffset;
        const sections = document.querySelectorAll('section');
        
        navLinks.forEach(link => link.classList.remove('active'));
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop - 100 && 
                scrollPosition < sectionTop + sectionHeight - 100) {
                const currentId = section.getAttribute('id');
                const activeLink = document.querySelector(`.nav-links a[href="#${currentId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Optimize scroll event handling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (isMobile()) {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = window.requestAnimationFrame(() => {
                updateActiveSection();
            });
        } else {
            updateActiveSection();
        }
    }, { passive: true });

    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            alert('Message sent successfully!');
            contactForm.reset();
        });
    }

    // Add hover effect for nav items
    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            const icon = link.querySelector('i');
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        });

        link.addEventListener('mouseout', () => {
            const icon = link.querySelector('i');
            icon.style.transform = 'scale(1)';
        });
    });

    // Add floating animation
    const floatKeyframes = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0);
        }
        25% {
            transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px);
        }
        50% {
            transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px);
        }
        75% {
            transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px);
        }
    }`;

    // Add keyframes to document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = floatKeyframes;
    document.head.appendChild(styleSheet);

    // Add section indices for staggered animations
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach((section, index) => {
        section.style.setProperty('--section-index', index);
    });

    // Add this function to check if the device is mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Update the binary background to be simpler on mobile
    function createBinaryBackground() {
        const container = document.querySelector('.binary-background');
        if (!container) return;
        
        // Clear existing content
        container.innerHTML = '';
        
        // Reduce number of elements on mobile
        const numberOfElements = isMobile() ? 50 : 150;
        
        for (let i = 0; i < numberOfElements; i++) {
            const element = document.createElement('div');
            element.className = 'number-float';
            element.textContent = Math.random() < 0.5 ? '0' : '1';
            
            const startX = Math.random() * container.offsetWidth;
            element.style.left = `${startX}px`;
            
            // Slower animation on mobile
            const duration = isMobile() ? 15 + Math.random() * 10 : 10 + Math.random() * 15;
            const delay = Math.random() * -20;
            element.style.animationDuration = `${duration}s`;
            element.style.animationDelay = `${delay}s`;
            
            container.appendChild(element);
        }
    }

    // Initialize binary background with mobile optimization
    createBinaryBackground();
    
    // Optimize resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(createBinaryBackground, 250);
    });

    // Remove typewriter effect initialization
    const title = document.querySelector('.hero-title');
    if (title) {
        title.style.opacity = '1';
        title.style.transform = 'none';
    }

    // Update the mobile menu functionality
    const floatNavBtn = document.querySelector('.float-nav-btn');
    const nav = document.querySelector('nav');
    const body = document.body;

    if (floatNavBtn && nav) {
        // Toggle menu
        floatNavBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            floatNavBtn.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Handle navigation links
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                // Close menu
                floatNavBtn.classList.remove('active');
                nav.classList.remove('active');

                // Smooth scroll to section
                if (targetSection) {
                    setTimeout(() => {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('active') && 
                !nav.contains(e.target) && 
                !floatNavBtn.contains(e.target)) {
                floatNavBtn.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    }
});

// Remove cursor trailer creation and event listener
// const cursor = document.createElement('div');
// cursor.className = 'cursor-trailer';
// document.body.appendChild(cursor);

// document.addEventListener('mousemove', (e) => {
//     cursor.style.left = e.clientX + 'px';
//     cursor.style.top = e.clientY + 'px';
// });



    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update main cursor
        cursor.style.left = mouseX - 10 + 'px';
        cursor.style.top = mouseY - 10 + 'px';
    });

    // Animate trails
    function updateTrails() {
        trails.forEach((trail, index) => {
            // Calculate trail position with delay
            const dx = mouseX - trail.x;
            const dy = mouseY - trail.y;
            
            trail.x += dx * 0.2;  // Adjust speed of trail
            trail.y += dy * 0.2;
            
            // Update trail position
            trail.element.style.left = trail.x - 3 + 'px';
            trail.element.style.top = trail.y - 3 + 'px';
            
            // Update opacity based on distance from cursor
            const distance = Math.sqrt(dx * dx + dy * dy);
            const opacity = Math.max(0, 1 - (distance / 100) - (index * 0.15));
            trail.element.style.opacity = opacity;
        });
        
        requestAnimationFrame(updateTrails);
    }
    
    updateTrails();

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .logo, input, textarea');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseover', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = 'rgba(0, 243, 255, 0.8)';
            trails.forEach(trail => {
                trail.element.style.transform = 'scale(1.2)';
                trail.element.style.background = 'rgba(0, 243, 255, 0.8)';
            });
        });
        
        el.addEventListener('mouseout', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'rgba(0, 243, 255, 0.5)';
            trails.forEach(trail => {
                trail.element.style.transform = 'scale(1)';
                trail.element.style.background = 'var(--neon-blue)';
            });
        });
    });
} 
