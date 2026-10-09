import { inicializarSite } from "./site.js";

inicializarSite();

const botaoFoto = document.querySelector(".foto-zoom");
const modalFoto = document.querySelector("#modal-foto");

if (botaoFoto instanceof HTMLButtonElement && modalFoto instanceof HTMLDialogElement) {
    botaoFoto.addEventListener("click", () => {
        modalFoto.showModal();
    });

    modalFoto.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            evento.preventDefault();
            modalFoto.close();
        }
    });
}

const saudacao = document.querySelector("#saudacao-visita");

if (saudacao) {
    try {
        const armazenamento = window.localStorage;
        const visitaAnterior = armazenamento.getItem("fr-criatt-ultima-visita");
        const agora = new Date();

        if (visitaAnterior) {
            const dataAnterior = new Date(visitaAnterior);
            saudacao.textContent = Number.isNaN(dataAnterior.getTime())
                ? "Que bom ter você por aqui."
                : `Bem-vindo de volta! Sua visita anterior foi em ${dataAnterior.toLocaleDateString("pt-BR")}.`;
        } else {
            saudacao.textContent = "Esta é sua primeira visita registrada neste navegador. Seja bem-vindo!";
        }

        armazenamento.setItem("fr-criatt-ultima-visita", agora.toISOString());
    } catch (erro) {
        console.error("Não foi possível salvar a preferência de visita no armazenamento local.", erro);
        saudacao.textContent = "Bem-vindo! O registro local de visitas não está disponível neste navegador.";
    }
}
