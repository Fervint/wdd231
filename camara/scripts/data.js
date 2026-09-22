// Atualiza ano e última modificação em todas as páginas
document.querySelectorAll('#ano').forEach(el => {
  el.textContent = new Date().getFullYear();
});

document.querySelectorAll('#modificacao').forEach(el => {
  const data = new Date(document.lastModified);
  // Formata no estilo brasileiro: DD/MM/YYYY HH:MM
  const formatado = data.toLocaleString('pt-BR');
  el.textContent = formatado;
});
const membrosContainer = document.querySelector('#membros');
const btnGrade = document.querySelector('#grade');
const btnLista = document.querySelector('#lista');

if (btnGrade && btnLista && membrosContainer) {
  btnGrade.addEventListener('click', () => {
    membrosContainer.classList.add('grade');
    membrosContainer.classList.remove('lista');
  });

  btnLista.addEventListener('click', () => {
    membrosContainer.classList.add('lista');
    membrosContainer.classList.remove('grade');
  });
}
