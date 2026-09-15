const url = 'https://byui-cse.github.io/cse-ww-program-pt/data/profetas-dos-ultimos-dias.json';
const cartoes = document.querySelector('#cartoes');

async function obterDadosDeProfetas() {
  const resposta = await fetch(url);
  const dados = await resposta.json();
  exibirProfetas(dados.profetas);
}

const exibirProfetas = (profetas) => {
  profetas.forEach((profeta) => {
    // Criação dos elementos
    const cartao = document.createElement('section');
    const nomeCompleto = document.createElement('h2');
    const retrato = document.createElement('img');
    const info = document.createElement('p');

    // Conteúdo do nome
    nomeCompleto.textContent = `${profeta.nome} ${profeta.sobrenome}`;

    // Informações adicionais
    info.textContent = `Nascimento: ${profeta.nascimento} | Local: ${profeta.localNascimento} | Filhos: ${profeta.numeroFilhos}`;

    // Atributos da imagem
    retrato.setAttribute('src', profeta.urlImagem);
    retrato.setAttribute('alt', `Retrato de ${profeta.nome} ${profeta.sobrenome}`);
    retrato.setAttribute('loading', 'lazy');
    retrato.setAttribute('width', '340');
    retrato.setAttribute('height', '440');

    // Montagem do cartão
    cartao.appendChild(nomeCompleto);
    cartao.appendChild(info);
    cartao.appendChild(retrato);
    cartoes.appendChild(cartao);
  });
};

obterDadosDeProfetas();
