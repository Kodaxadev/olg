'use strict';
document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#mobile-menu');
if (toggle && menu) {
  const close = (restoreFocus = false) => {
    toggle.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
    if (restoreFocus) toggle.focus();
  };
  toggle.addEventListener('click', () => {
    const opening = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(opening));
    menu.hidden = !opening;
  });
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) close(true);
  });
  document.addEventListener('click', (event) => {
    if (!menu.hidden && !menu.contains(event.target) && !toggle.contains(event.target)) close();
  });
  const desktop = matchMedia('(min-width: 901px)');
  desktop.addEventListener('change', (event) => { if (event.matches) close(); });
}
// Defense in depth: this preview must never submit an inquiry, including by Enter.
for (const form of document.querySelectorAll('form')) {
  form.addEventListener('submit', (event) => event.preventDefault());
}
