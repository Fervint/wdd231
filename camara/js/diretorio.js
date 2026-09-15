const url = 'dados/membros.json';
const container = document.querySelector('#membros');
const botaoGrade = document.querySelector('#grade');
const botaoLista = document.querySelector('#lista');

async function carregarMembros() {
  const resposta = await fetch(url);
  const dados = await resposta.json();
  exibirMembros(dados.empresas);
}

function exibirMembros(empresas) {
  container.innerHTML = '';
  empresas.forEach(empresa => {
    const card = document.createElement('section');
    card.innerHTML = `
      <h3>${empresa.nome}</h3>
      <img src="imagens/empresas/${empresa.imagem}" alt="${empresa.nome}">
      <p>${empresa.endereco}</p>
      <p>Tel: ${empresa.telefone}</p>
      <a href="${empresa.site}" target="_blank">Visitar site</a>
    `;
    container.appendChild(card);
  });
}
botaoGrade.addEventListener('click', () => {
  container.className = 'grade';
});
botaoLista.addEventListener('click', () => {
  container.className = 'lista';
});

carregarMembros();

