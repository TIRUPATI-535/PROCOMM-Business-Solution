// ============ HEADER SHRINK ON SCROLL ============
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('shrink', window.scrollY > 24);
  }, { passive: true });
}

// ============ MOBILE NAV TOGGLE ============
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('navMenu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  }));
}

// ============ SCROLL REVEAL (cards) ============
const revealEls = document.querySelectorAll('.card, .team-card, .pillar, .cat-item');
if ('IntersectionObserver' in window && revealEls.length) {
  revealEls.forEach(el => el.classList.add('reveal-target'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in'), i * 70);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// ============ ZOOM-ON-CLICK CARDS & PHOTOS ============
// Click any .zoom-card or .photo-frame to toggle a slightly zoomed / shadowed "active" state.
// Works alongside the CSS :hover effect, and is what drives the effect on touch devices.
document.querySelectorAll('.zoom-card, .photo-frame').forEach(card => {
  card.setAttribute('tabindex', card.getAttribute('tabindex') || '0');
  const activate = () => {
    const wasActive = card.classList.contains('is-active');
    document.querySelectorAll('.zoom-card.is-active, .photo-frame.is-active').forEach(c => c.classList.remove('is-active'));
    if (!wasActive) card.classList.add('is-active');
  };
  card.addEventListener('click', (e) => { e.stopPropagation(); activate(); });
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); activate(); }
  });
});

// ============ ABOUT PAGE TABS (History / Team / Mission) ============
const tabBtns = document.querySelectorAll('.tab-btn');
if (tabBtns.length) {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.setAttribute('aria-selected', b === btn ? 'true' : 'false'));
      document.querySelectorAll('.tab-panel').forEach(p => {
        p.classList.toggle('is-visible', p.id === target);
      });
    });
  });
}

// ============ CONTACT FORM (front-end only demo) ============
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Message noted ✓';
    setTimeout(() => { btn.textContent = original; contactForm.reset(); }, 2200);
  });
}
