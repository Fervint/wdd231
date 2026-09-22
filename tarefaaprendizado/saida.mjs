export function definirTitulo(curso) {
  document.querySelector("#tituloCurso").textContent = curso.titulo;
}

export function renderizarSecoes(secoes) {
  const tbody = document.querySelector("#listaSecoes tbody");
  tbody.innerHTML = "";
  secoes.forEach(secao => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${secao.numero}</td>
      <td>${secao.matriculados}</td>
      <td>${secao.instrutor}</td>
    `;
    tbody.appendChild(linha);
  });
}
