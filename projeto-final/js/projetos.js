import { inicializarSite } from "./site.js";

inicializarSite();

const grade = document.querySelector("#lista-projetos");
const estado = document.querySelector("#estado-projetos");
const busca = document.querySelector("#busca-projetos");
const filtroCategoria = document.querySelector("#filtro-categoria");
const botaoSalvos = document.querySelector("#filtro-salvos");
const totalSalvos = document.querySelector("#total-salvos");
const modal = document.querySelector("#modal-projeto");
const modalTitulo = document.querySelector("#modal-titulo");
const modalDados = document.querySelector("#modal-dados");
const modalDescricao = document.querySelector("#modal-descricao");
const chaveSalvos = "fr-criatt-projetos-salvos-v1";
let projetos = [];
let projetosSalvos = new Set();
let mostrarApenasSalvos = false;
let avisoArmazenamento = "";

function exibirErro(mensagem, erro) {
    console.error(mensagem, erro);
    estado.textContent = mensagem;
    estado.classList.add("estado-erro");
}

function lerProjetosSalvos() {
    try {
        const conteudo = window.localStorage.getItem(chaveSalvos);
        if (!conteudo) return new Set();

        const ids = JSON.parse(conteudo);
        if (!Array.isArray(ids) || !ids.every((id) => typeof id === "string")) {
            throw new TypeError("A lista de projetos salvos tem um formato inválido.");
        }

        return new Set(ids);
    } catch (erro) {
        avisoArmazenamento = "Não foi possível ler os projetos salvos. Os favoritos podem não estar disponíveis.";
        exibirErro("Não foi possível ler seus projetos salvos. Você ainda pode explorar a lista.", erro);
        return new Set();
    }
}

function atualizarContagemSalvos() {
    totalSalvos.textContent = String(projetosSalvos.size);
    botaoSalvos.setAttribute("aria-pressed", String(mostrarApenasSalvos));
    botaoSalvos.firstChild.textContent = mostrarApenasSalvos ? "Ver todos " : "Ver salvos ";
}

function criarCampoDetalhe(rotulo, valor) {
    const termo = document.createElement("dt");
    const definicao = document.createElement("dd");
    termo.textContent = rotulo;
    definicao.textContent = valor;
    modalDados.append(termo, definicao);
}

function abrirDetalhes(projeto) {
    modalTitulo.textContent = projeto.titulo;
    modalDados.replaceChildren();
    criarCampoDetalhe("Categoria", projeto.categoria);
    criarCampoDetalhe("Ferramentas", projeto.ferramentas);
    criarCampoDetalhe("Etapa", projeto.etapa);
    modalDescricao.textContent = projeto.descricao;
    modal.showModal();
}

function alternarSalvo(projeto) {
    const estavaSalvo = projetosSalvos.has(projeto.id);

    try {
        if (estavaSalvo) {
            projetosSalvos.delete(projeto.id);
        } else {
            projetosSalvos.add(projeto.id);
        }

        window.localStorage.setItem(chaveSalvos, JSON.stringify([...projetosSalvos]));
    } catch (erro) {
        if (estavaSalvo) {
            projetosSalvos.add(projeto.id);
        } else {
            projetosSalvos.delete(projeto.id);
        }
        exibirErro("Não foi possível atualizar os projetos salvos neste navegador.", erro);
        return;
    }

    atualizarContagemSalvos();
    renderizarProjetos();
}

function criarCartao(projeto) {
    const cartao = document.createElement("article");
    const categoria = document.createElement("p");
    const titulo = document.createElement("h2");
    const descricao = document.createElement("p");
    const ferramenta = document.createElement("p");
    const etapa = document.createElement("p");
    const acoes = document.createElement("div");
    const detalhes = document.createElement("button");
    const salvar = document.createElement("button");
    const salvo = projetosSalvos.has(projeto.id);

    cartao.className = "cartao-projeto";
    cartao.dataset.id = projeto.id;
    categoria.className = "projeto-categoria";
    categoria.textContent = projeto.categoria;
    titulo.textContent = projeto.titulo;
    descricao.textContent = projeto.descricao;
    ferramenta.className = "projeto-meta";
    const rotuloFerramenta = document.createElement("strong");
    rotuloFerramenta.textContent = "Prática: ";
    ferramenta.append(rotuloFerramenta, projeto.ferramentas);
    etapa.className = "projeto-meta";
    const rotuloEtapa = document.createElement("strong");
    rotuloEtapa.textContent = "Status: ";
    etapa.append(rotuloEtapa, projeto.etapa);
    acoes.className = "projeto-acoes";

    detalhes.type = "button";
    detalhes.className = "botao botao-destaque";
    detalhes.textContent = "Ver detalhes";
    detalhes.setAttribute("aria-label", `Ver detalhes de ${projeto.titulo}`);
    detalhes.addEventListener("click", () => abrirDetalhes(projeto));

    salvar.type = "button";
    salvar.className = "botao botao-contorno salvar-projeto";
    salvar.textContent = salvo ? "Salvo ★" : "Salvar ☆";
    salvar.setAttribute("aria-pressed", String(salvo));
    salvar.setAttribute("aria-label", `${salvo ? "Remover dos salvos" : "Salvar"}: ${projeto.titulo}`);
    salvar.addEventListener("click", () => alternarSalvo(projeto));

    acoes.append(detalhes, salvar);
    cartao.append(categoria, titulo, descricao, ferramenta, etapa, acoes);
    return cartao;
}

function renderizarProjetos() {
    const termo = busca.value.trim().toLocaleLowerCase("pt-BR");
    const categoria = filtroCategoria.value;
    const filtrados = projetos.filter((projeto) => {
        const correspondeTexto = [
            projeto.titulo,
            projeto.categoria,
            projeto.ferramentas,
            projeto.descricao
        ].some((valor) => valor.toLocaleLowerCase("pt-BR").includes(termo));
        const correspondeCategoria = categoria === "todas" || projeto.categoria === categoria;
        const correspondeSalvos = !mostrarApenasSalvos || projetosSalvos.has(projeto.id);
        return correspondeTexto && correspondeCategoria && correspondeSalvos;
    });

    grade.replaceChildren(...filtrados.map(criarCartao));
    estado.classList.toggle("estado-erro", Boolean(avisoArmazenamento));
    const resumo = filtrados.length
        ? `${filtrados.length} ${filtrados.length === 1 ? "conceito encontrado" : "conceitos encontrados"}. Todos são ideias de estudo, não trabalhos concluídos.`
        : "Nenhuma ideia corresponde aos filtros. Ajuste a busca, a categoria ou os salvos.";
    estado.textContent = avisoArmazenamento ? `${avisoArmazenamento} ${resumo}` : resumo;
}

async function carregarProjetos() {
    try {
        const resposta = await fetch("./dados/projetos.json");
        if (!resposta.ok) {
            throw new Error(`Falha ao carregar os conceitos (HTTP ${resposta.status}).`);
        }

        const dados = await resposta.json();
        if (!Array.isArray(dados.projetos) || dados.projetos.length < 15) {
            throw new TypeError("O arquivo de dados precisa conter pelo menos 15 conceitos.");
        }

        projetos = dados.projetos;
        projetosSalvos = lerProjetosSalvos();

        const categorias = [...new Set(projetos.map((projeto) => projeto.categoria))]
            .sort((a, b) => a.localeCompare(b, "pt-BR"));

        categorias.forEach((categoria) => {
            const opcao = document.createElement("option");
            opcao.value = categoria;
            opcao.textContent = categoria;
            filtroCategoria.appendChild(opcao);
        });

        atualizarContagemSalvos();
        renderizarProjetos();
    } catch (erro) {
        exibirErro("Não foi possível carregar as ideias. Confira a conexão e tente recarregar a página.", erro);
    }
}

busca.addEventListener("input", renderizarProjetos);
filtroCategoria.addEventListener("change", renderizarProjetos);
botaoSalvos.addEventListener("click", () => {
    mostrarApenasSalvos = !mostrarApenasSalvos;
    atualizarContagemSalvos();
    renderizarProjetos();
});

carregarProjetos();
