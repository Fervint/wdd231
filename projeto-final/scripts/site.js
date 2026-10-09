export function inicializarSite() {
    const ano = document.querySelector("[data-ano]");
    if (ano) {
        ano.textContent = String(new Date().getFullYear());
    }

    const botaoMenu = document.querySelector(".menu-botao");
    const navegacao = document.querySelector("#navegacao-principal");

    if (botaoMenu && navegacao) {
        botaoMenu.addEventListener("click", () => {
            const aberto = botaoMenu.getAttribute("aria-expanded") !== "true";
            botaoMenu.setAttribute("aria-expanded", String(aberto));
            botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
            navegacao.classList.toggle("aberto", aberto);
        });

        navegacao.addEventListener("click", (evento) => {
            if (evento.target instanceof Element && evento.target.closest("a")) {
                botaoMenu.setAttribute("aria-expanded", "false");
                botaoMenu.setAttribute("aria-label", "Abrir menu");
                navegacao.classList.remove("aberto");
            }
        });
    }
}
