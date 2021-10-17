// current date/time
let now = new Date();
let h3 = document.querySelector("h3");
let hour = now.getHours();
if (hour < 9) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

h3.innerHTML = `${day}, ${hour}:${minutes}`;

function search(city) {
  let units = "metric";
  let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displaySearchedCity);
}

// city search
function displaySearchedCity(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let currentLow = Math.round(response.data.main.temp_min);
  let currentCity = response.data.name;
  let currentHumidity = response.data.main.humidity;
  let currentWind = Math.round(response.data.wind.speed);
  let currentConditions = response.data.weather[0].main;
  let currentCountry = response.data.sys.country;
  document.querySelector("h1").innerHTML = `${currentCity}`;
  document.querySelector("#temperature").innerHTML = `${currentTemperature}°`;
  document.querySelector("#low").innerHTML = `${currentLow}°`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${currentHumidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${currentWind} km/hr`;
  document.querySelector(
    "#current-weather-description"
  ).innerHTML = `${currentConditions}`;
  document.querySelector("h2").innerHTML = `${currentCountry}`;
  document.querySelector(
    "title"
  ).innerHTML = `Weather (${currentCity}, ${currentCountry})`;
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  search(cityInput);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSubmit);

/*
//temperature preference

function temperatureCelsius() {
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = "18°";
}
function temperatureFahrenheit() {
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = "64°";
}
let changeToCelsius = document.querySelector("#celsius");
changeToCelsius.addEventListener("click", temperatureCelsius);

let changeToFahrenheit = document.querySelector("#fahrenheit");
changeToFahrenheit.addEventListener("click", temperatureFahrenheit);
*/

function displayCurrentCity(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let currentLow = Math.round(response.data.main.temp_min);
  let currentCity = response.data.name;
  let currentHumidity = response.data.main.humidity;
  let currentWind = Math.round(response.data.wind.speed);
  let currentConditions = response.data.weather[0].main;
  let currentCountry = response.data.sys.country;
  document.querySelector("h1").innerHTML = `${currentCity}`;
  document.querySelector("#temperature").innerHTML = `${currentTemperature}°`;
  document.querySelector("#low").innerHTML = `${currentLow}°`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${currentHumidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${currentWind} km/hr`;
  document.querySelector(
    "#current-weather-description"
  ).innerHTML = `${currentConditions}`;
  document.querySelector("h2").innerHTML = `${currentCountry}`;
  document.querySelector(
    "title"
  ).innerHTML = `Weather (${currentCity}, ${currentCountry})`;
}

function getCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCurrentCity);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let getCurrentCity = document.querySelector("#get-current-city");
getCurrentCity.addEventListener("click", getPosition);

search("Toronto");
