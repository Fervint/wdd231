const nomeNivel = {
  1: 'Membro',
  2: 'Prata',
  3: 'Ouro'
};

fetch('dados/dados/membros.json')
  .then(res => {
    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    const container = document.querySelector('.cards-destaques');
    const destaque = data.empresas
      .filter(empresa => empresa.nivel === 2 || empresa.nivel === 3)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    destaque.forEach(empresa => {
      const card = document.createElement('article');
      card.classList.add('card');
      card.dataset.nivel = empresa.nivel;
      card.innerHTML = `
        <img src="imagens/empresas/${empresa.imagem}" alt="Logo ${empresa.nome}">
        <h3>${empresa.nome}</h3>
        <p><strong>Nível:</strong> ${nomeNivel[empresa.nivel]}</p>
        <p>${empresa.descricao}</p>
        <a href="${empresa.site}" target="_blank" rel="noopener">Visitar site</a>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error('Erro ao carregar empresas:', err));
