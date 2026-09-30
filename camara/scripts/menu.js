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

// Controle dos modais
const abrirModais = document.querySelectorAll('.abrir-modal');
const fecharModais = document.querySelectorAll('.fechar-modal');

abrirModais.forEach(botao => {
  botao.addEventListener('click', () => {
    const modal = document.getElementById(botao.dataset.modal);
    if (!modal) return;
    modal.classList.add('ativo');
  });
});

fecharModais.forEach(botao => {
  botao.addEventListener('click', () => {
    const modal = botao.closest('.modal');
    if (!modal) return;
    modal.classList.remove('ativo');
  });
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('ativo'));
  }
});
