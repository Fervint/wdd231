document.addEventListener("DOMContentLoaded", () => {
  const cursos = [
    { codigo: 'CSE110', tipo: 'CSE', creditos: 2, status: 'Concluído' },
    { codigo: 'WDD130', tipo: 'WDD', creditos: 2, status: 'Concluído' },
    { codigo: 'WDD131', tipo: 'WDD', creditos: 2, status: 'Concluído' },
    { codigo: 'CSE111', tipo: 'CSE', creditos: 2, status: 'Concluído' },
    { codigo: 'CSE210', tipo: 'CSE', creditos: 2, status: 'Em andamento' },
    { codigo: 'WDD231', tipo: 'WDD', creditos: 2, status: 'Em andamento' }
  ];

  const filtroPadrao = 'Todos';

  function criarListaCursos(lista, container) {
    container.innerHTML = '';

    if (!lista.length) {
      container.innerHTML = '<p>Nenhum curso encontrado para este filtro.</p>';
      return;
    }

    const ul = document.createElement('ul');
    ul.className = 'lista-cursos';

    lista.forEach((curso) => {
      const li = document.createElement('li');
      li.className = curso.status === 'Concluído' ? 'curso concluido' : 'curso';

      li.innerHTML = `
        <strong>${curso.codigo}</strong> (${curso.tipo}) - 
        ${curso.creditos} crédito(s) - <em>${curso.status}</em>
      `;

      li.addEventListener('click', () => alternarStatus(curso.codigo));
      ul.appendChild(li);
    });

    container.appendChild(ul);
  }

  function atualizarResumo(totalCreditos, filtroAtivo) {
    const resumo = document.getElementById('resumo-cursos');
    if (!resumo) return;

    const textoFiltro = filtroAtivo === 'Todos' ? 'todos os cursos' : filtroAtivo;
    document.getElementById('total-cursos').textContent = `Total de créditos (${textoFiltro}): ${totalCreditos}`;
  }

  function renderizarCursos(filtro = filtroPadrao) {
    const container = document.getElementById('lista-cursos');
    if (!container) return;

    const cursosFiltrados = cursos.filter((curso) => filtro === 'Todos' || curso.tipo === filtro);
    criarListaCursos(cursosFiltrados, container);

    const totalCreditos = cursosFiltrados.reduce((soma, curso) => soma + curso.creditos, 0);
    atualizarResumo(totalCreditos, filtro);

    const concluidos = cursos.filter(c => c.status === 'Concluído').reduce((soma, c) => soma + c.creditos, 0);
    const totalPrograma = cursos.reduce((soma, c) => soma + c.creditos, 0);
    const faltam = totalPrograma - concluidos;

    document.getElementById('progresso-cursos').textContent = `Créditos concluídos: ${concluidos} / ${totalPrograma} (faltam ${faltam})`;
  }

  function alternarStatus(codigo) {
    const curso = cursos.find((item) => item.codigo === codigo);
    if (!curso) return;

    curso.status = curso.status === 'Concluído' ? 'Em andamento' : 'Concluído';
    const filtroAtivo = document.querySelector('.filtro-btn.ativo')?.textContent || filtroPadrao;
    renderizarCursos(filtroAtivo);
  }

  function montarFiltros() {
    const filtroContainer = document.getElementById('filtros-cursos');
    if (!filtroContainer) return;

    const opcoes = ['Todos', 'WDD', 'CSE'];
    filtroContainer.innerHTML = '';

    opcoes.forEach((opcao) => {
      const botao = document.createElement('button');
      botao.type = 'button';
      botao.textContent = opcao;
      botao.className = 'filtro-btn';

      if (opcao === filtroPadrao) botao.classList.add('ativo');

      botao.addEventListener('click', () => {
        document.querySelectorAll('.filtro-btn').forEach((btn) => btn.classList.remove('ativo'));
        botao.classList.add('ativo');
        renderizarCursos(opcao);
      });

      filtroContainer.appendChild(botao);
    });
  }

  montarFiltros();
  renderizarCursos();
});
