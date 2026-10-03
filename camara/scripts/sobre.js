import { locais } from "../dados/dados/dados.mjs";

const galeria = document.querySelector("#galeria");
const mensagem = document.querySelector("#mensagem");

locais.forEach((local) => {
    const card = document.createElement("article");
    const titulo = document.createElement("h2");
    const figura = document.createElement("figure");
    const imagem = document.createElement("img");
    const endereco = document.createElement("figcaption");
    const descricao = document.createElement("p");
    const botao = document.createElement("button");

    card.className = "card";
    titulo.textContent = local.nome;
    imagem.src = local.imagem;
    imagem.alt = "Imagem ilustrativa da Câmara Dicria";
    imagem.width = 300;
    imagem.height = 200;
    imagem.loading = "lazy";
    imagem.decoding = "async";
    endereco.textContent = local.endereco;
    descricao.textContent = local.descricao;
    botao.type = "button";
    botao.className = "botao";
    botao.textContent = "Saiba mais";
    botao.setAttribute("aria-label", `Saiba mais sobre ${local.nome}`);

    figura.append(imagem, endereco);
    card.append(titulo, figura, descricao, botao);
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
