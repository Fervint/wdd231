import { inicializarSite } from "./site.js";

inicializarSite();

const estado = document.querySelector("#estado-envio");
const listaDados = document.querySelector("#dados-envio");
const parametros = new URLSearchParams(window.location.search);
const campos = [
    ["Nome", "nome"],
    ["E-mail", "email"],
    ["Assunto", "assunto"],
    ["Mensagem", "mensagem"]
];
const assuntos = new Map([
    ["desenvolvimento-web", "Desenvolvimento web"],
    ["programacao-de-jogos", "Programação de jogos"],
    ["colaboracao", "Colaboração ou outra ideia"]
]);
const dados = campos.map(([rotulo, chave]) => ({
    rotulo,
    valor: parametros.get(chave)?.trim() ?? ""
}));
const assunto = dados.find((campo) => campo.rotulo === "Assunto");
if (assunto) {
    assunto.valor = assuntos.get(assunto.valor) ?? assunto.valor;
}

if (dados.every((campo) => campo.valor)) {
    dados.forEach(({ rotulo, valor }) => {
        const termo = document.createElement("dt");
        const definicao = document.createElement("dd");
        termo.textContent = rotulo;
        definicao.textContent = valor;
        listaDados.append(termo, definicao);
    });
    estado.textContent = "Os dados enviados pelo formulário estão abaixo. Esta demonstração não envia mensagens a um servidor.";
} else {
    estado.textContent = "Não há dados completos para exibir. Preencha o formulário para ver o resumo.";
}
