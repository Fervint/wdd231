// Controle do menu hambúrguer para navegação em telas menores.
// O botão alterna a classe 'show' para abrir e fechar o menu.

const navbtn = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#nav-bar');

if (navbtn && navlinks) {
    navbtn.addEventListener('click', () => {
        const menuAberto = navbtn.classList.toggle('show');

        navlinks.classList.toggle('show', menuAberto);
        navbtn.setAttribute('aria-expanded', String(menuAberto));
        navbtn.setAttribute('aria-label', menuAberto ? 'Fechar menu' : 'Abrir menu');
    });
}