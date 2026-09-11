// Atualiza informações dinâmicas do rodapé da página.
// Exibe o ano atual e a data da última modificação do documento.

function atualizarDadosPagina() {
    const anoAtual = document.getElementById('current-year');
    const ultimaModificacao = document.getElementById('last-modified');

    if (anoAtual) {
        anoAtual.textContent = new Date().getFullYear();
    }

    if (ultimaModificacao) {
        const dataModificacao = new Date(document.lastModified);
        ultimaModificacao.textContent = dataModificacao.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

atualizarDadosPagina();
