const dataHora = document.getElementById('datahora');
if (dataHora) {
  dataHora.value = new Date().toLocaleString('pt-BR');
}

const abrirModais = document.querySelectorAll('.abrir-modal');
const fecharModais = document.querySelectorAll('.fechar-modal');
let botaoAnterior;

function fecharModal(modal) {
  if (!modal) return;

  modal.classList.remove('ativo');
  document.body.classList.remove('modal-aberto');
  botaoAnterior?.focus();
}

abrirModais.forEach(botao => {
  botao.addEventListener('click', () => {
    const modal = document.getElementById(botao.dataset.modal);
    if (!modal) return;

    botaoAnterior = botao;
    modal.classList.add('ativo');
    document.body.classList.add('modal-aberto');
    modal.querySelector('.fechar-modal')?.focus();
  });
});

fecharModais.forEach(botao => {
  botao.addEventListener('click', () => {
    fecharModal(botao.closest('.modal'));
  });
});

document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', evento => {
    if (evento.target === modal) fecharModal(modal);
  });
});

window.addEventListener('keydown', evento => {
  if (evento.key === 'Escape') {
    document.querySelectorAll('.modal.ativo').forEach(fecharModal);
  }
});