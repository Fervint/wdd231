const lat = -16.793;
const lon = -49.267;
const chaveAPI = '365bf864861da14abdd983ffb9d81f5c';
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${chaveAPI}`;

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

function mostrarResultados(dados) {
  document.querySelector('#temp-atual').innerHTML = `${dados.main.temp.toFixed(1)}°C`;
  document.querySelector('#descricao').textContent = dados.weather[0].description;
  document.querySelector('#umidade').textContent = dados.main.humidity;
  document.querySelector('#vento').textContent = dados.wind.speed;

  const icone = document.querySelector('#icone-do-clima');
  const tipo = dados.weather[0].main.toLowerCase();
  const classesPorTipo = {
    thunderstorm: 'bi-cloud-lightning-rain',
    drizzle: 'bi-cloud-drizzle',
    rain: 'bi-cloud-rain',
    snow: 'bi-cloud-snow',
    mist: 'bi-cloud-haze',
    smoke: 'bi-cloud-haze',
    haze: 'bi-cloud-haze',
    dust: 'bi-wind',
    fog: 'bi-cloud-fog',
    sand: 'bi-wind',
    ash: 'bi-cloud-haze',
    squall: 'bi-wind',
    tornado: 'bi-tornado',
    clear: 'bi-sun',
    clouds: 'bi-cloud'
  };

  const nomeClasse = classesPorTipo[tipo] || 'bi-cloud';
  icone.className = `bi ${nomeClasse}`;
  icone.setAttribute('aria-label', `Condição do clima: ${dados.weather[0].description}`);
}

apiFetch();
