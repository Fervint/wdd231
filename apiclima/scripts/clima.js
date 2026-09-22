// Selecionar elementos HTML
const tempAtual = document.querySelector('#temp-atual');
const iconeDoClima = document.querySelector('#icone-do-clima');
const descrDaLegenda = document.querySelector('figcaption');
const status = document.querySelector('#status');
const umidade = document.querySelector('#umidade');
const vento = document.querySelector('#vento');

// Coordenadas de Trier, Alemanha
const lat = 49.75;
const lon = 6.64;

// 🔑 Substitua o texto abaixo pela sua chave real
const chaveAPI = '365bf864861da14abdd983ffb9d81f5c';

// URL da API
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${chaveAPI}`;

// Função assíncrona para buscar dados
async function apiFetch() {
  try {
    const resposta = await fetch(url);
    if (resposta.ok) {
      const dados = await resposta.json();
      mostrarResultados(dados);
    } else {
      throw Error(await resposta.text());
    }
  } catch (erro) {
    console.log('Erro ao buscar dados: ' + erro);
  }
}

// Função para exibir resultados
function mostrarResultados(dados) {
  status.textContent = ''; // Remove mensagem de carregamento

  tempAtual.innerHTML = `${dados.main.temp.toFixed(1)}&deg;C`;

  const iconesrc = `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`;
  const descr = dados.weather[0].description;
  iconeDoClima.setAttribute('src', iconesrc);
  iconeDoClima.setAttribute('alt', descr);
  descrDaLegenda.textContent = descr.charAt(0).toUpperCase() + descr.slice(1);

  // ✅ Exibe umidade e vento
  umidade.textContent = dados.main.humidity;
  vento.textContent = dados.wind.speed;
}

// Iniciar busca
apiFetch();
