// ---------- Year ----------
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// ---------- Typewriter ----------
const phrases = [
  'web experiences.',
  'full-stack apps.',
  'blockchain systems.',
  'beautiful UIs.'
];
const typed = document.getElementById('typed');
let pi = 0, ci = 0, deleting = false;
function tick() {
  if (!typed) return;
  const word = phrases[pi];
  typed.textContent = word.slice(0, ci);
  if (!deleting && ci < word.length) { ci++; setTimeout(tick, 80); }
  else if (deleting && ci > 0) { ci--; setTimeout(tick, 40); }
  else {
    deleting = !deleting;
    if (!deleting) pi = (pi + 1) % phrases.length;
    setTimeout(tick, deleting ? 1400 : 200);
  }
}
if (typed) tick();

// ---------- Nav scroll state ----------
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 20);
});

// ---------- Mobile menu ----------
const toggle = document.getElementById('navToggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
}

// ---------- Reveal on scroll ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- Skill card spotlight ----------
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});

// ---------- Smooth active link ----------
const sections = document.querySelectorAll('section[id], header[id]');
const navAs = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) cur = s.id;
  });
  navAs.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${cur}` ? 'var(--text)' : '';
  });
});
