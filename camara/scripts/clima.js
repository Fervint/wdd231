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
  const iconesPorTipo = {
    thunderstorm: ['icone-tempestade', '⚡'],
    drizzle: ['icone-garoa', '☂'],
    rain: ['icone-chuva', '☂'],
    snow: ['icone-neve', '❄'],
    mist: ['icone-neblina', '〰'],
    smoke: ['icone-neblina', '〰'],
    haze: ['icone-neblina', '〰'],
    dust: ['icone-vento', '〰'],
    fog: ['icone-neblina', '〰'],
    sand: ['icone-vento', '〰'],
    ash: ['icone-neblina', '〰'],
    squall: ['icone-vento', '〰'],
    tornado: ['icone-tornado', '〰'],
    clear: ['icone-sol', '☀'],
    clouds: ['icone-nublado', '☁']
  };

  const [nomeClasse, simbolo] = iconesPorTipo[tipo] || ['icone-nublado', '☁'];
  icone.className = `icone-clima ${nomeClasse}`;
  icone.textContent = simbolo;
  icone.setAttribute('aria-label', `Condição do clima: ${dados.weather[0].description}`);
}

apiFetch();
