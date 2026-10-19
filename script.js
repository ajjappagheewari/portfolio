/**
 * AJJAPPA GHEEWARI — LUXURY EDITORIAL PORTFOLIO JAVASCRIPT
 * Vanilla ES6+, Modular Architecture, Zero Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. PRELOADER CONTROLLER
     ========================================================================== */
  const initPreloader = () => {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    const hidePreloader = () => {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 700);
    };

    if (document.readyState === 'complete') {
      setTimeout(hidePreloader, 400);
    } else {
      window.addEventListener('load', () => {
        setTimeout(hidePreloader, 400);
      });
      // Safety fallback in case of delayed assets
      setTimeout(hidePreloader, 2200);
    }
  };


  /* ==========================================================================
     3. FLOATING GOLD PARTICLES CANVAS (HERO BACKGROUND)
     ========================================================================== */
  const initParticlesCanvas = () => {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = 0;
    let height = 0;
    let particles = [];
    let isVisible = true;

    const mouse = {
      x: null,
      y: null,
      radius: 120
    };

    const resizeCanvas = () => {
      width = canvas.parentElement.offsetWidth;
      height = canvas.parentElement.offsetHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      createParticles();
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.2 + 0.8;
        this.speedX = (Math.random() - 0.5) * 0.45;
        this.speedY = -Math.random() * 0.5 - 0.2; // Gentle upward drift
        this.alpha = Math.random() * 0.5 + 0.2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulse = Math.random() * Math.PI;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Pulse brightness
        this.pulse += this.pulseSpeed;
        const currentAlpha = this.alpha + Math.sin(this.pulse) * 0.15;

        // Mouse avoidance/attraction subtle response
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= (dx / distance) * force * 1.5;
            this.y -= (dy / distance) * force * 1.5;
          }
        }

        // Boundary wrap
        if (this.y < -10) this.y = height + 10;
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;

        return Math.max(0.08, Math.min(0.75, currentAlpha));
      }

      draw(alpha) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${alpha})`;
        ctx.shadowColor = '#F5C542';
        ctx.shadowBlur = this.size * 3;
        ctx.fill();
        ctx.restore();
      }
    }

    const createParticles = () => {
      particles = [];
      const count = Math.min(Math.floor((width * height) / 18000), 55);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const render = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle connecting constellation lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 95) {
            const lineAlpha = (1 - dist / 95) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        const alpha = p.update();
        p.draw(alpha);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    // Resize observer
    window.addEventListener('resize', resizeCanvas, { passive: true });
    resizeCanvas();
    render();

    // Mouse tracker over hero canvas
    canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }, { passive: true });

    canvas.parentElement.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Pause canvas when out of viewport for optimal 60fps performance
    const heroObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        cancelAnimationFrame(animationFrameId);
        render();
      }
    }, { threshold: 0.05 });

    heroObserver.observe(canvas.parentElement);
  };

  /* ==========================================================================
     4. ANIMATED TYPING EFFECT
     ========================================================================== */
  const initTypingEffect = () => {
    const roleElem = document.getElementById('typingRole');
    if (!roleElem) return;

    const roles = [
      'BCA Student',
      'Aspiring Web Developer',
      'Problem Solver',
      'Software Enthusiast'
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeDelay = 100;

    const typeLoop = () => {
      const currentRole = roles[roleIdx];

      if (isDeleting) {
        roleElem.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typeDelay = 45;
      } else {
        roleElem.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typeDelay = 95;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        // Finished typing word, pause
        typeDelay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        // Finished deleting, move to next role
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeDelay = 450;
      }

      setTimeout(typeLoop, typeDelay);
    };

    setTimeout(typeLoop, 800);
  };

  /* ==========================================================================
     5. STICKY NAVBAR & ACTIVE LINK SPY
     ========================================================================== */
  const initNavbar = () => {
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Scroll styling
    const onScroll = () => {
      if (window.scrollY > 40) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }

      // Highlight active section
      const scrollPos = window.scrollY + 120;
      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  };

  /* ==========================================================================
     6. MOBILE DRAWER NAVIGATION
     ========================================================================== */
  const initMobileMenu = () => {
    const toggleBtn = document.getElementById('mobileMenuToggle');
    const drawer = document.getElementById('mobileDrawer');
    const closeBtn = document.getElementById('mobileDrawerClose');
    const overlay = document.getElementById('mobileOverlay');
    const drawerLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-footer a');

    if (!toggleBtn || !drawer || !overlay) return;

    const openDrawer = () => {
      drawer.classList.add('open');
      overlay.classList.add('active');
      toggleBtn.classList.add('is-active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      drawer.classList.remove('open');
      overlay.classList.remove('active');
      toggleBtn.classList.remove('is-active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      isOpen ? closeDrawer() : openDrawer();
    });

    closeBtn?.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    drawerLinks.forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  };

  /* ==========================================================================
     7. SCROLL REVEAL (INTERSECTION OBSERVER)
     ========================================================================== */
  const initScrollReveal = () => {
    const revealElements = document.querySelectorAll(
      '.reveal-fade, .reveal-slide-left, .reveal-slide-right'
    );

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('reveal-active'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => observer.observe(el));
  };

  /* ==========================================================================
     8. ANIMATED STAT COUNTERS
     ========================================================================== */
  const initAnimatedCounters = () => {
    const counterElements = document.querySelectorAll('.stat-counter');
    if (!counterElements.length) return;

    let hasRun = false;

    const startCounting = () => {
      counterElements.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
        const duration = 1800; // ms
        const startTime = performance.now();

        const updateCount = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.floor(easeProgress * target);

          counter.textContent = currentVal;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            counter.textContent = target;
          }
        };

        requestAnimationFrame(updateCount);
      });
    };

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const observer = new IntersectionObserver(([entry], obs) => {
        if (entry.isIntersecting && !hasRun) {
          hasRun = true;
          startCounting();
          obs.disconnect();
        }
      }, { threshold: 0.25 });

      observer.observe(aboutSection);
    }
  };

  /* ==========================================================================
     9. SKILLS PROGRESS BARS ANIMATION
     ========================================================================== */
  const initSkillsProgress = () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    if (!progressBars.length) return;

    let animated = false;

    const animateBars = () => {
      progressBars.forEach((bar) => {
        const targetWidth = bar.getAttribute('data-width') || '0%';
        bar.style.width = targetWidth;
      });
    };

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      const observer = new IntersectionObserver(([entry], obs) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          animateBars();
          obs.disconnect();
        }
      }, { threshold: 0.2 });

      observer.observe(skillsSection);
    }
  };

  /* ==========================================================================
     10. PROJECT CARDS 3D PERSPECTIVE TILT
     ========================================================================== */
  const initCardTilt = () => {
    // Only on fine mouse devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const cards = document.querySelectorAll('.project-card');

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4.5;
        const rotateY = ((x - centerX) / centerX) * 4.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  };

  /* ==========================================================================
     11. CONTACT FORM VALIDATION & INTERACTIVE SUBMIT
     ========================================================================== */
  const initContactForm = () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const messageInput = document.getElementById('contactMessage');
    const charCount = document.getElementById('charCount');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');
    const toast = document.getElementById('toastNotification');

    // Email regex format validator
    const isValidEmail = (email) => {
      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(email);
    };

    // Live character count
    messageInput?.addEventListener('input', () => {
      const length = messageInput.value.length;
      if (charCount) {
        charCount.textContent = `${length} / 500`;
        charCount.style.color = length >= 480 ? '#FF7875' : 'var(--text-muted)';
      }
    });

    // Realtime field validation
    const validateField = (input, errorElem, condition, errorMsg) => {
      if (!condition) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        if (errorElem) errorElem.textContent = errorMsg;
        return false;
      } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        if (errorElem) errorElem.textContent = '';
        return true;
      }
    };

    nameInput?.addEventListener('input', () => {
      validateField(
        nameInput,
        nameError,
        nameInput.value.trim().length >= 2,
        'Please enter at least 2 characters.'
      );
    });

    emailInput?.addEventListener('input', () => {
      validateField(
        emailInput,
        emailError,
        isValidEmail(emailInput.value.trim()),
        'Please enter a valid email address.'
      );
    });

    messageInput?.addEventListener('input', () => {
      validateField(
        messageInput,
        messageError,
        messageInput.value.trim().length >= 10,
        'Message must contain at least 10 characters.'
      );
    });

    // Show luxury toast notification
    const showToast = () => {
      if (!toast) return;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 5000);
    };

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(
        nameInput,
        nameError,
        nameInput.value.trim().length >= 2,
        'Please enter your full name (minimum 2 characters).'
      );

      const isEmailValid = validateField(
        emailInput,
        emailError,
        isValidEmail(emailInput.value.trim()),
        'Please enter a valid email address (e.g. name@domain.com).'
      );

      const isMessageValid = validateField(
        messageInput,
        messageError,
        messageInput.value.trim().length >= 10,
        'Please provide a detailed message (minimum 10 characters).'
      );

      if (!isNameValid || !isEmailValid || !isMessageValid) {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Please correct the highlighted fields before transmitting.';
        }
        return;
      }

      // Enter loading state
      form.classList.add('is-submitting');
      submitBtn.setAttribute('disabled', 'true');
      if (formStatus) {
        formStatus.className = 'form-status';
        formStatus.textContent = '';
      }

      // Simulate network request
      setTimeout(() => {
        form.classList.remove('is-submitting');
        submitBtn.removeAttribute('disabled');

        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.textContent = 'Message transmitted successfully! I will get back to you shortly.';
        }

        showToast();

        // Reset inputs
        form.reset();
        nameInput.classList.remove('is-valid');
        emailInput.classList.remove('is-valid');
        messageInput.classList.remove('is-valid');
        if (charCount) charCount.textContent = '0 / 500';

        setTimeout(() => {
          if (formStatus) formStatus.textContent = '';
        }, 6000);
      }, 1200);
    });
  };

  /* ==========================================================================
     12. BACK TO TOP BUTTON WITH CIRCULAR SCROLL PROGRESS
     ========================================================================== */
  const initBackToTop = () => {
    const backToTopBtn = document.getElementById('backToTopBtn');
    const circle = document.querySelector('.progress-ring-circle');

    if (!backToTopBtn || !circle) return;

    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    const setProgress = (percent) => {
      const offset = circumference - (percent / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    };

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setProgress(scrollPercent);

      if (scrollTop > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
      } else {
        backToTopBtn.style.opacity = '0.7';
      }
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };

  /* ==========================================================================
     INITIALIZE ALL MODULES
     ========================================================================== */
  initPreloader();
  initParticlesCanvas();
  initTypingEffect();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initAnimatedCounters();
  initSkillsProgress();
  initCardTilt();
  initContactForm();
  initBackToTop();
});
