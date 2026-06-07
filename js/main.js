/* 4ward evolution — Shared JS */

const NAV = {
  home: { de: 'Home', en: 'Home' },
  approach: { de: 'Ansatz', en: 'Approach' },
  portfolio: { de: 'Portfolio', en: 'Portfolio' },
  about: { de: 'Über uns', en: 'About' },
  contact: { de: 'Kontakt', en: 'Contact' }
};

let lang = localStorage.getItem('4we-lang') || 'de';

function setLang(l) {
  lang = l;
  localStorage.setItem('4we-lang', l);
  document.documentElement.lang = l;

  document.querySelectorAll('[data-lang-de],[data-lang-en]').forEach(el => {
    el.style.display = (el.hasAttribute('data-lang-' + l)) ? '' : 'none';
  });

  document.querySelectorAll('[data-nav]').forEach(el => {
    const k = el.getAttribute('data-nav');
    if (NAV[k]) el.textContent = NAV[k][l];
  });

  document.querySelectorAll('.lang-sw button').forEach(b =>
    b.classList.toggle('active', b.dataset.lang === l));
}

document.addEventListener('DOMContentLoaded', () => {
  // Language
  setLang(lang);
  document.querySelectorAll('.lang-sw button').forEach(b =>
    b.addEventListener('click', () => setLang(b.dataset.lang)));

  // Mobile nav
  const tog = document.querySelector('.nav-tog');
  const links = document.querySelector('.nav-links');
  if (tog && links) {
    tog.addEventListener('click', () => {
      tog.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        tog.classList.remove('open');
        links.classList.remove('open');
      }));
  }

  // Navbar scroll
  const nav = document.querySelector('.navbar');
  if (nav) window.addEventListener('scroll', () =>
    nav.classList.toggle('scrolled', scrollY > 40));

  // Fade-in observer
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.fi').forEach(el => obs.observe(el));

  // Contact form
  const form = document.querySelector('.contact-form');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    btn.textContent = lang === 'de' ? 'Gesendet ✓' : 'Sent ✓';
    setTimeout(() => { btn.textContent = lang === 'de' ? 'Nachricht senden' : 'Send message'; form.reset(); }, 3000);
  });

});
