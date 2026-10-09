import { locais } from "../dados/dados/dados.mjs";

const galeria = document.querySelector("#galeria");
const mensagem = document.querySelector("#mensagem");

function abrirDetalhes(local, botao) {
    const modal = document.createElement("div");
    const conteudo = document.createElement("div");
    const titulo = document.createElement("h3");
    const endereco = document.createElement("p");
    const descricao = document.createElement("p");
    const fechar = document.createElement("button");

    modal.className = "modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "titulo-detalhes-local");
    conteudo.className = "modal-conteudo";
    titulo.id = "titulo-detalhes-local";
    titulo.textContent = local.nome;
    endereco.textContent = `Endereço: ${local.endereco}`;
    descricao.textContent = local.descricao;
    fechar.type = "button";
    fechar.className = "fechar-modal";
    fechar.setAttribute("aria-label", "Fechar detalhes");
    fechar.textContent = "×";

    conteudo.append(fechar, titulo, endereco, descricao);
    modal.appendChild(conteudo);
    document.body.appendChild(modal);
    modal.classList.add("ativo");
    document.body.classList.add("modal-aberto");
    fechar.focus();

    function fecharDetalhes() {
        modal.remove();
        document.body.classList.remove("modal-aberto");
        botao.focus();
        document.removeEventListener("keydown", aoPressionarTecla);
    }

    function aoPressionarTecla(evento) {
        if (evento.key === "Escape") fecharDetalhes();
    }

    fechar.addEventListener("click", fecharDetalhes);
    modal.addEventListener("click", (evento) => {
        if (evento.target === modal) fecharDetalhes();
    });
    document.addEventListener("keydown", aoPressionarTecla);
}

locais.forEach((local) => {
    const card = document.createElement("article");
    const titulo = document.createElement("h2");
    const figura = document.createElement("figure");
    const imagem = document.createElement("img");
    const endereco = document.createElement("figcaption");
    const botao = document.createElement("button");

    card.className = "card";
    titulo.textContent = local.nome;
    imagem.src = local.imagem;
    imagem.alt = `Imagem ilustrativa de ${local.nome}`;
    imagem.loading = "lazy";
    imagem.decoding = "async";
    endereco.textContent = local.endereco;
    botao.type = "button";
    botao.className = "botao";
    botao.textContent = "Saiba mais";
    botao.setAttribute("aria-label", `Saiba mais sobre ${local.nome}`);
    botao.addEventListener("click", () => abrirDetalhes(local, botao));

    figura.append(imagem, endereco);
    card.append(titulo, figura, botao);
    galeria.appendChild(card);
});

document.querySelectorAll("main img").forEach((imagem) => {
    imagem.tabIndex = 0;
    imagem.setAttribute("role", "button");
    imagem.setAttribute("aria-expanded", "false");
    imagem.setAttribute("aria-label", `Ampliar imagem: ${imagem.alt}`);
});

const ultimaVisita = Number(localStorage.getItem("ultimaVisita"));
const agora = Date.now();

if (!ultimaVisita) {
    mensagem.textContent = "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";
} else {
    const dias = Math.floor((agora - ultimaVisita) / 86400000);
    mensagem.textContent = dias < 1
        ? "Já voltou? Que legal!"
        : `Seu último acesso foi há ${dias} ${dias === 1 ? "dia" : "dias"}.`;
}

localStorage.setItem("ultimaVisita", String(agora));
