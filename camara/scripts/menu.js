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

document.addEventListener('click', evento => {
  const imagem = evento.target.closest('main img');
  if (!imagem) return;

  imagem.classList.toggle('imagem-ampliada');
  imagem.setAttribute('aria-label', imagem.classList.contains('imagem-ampliada')
    ? 'Imagem ampliada. Clique para reduzir.'
    : 'Imagem reduzida. Clique para ampliar.');
});
