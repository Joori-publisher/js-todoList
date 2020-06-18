const COORDS = "coords";
const API_KEY = "8cf9a5326b05f7d65055185e5fe65e5e";
const weather = document.querySelector(".js-weather");

function handleGeoError() {
  console.log("Can't access geo location");
}

function saveCoords(coordObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordObj));
}
function handleGeoSuccess(position) {
  const latitude = position.coords.latitude,
    longitude = position.coords.longitude;
  const coordObj = {
    latitude: latitude,
    longitude: longitude
  };
  saveCoords(coordObj);
  getWeather(latitude, longitude);
}
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}
function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      let temperature = json.main.temp;
      temperature = (parseInt(temperature) - 273.15).toPrecision(4);

      const place = json.name;
      weather.innerHTML = `<p style='color:#ebebeb'>온도: ${temperature} ºC , 장소: ${place}</p>`;
    });
}
function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    //getWeather
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}
function init() {
  loadCoords();
}
init();
