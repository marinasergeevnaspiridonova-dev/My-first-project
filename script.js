const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.nav');
const navigationLinks = document.querySelectorAll('.nav__link');

function closeMenu() {
  menuButton.classList.remove('is-open');
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Открыть меню');
}

menuButton.addEventListener('click', () => {
  const willOpen = !navigation.classList.contains('is-open');
  menuButton.classList.toggle('is-open', willOpen);
  navigation.classList.toggle('is-open', willOpen);
  menuButton.setAttribute('aria-expanded', String(willOpen));
  menuButton.setAttribute('aria-label', willOpen ? 'Закрыть меню' : 'Открыть меню');
});

navigationLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('click', (event) => {
  if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});

const sections = document.querySelectorAll('main section[id]');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navigationLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: '-35% 0px -55%' },
);

sections.forEach((section) => observer.observe(section));
document.querySelector('#year').textContent = new Date().getFullYear();
