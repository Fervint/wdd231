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

document.querySelector('main')?.addEventListener('click', evento => {
  const imagem = evento.target.closest('img');
  if (!imagem) return;

  document.querySelectorAll('main img.imagem-ampliada').forEach(imagemAberta => {
    if (imagemAberta === imagem) return;

    imagemAberta.classList.remove('imagem-ampliada');
    if (imagemAberta.getAttribute('role') === 'button') {
      imagemAberta.setAttribute('aria-expanded', 'false');
      imagemAberta.setAttribute('aria-label', `Ampliar imagem: ${imagemAberta.alt}`);
    }
  });

  const ampliada = imagem.classList.toggle('imagem-ampliada');
  if (imagem.getAttribute('role') === 'button') {
    imagem.setAttribute('aria-expanded', String(ampliada));
    imagem.setAttribute('aria-label', `${ampliada ? 'Reduzir' : 'Ampliar'} imagem: ${imagem.alt}`);
  }
});

document.querySelector('main')?.addEventListener('keydown', evento => {
  const imagem = evento.target.closest('img[role="button"]');
  if (!imagem || (evento.key !== 'Enter' && evento.key !== ' ')) return;

  evento.preventDefault();
  imagem.click();
});
