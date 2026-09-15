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
