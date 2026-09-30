const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

if (menuBtn && menu) {
  menuBtn.setAttribute('aria-expanded', 'false');

  menuBtn.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    menuBtn.setAttribute('aria-expanded', String(aberto));
  });

  menu.addEventListener('click', evento => {
    if (evento.target.closest('a')) {
      menu.classList.remove('aberto');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}
