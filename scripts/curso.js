// Array de cursos do programa.
// O script renderiza a lista, aplica filtros e calcula o total de créditos.

const cursos = [
    { codigo: 'CSE110', tipo: 'CSE', creditos: 2, status: 'Concluído' },
    { codigo: 'WDD130', tipo: 'WDD', creditos: 2, status: 'Concluído' },
    { codigo: 'CSE111', tipo: 'CSE', creditos: 2, status: 'Concluído' },
    { codigo: 'CSE210', tipo: 'CSE', creditos: 2, status: 'Em andamento' },
    { codigo: 'WDD131', tipo: 'WDD', creditos: 2, status: 'Em andamento' },
    { codigo: 'WDD231', tipo: 'WDD', creditos: 2, status: 'Em andamento' }
];

const filtroPadrao = 'Todos';

function criarListaCursos(lista, container) {
    container.innerHTML = '';

    if (!lista.length) {
        const vazio = document.createElement('p');
        vazio.textContent = 'Nenhum curso encontrado para este filtro.';
        container.appendChild(vazio);
        return;
    }

    const ul = document.createElement('ul');
    ul.className = 'lista-cursos';

    lista.forEach((curso) => {
        const li = document.createElement('li');
        li.className = curso.status === 'Concluído' ? 'curso concluido' : 'curso';

        const titulo = document.createElement('span');
        titulo.textContent = `${curso.codigo} (${curso.tipo})`;

        const status = document.createElement('span');
        status.className = 'status';
        status.textContent = curso.status;

        const creditos = document.createElement('span');
        creditos.className = 'creditos';
        creditos.textContent = `${curso.creditos} crédito(s)`;

        li.appendChild(titulo);
        li.appendChild(status);
        li.appendChild(creditos);
        ul.appendChild(li);
    });

    container.appendChild(ul);
}

function atualizarResumo(totalCreditos, filtroAtivo) {
    const resumo = document.getElementById('resumo-cursos');
    if (!resumo) return;

    const textoFiltro = filtroAtivo === 'Todos' ? 'todos os cursos' : filtroAtivo;
    resumo.textContent = `Total de créditos (${textoFiltro}): ${totalCreditos}`;
}

function renderizarCursos(filtro = filtroPadrao) {
    const container = document.getElementById('lista-cursos');
    if (!container) return;

    const cursosFiltrados = cursos.filter((curso) => filtro === 'Todos' || curso.tipo === filtro);

    criarListaCursos(cursosFiltrados, container);

    const totalCreditos = cursosFiltrados.reduce((soma, curso) => soma + curso.creditos, 0);
    atualizarResumo(totalCreditos, filtro);
}

function montarFiltros() {
    const filtroContainer = document.getElementById('filtros-cursos');
    if (!filtroContainer) return;

    const opcoes = ['Todos', 'WDD', 'CSE'];

    opcoes.forEach((opcao) => {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.textContent = opcao;
        botao.dataset.filtro = opcao;
        botao.setAttribute('aria-pressed', String(opcao === filtroPadrao));

        if (opcao === filtroPadrao) {
            botao.classList.add('ativo');
        }

        botao.addEventListener('click', () => {
            document.querySelectorAll('#filtros-cursos button').forEach((item) => {
                item.classList.toggle('ativo', item === botao);
                item.setAttribute('aria-pressed', String(item === botao));
            });
            renderizarCursos(opcao);
        });

        filtroContainer.appendChild(botao);
    });
}

function criarPainelCursos() {
    const main = document.querySelector('main');
    if (!main) return;

    const secaoCursos = document.createElement('section');
    secaoCursos.className = 'secao-cursos';

    const titulo = document.createElement('h2');
    titulo.textContent = 'Cursos do Programa';

    const filtros = document.createElement('div');
    filtros.id = 'filtros-cursos';
    filtros.className = 'filtros-cursos';

    const resumo = document.createElement('p');
    resumo.id = 'resumo-cursos';
    resumo.className = 'resumo-cursos';
    resumo.setAttribute('aria-live', 'polite');

    const lista = document.createElement('div');
    lista.id = 'lista-cursos';
    lista.className = 'lista-cursos-container';

    secaoCursos.appendChild(titulo);
    secaoCursos.appendChild(filtros);
    secaoCursos.appendChild(resumo);
    secaoCursos.appendChild(lista);
    main.appendChild(secaoCursos);

    montarFiltros();
    renderizarCursos();
}

criarPainelCursos();
