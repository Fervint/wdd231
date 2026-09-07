const navbtn = document.querySelector("#ham-btn");
const navlinks = document.querySelector("#nav-bar");

navbtn.addEventListener('click', () => {
navbtn.classList.toggle('show');
navlinks.classList.toggle('show');
});