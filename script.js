// ========== CoreLink Technologies - Professional Script ==========
// Author: CoreLink Team
// Version: 2.0

(function() {
    'use strict';

    // ========== DOM Elements ==========
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('.luxury-nav');
    
    // ========== Button Elements ==========
    const primaryBtns = document.querySelectorAll('.btn-primary');
    const secondaryBtns = document.querySelectorAll('.btn-secondary');
    const contactBtn = document.querySelector('.btn-primary.large');
    const navCta = document.querySelector('.nav-cta');

    // ========== Professional Button Handlers ==========
    
    /**
     * Handle button click with loading state
     * @param {HTMLElement} button - The button element clicked
     * @param {Function} action - Async function to execute
     */
    async function handleButtonClick(button, action) {
        if (!button || button.classList.contains('loading')) return;
        
        // Add loading state
        const originalText = button.innerHTML;
        button.classList.add('loading');
        button.style.pointerEvents = 'none';
        
        try {
            await action(button);
            
            // Show success state momentarily
            button.classList.remove('loading');
            button.classList.add('success');
            button.innerHTML = originalText;
            
            setTimeout(() => {
                button.classList.remove('success');
            }, 2000);
            
        } catch (error) {
            console.error('Button action failed:', error);
            button.classList.remove('loading');
            button.style.pointerEvents = 'auto';
            
            // Optional: Show error state
            button.style.background = 'linear-gradient(135deg, #EF4444, #DC2626)';
            setTimeout(() => {
                button.style.background = '';
            }, 2000);
        }
    }

    /**
     * Scroll to contact section smoothly
     */
    function scrollToContact() {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    /**
     * Scroll to services section
     */
    function scrollToServices() {
        const servicesSection = document.querySelector('#services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    /**
     * Open email client with professional template
     */
    function openEmailClient() {
        const subject = encodeURIComponent('Inquiry from CoreLink Website');
        const body = encodeURIComponent(
            'Hello CoreLink Technologies Team,\n\n' +
            'I came across your website and would like to learn more about your services.\n\n' +
            'Please get back to me at your earliest convenience.\n\n' +
            'Best regards,\n' +
            '[Your Name]\n' +
            '[Your Company]\n' +
            '[Your Phone Number]'
        );
        window.location.href = `mailto:cerylkeyle28@gmail.com?subject=${subject}&body=${body}`;
    }

    /**
     * Initiate phone call (mobile) or show number (desktop)
     */
    function initiateCall() {
        const phoneNumber = '0112277706';
        if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            window.location.href = `tel:${phoneNumber}`;
        } else {
            // Desktop: copy to clipboard
            navigator.clipboard.writeText(phoneNumber).then(() => {
                showToast('Phone number copied: ' + phoneNumber);
            }).catch(() => {
                alert(`Call us at: ${phoneNumber}`);
            });
        }
    }

    /**
     * Show toast notification for desktop users
     */
    function showToast(message) {
        // Remove existing toast
        const existingToast = document.querySelector('.corelink-toast');
        if (existingToast) existingToast.remove();
        
        // Create toast
        const toast = document.createElement('div');
        toast.className = 'corelink-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--gold);
            color: var(--dark);
            padding: 12px 24px;
            border-radius: 50px;
            font-weight: 600;
            z-index: 10000;
            animation: slideUp 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;
        
        // Add animation keyframes if not present
        if (!document.querySelector('#toast-keyframes')) {
            const style = document.createElement('style');
            style.id = 'toast-keyframes';
            style.textContent = `
                @keyframes slideUp {
                    from { opacity: 0; transform: translateX(-50%) translateY(20px); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
                @keyframes slideDown {
                    from { opacity: 1; transform: translateX(-50%) translateY(0); }
                    to { opacity: 0; transform: translateX(-50%) translateY(20px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    /**
     * Submit contact form (placeholder for future integration)
     */
    async function submitContactForm(button) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted successfully');
                // Here you would integrate with your backend or email service
                // Example: fetch('/api/contact', { method: 'POST', body: formData })
                resolve();
            }, 1500);
        });
    }

    // ========== Event Listeners ==========
    
    // Primary buttons (Get in touch, Launch project)
    primaryBtns.forEach(btn => {
        // Skip if it's the contact button (handled separately)
        if (btn.classList.contains('large')) return;
        
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            handleButtonClick(btn, async () => {
                scrollToContact();
                return Promise.resolve();
            });
        });
    });
    
    // Secondary buttons (View our work, Our Services)
    secondaryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            handleButtonClick(btn, async () => {
                scrollToServices();
                return Promise.resolve();
            });
        });
    });
    
    // Large CTA button (Schedule consultation / Get in Touch)
    if (contactBtn) {
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleButtonClick(contactBtn, async () => {
                openEmailClient();
                return Promise.resolve();
            });
        });
    }
    
    // Navigation CTA
    if (navCta) {
        navCta.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToContact();
        });
    }
    
    // Phone number links (if any on the page)
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            initiateCall();
        });
    });
    
    // Contact cards click handlers
    document.querySelectorAll('.contact-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const phoneLink = card.querySelector('a[href^="tel:"]');
            const emailLink = card.querySelector('a[href^="mailto:"]');
            
            if (phoneLink) {
                e.preventDefault();
                initiateCall();
            } else if (emailLink) {
                e.preventDefault();
                openEmailClient();
            }
        });
    });

    // ========== Mobile Menu ==========
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
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

    // ========== Smooth Scroll for All Anchor Links ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768 && navLinks) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // ========== Intersection Observer for Animations ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for fade-in
    document.querySelectorAll('.service-card, .step, .hero-content, .stat-item, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ========== Navbar Scroll Effect ==========
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(10, 10, 10, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.boxShadow = 'none';
        }
    });

    // ========== Window Resize Handler ==========
    window.addEventListener('resize', () => {
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

    // ========== Keyboard Navigation Support ==========
    document.addEventListener('keydown', (e) => {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navLinks && navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        }
    });

    // ========== Analytics Tracking (Optional - Add your GA ID) ==========
    function trackButtonClick(buttonName, buttonLocation) {
        console.log(`Analytics: ${buttonName} clicked at ${buttonLocation}`);
        // Uncomment when you have Google Analytics
        // gtag('event', 'button_click', { 'button_name': buttonName, 'location': buttonLocation });
    }

    // Add tracking to all buttons
    document.querySelectorAll('button, .btn-primary, .btn-secondary, .nav-cta').forEach(btn => {
        btn.addEventListener('click', () => {
            const btnText = btn.innerText || btn.textContent;
            trackButtonClick(btnText, window.location.pathname);
        });
    });

    // ========== Expose functions globally for inline handlers ==========
    window.scrollToContact = scrollToContact;
    window.scrollToServices = scrollToServices;
    window.openEmail = openEmailClient;
    window.initiateCall = initiateCall;

    console.log('CoreLink Technologies - Website initialized. Professional buttons ready.');
})();
