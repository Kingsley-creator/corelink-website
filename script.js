// ========== CoreLink Technologies - Professional Script ==========
// Ensure DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== Mobile Menu Toggle ==========
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.backgroundColor = '#0A0A0A';
                navLinks.style.padding = '2rem';
                navLinks.style.gap = '1rem';
                navLinks.style.zIndex = '999';
                navLinks.style.borderBottom = '1px solid rgba(198,164,63,0.2)';
            }
        });
    }
    
    // ========== Scroll Functions ==========
    function scrollToContact() {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    function scrollToServices() {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    function openEmailClient() {
        const subject = encodeURIComponent('Inquiry from CoreLink Website');
        const body = encodeURIComponent(
            'Hello CoreLink Technologies Team,\n\n' +
            'I came across your website and would like to learn more about your services.\n\n' +
            'Please get back to me at your earliest convenience.\n\n' +
            'Best regards,\n[Your Name]'
        );
        window.location.href = `mailto:cerylkeyle28@gmail.com?subject=${subject}&body=${body}`;
    }
    
    function initiateCall() {
        const phoneNumber = '0112277706';
        if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            window.location.href = `tel:${phoneNumber}`;
        } else {
            // Desktop: copy to clipboard
            navigator.clipboard.writeText(phoneNumber).then(function() {
                alert('Phone number copied: ' + phoneNumber);
            }).catch(function() {
                alert('Call us at: ' + phoneNumber);
            });
        }
    }
    
    // ========== Button Handlers ==========
    // All buttons with data-action="contact"
    document.querySelectorAll('[data-action="contact"]').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToContact();
        });
    });
    
    // All buttons with data-action="services"
    document.querySelectorAll('[data-action="services"]').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToServices();
        });
    });
    
    // All buttons with data-action="email"
    document.querySelectorAll('[data-action="email"]').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openEmailClient();
        });
    });
    
    // Navigation CTA
    const navCta = document.querySelector('.nav-cta');
    if (navCta) {
        navCta.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToContact();
        });
    }
    
    // Contact cards
    document.querySelectorAll('.contact-card').forEach(function(card) {
        card.addEventListener('click', function() {
            const phoneLink = card.querySelector('a[href^="tel:"]');
            const emailLink = card.querySelector('a[href^="mailto:"]');
            
            if (phoneLink) {
                initiateCall();
            } else if (emailLink) {
                openEmailClient();
            }
        });
    });
    
    // Phone links
    document.querySelectorAll('a[href^="tel:"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            initiateCall();
        });
    });
    
    // Email links
    document.querySelectorAll('a[href^="mailto:"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openEmailClient();
        });
    });
    
    // Service links (Learn more buttons)
    document.querySelectorAll('.service-link').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToContact();
        });
    });
    
    // ========== Smooth Scroll for Navigation ==========
    document.querySelectorAll('.nav-links a, .footer-links a').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    
                    // Close mobile menu if open
                    if (window.innerWidth <= 768 && navLinks) {
                        navLinks.style.display = 'none';
                    }
                }
            }
        });
    });
    
    // ========== Intersection Observer for Animations ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.service-card, .step, .stat-item, .contact-card').forEach(function(el) {
        observer.observe(el);
    });
    
    // ========== Navbar Scroll Effect ==========
    const nav = document.querySelector('.luxury-nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(10, 10, 10, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.boxShadow = 'none';
        }
    });
    
    // ========== Window Resize Handler ==========
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.backgroundColor = 'transparent';
            navLinks.style.padding = '0';
            navLinks.style.gap = '2.5rem';
            navLinks.style.borderBottom = 'none';
        } else if (window.innerWidth <= 768 && navLinks && navLinks.style.display !== 'none') {
            navLinks.style.display = 'none';
        }
    });
    
    // ========== Remove loading class from any buttons that might have it ==========
    // This ensures no stuck loading states
    
    console.log('CoreLink Technologies - Website loaded successfully');
});
