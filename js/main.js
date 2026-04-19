/* ============================================
   4ward Evolution — Main JavaScript
   ============================================ */

// --- Language Data ---
const translations = {
  nav: {
    home: { de: 'Home', en: 'Home' },
    approach: { de: 'Beratungsansatz', en: 'Approach' },
    portfolio: { de: 'Portfolio', en: 'Portfolio' },
    about: { de: '\u00dcber uns', en: 'About Us' },
    contact: { de: 'Kontakt', en: 'Contact' }
  }
};

// --- Language Switch ---
let currentLang = localStorage.getItem('4we-lang') || 'de';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('4we-lang', lang);

  // Toggle visibility
  document.querySelectorAll('[data-de]').forEach(el => {
    el.textContent = el.getAttribute('data-' + lang);
  });

  document.querySelectorAll('[data-lang-de], [data-lang-en]').forEach(el => {
    const elLang = el.hasAttribute('data-lang-de') ? 'de' : 'en';
    el.style.display = elLang === lang ? '' : 'none';
  });

  // Update nav labels
  document.querySelectorAll('[data-nav-key]').forEach(el => {
    const key = el.getAttribute('data-nav-key');
    if (translations.nav[key]) {
      el.textContent = translations.nav[key][lang];
    }
  });

  // Update lang switch buttons
  document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Update html lang attribute
  document.documentElement.lang = lang;
}

// --- Mobile Navigation ---
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('open');
  });

  // Close on link click
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('open');
    });
  });
}

// --- Scroll Effects ---
function initScrollEffects() {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
  });
}

// --- Intersection Observer for Animations ---
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// --- Active Nav Link ---
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length === 0 || navLinks.length === 0) return;

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

// --- Contact Form ---
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log('Form submitted:', data);

    // Show success message
    const btn = form.querySelector('.btn');
    const originalText = btn.textContent;
    btn.textContent = currentLang === 'de' ? 'Nachricht gesendet!' : 'Message sent!';
    btn.style.background = 'var(--green-mid)';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollEffects();
  initAnimations();
  initActiveNav();
  initContactForm();

  // Set initial language
  setLanguage(currentLang);

  // Language switch handlers
  document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
  });
});
