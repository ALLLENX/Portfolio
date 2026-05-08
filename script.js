// ---------- Year ----------
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// ---------- Theme toggle ----------
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('.theme-icon');
const savedTheme = localStorage.getItem('theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const initialTheme = savedTheme || (prefersLight ? 'light' : 'dark');

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  if (!themeToggle || !themeIcon) return;

  const isLight = theme === 'light';
  themeToggle.setAttribute('aria-pressed', String(isLight));
  themeToggle.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} theme`);
  themeIcon.textContent = isLight ? '☀' : '☾';
}

setTheme(initialTheme);
themeToggle?.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', nextTheme);
  setTheme(nextTheme);
});

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

// ---------- Copy email ----------
const copyEmail = document.getElementById('copyEmail');
const copyStatus = document.getElementById('copyStatus');
copyEmail?.addEventListener('click', async () => {
  const email = copyEmail.dataset.email;
  if (!email) return;

  try {
    await navigator.clipboard.writeText(email);
    if (copyStatus) copyStatus.textContent = 'Email copied';
  } catch {
    if (copyStatus) copyStatus.textContent = email;
  }

  window.setTimeout(() => {
    if (copyStatus) copyStatus.textContent = 'One-click email copy';
  }, 2200);
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
