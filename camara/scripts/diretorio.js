const url = 'dados/dados/membros.json';
const container = document.querySelector('#membros');
const botaoGrade = document.querySelector('#grade');
const botaoLista = document.querySelector('#lista');

async function carregarMembros() {
  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();
    exibirMembros(dados.empresas);
  } catch (erro) {
    console.error('Erro ao carregar membros:', erro);
  }
}

function exibirMembros(empresas) {
  container.innerHTML = '';
  empresas.forEach(empresa => {
    const card = document.createElement('section');
    card.setAttribute('nivel', empresa.nivel);

    card.innerHTML = `
      <h3>${empresa.nome}</h3>
      <img src="imagens/empresas/${empresa.imagem}" alt="Logo da empresa ${empresa.nome}" loading="lazy" decoding="async">
      <p><strong>Endereço:</strong> ${empresa.endereco}</p>
      <p><strong>Telefone:</strong> ${empresa.telefone}</p>
      <p><strong>Nível de associação:</strong> ${empresa.nivel == 1 ? 'Membro' : empresa.nivel == 2 ? 'Prata' : 'Ouro'}</p>
      <p>${empresa.descricao}</p>
      <a href="${empresa.site}" target="_blank">🌐 Visitar site</a>
    `;
    container.appendChild(card);
  });
}

// alternância grade/lista
botaoGrade.addEventListener('click', () => {
  container.className = 'grade';
});
botaoLista.addEventListener('click', () => {
  container.className = 'lista';
});

// carregar ao abrir página
carregarMembros();