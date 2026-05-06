/* ===========================================
   MG SEGURIDAD — JavaScript
   =========================================== */

(function () {
  'use strict';

  /* ---- Navbar scroll ---- */
  const navbar   = document.getElementById('navbar');
  const backTop  = document.getElementById('backTop');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 50);
    backTop.classList.toggle('show', y > 400);
    setActiveNavLink();
  }, { passive: true });

  /* ---- Hamburger ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    const icon = hamburger.querySelector('i');
    icon.className = open ? 'fas fa-times' : 'fas fa-bars';
    hamburger.setAttribute('aria-expanded', String(open));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelector('i').className = 'fas fa-bars';
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---- Active nav link on scroll ---- */
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navItems = Array.from(document.querySelectorAll('.nav-links a'));

  function setActiveNavLink() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navItems.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  }

  /* ---- Scroll-triggered fade animations ---- */
  const fadeEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  const addStaggerDelay = (selector, step = 100) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.style.transitionDelay = `${i * step}ms`;
    });
  };

  addStaggerDelay('.services-grid .srv-card',    100);
  addStaggerDelay('.sectors-grid .sector-item',   80);
  addStaggerDelay('.why-grid .why-item',          100);
  addStaggerDelay('.testi-grid .testi-card',      120);
  addStaggerDelay('.about-stats .stat-box',        80);

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => fadeObserver.observe(el));

  /* ---- Feature bar animation ---- */
  const featureItems = document.querySelectorAll('.feature-item');
  featureItems.forEach((el, i) => { el.style.transitionDelay = `${i * 120}ms`; el.style.transition = 'opacity 0.6s ease, transform 0.6s ease, background 0.3s ease'; });

  const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        featureObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  featureItems.forEach(el => featureObserver.observe(el));

  /* ---- Counter animation ---- */
  const statNums = document.querySelectorAll('.stat-num');

  const animateCounter = (el) => {
    const target  = parseInt(el.dataset.target, 10);
    const suffix  = el.dataset.suffix || '';
    const duration = 1800;
    const step     = duration / 60;
    let count      = 0;

    const tick = () => {
      count += target / (duration / 16);
      if (count >= target) {
        el.textContent = target + suffix;
      } else {
        el.textContent = Math.floor(count) + suffix;
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => counterObserver.observe(el));

  /* ---- Hero slider ---- */
  const slides = [
    {
      badge: '<i class="fas fa-clock"></i> SERVICIOS DE SEGURIDAD 24/7',
      title: 'Una empresa de seguridad <span>local, independiente</span> y de calidad',
      text:  'Protegemos lo que más te importa con profesionalismo, tecnología y dedicación absoluta.'
    },
    {
      badge: '<i class="fas fa-shield-halved"></i> PROTECCIÓN TOTAL',
      title: 'Soluciones de seguridad <span>integrales y personalizadas</span> para tu negocio',
      text:  'Más de 10 años de experiencia protegiendo empresas e individuos en toda la región.'
    },
    {
      badge: '<i class="fas fa-bolt"></i> RESPUESTA INMEDIATA',
      title: 'Guardias de seguridad <span>disponibles</span> cuando más los necesitás',
      text:  'Despacho de emergencia en menos de una hora, los 365 días del año, sin excepciones.'
    }
  ];

  let currentSlide  = 0;
  const heroH1    = document.querySelector('.hero-content h1');
  const heroP     = document.querySelector('.hero-content > p');
  const heroBadge = document.querySelector('.hero-badge');

  const FADE_MS = 280;

  function goToSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    const s = slides[currentSlide];

    heroBadge.style.opacity = '0';
    heroH1.style.opacity    = '0';
    heroP.style.opacity     = '0';

    setTimeout(() => {
      heroBadge.innerHTML = s.badge;
      heroH1.innerHTML    = s.title;
      heroP.textContent   = s.text;

      heroBadge.style.opacity = '1';
      heroH1.style.opacity    = '1';
      heroP.style.opacity     = '1';
    }, FADE_MS);
  }

  document.getElementById('heroPrev').addEventListener('click', () => goToSlide(currentSlide - 1));
  document.getElementById('heroNext').addEventListener('click', () => goToSlide(currentSlide + 1));

  let autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5500);

  // Pause auto-slide on hover
  const hero = document.querySelector('.hero');
  hero.addEventListener('mouseenter', () => clearInterval(autoSlide));
  hero.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5500);
  });

  /* ---- Contact form ---- */
  const contactForm   = document.getElementById('contactForm');
  const formSuccess   = document.getElementById('formSuccess');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;

    btn.disabled  = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

    // Simulate async send
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje Enviado!';
      btn.style.background = '#27ae60';
      formSuccess.textContent = 'Gracias por contactarnos. Nos comunicaremos a la brevedad.';
      contactForm.reset();

      setTimeout(() => {
        btn.disabled  = false;
        btn.innerHTML = orig;
        btn.style.background = '';
        formSuccess.textContent = '';
      }, 4500);
    }, 1200);
  });

  /* ---- Back to top ---- */
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Smooth anchor clicks (catch all) ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72);
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

})();
