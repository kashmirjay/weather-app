/*
// current date/time
let now = new Date();
let h3 = document.querySelector("h3");
let hour = now.getHours();

let minutes = now.getMinutes();




let day = days[now.getDay()];

h3.innerHTML = `${day}, ${hour}:${minutes}`;
*/

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];

  return `${day}, ${hours}:${minutes}`;
}

function search(city) {
  let units = "metric";
  let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displaySearchedCity);
}

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// weekly forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
  <div class="weekly-background">
  <span class="forecast-day">
    ${formatForecastDate(forecastDay.dt)}
    <br />
    <img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png"
    width="65";
    <br />
    ${Math.round(forecastDay.temp.max)}°
  </span>
  <br />
  <span class="low"> ${Math.round(forecastDay.temp.min)} </span>
</div>
</div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `7d478f69e1b2f5d563653f13f5f91d76`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

// city search
function displaySearchedCity(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let currentLow = Math.round(response.data.main.temp_min);
  let currentCity = response.data.name;
  let currentHumidity = response.data.main.humidity;
  let currentWind = Math.round(response.data.wind.speed);
  let currentConditions = response.data.weather[0].description;
  let currentCountry = response.data.sys.country;
  let lastUpdated = formatDate(response.data.dt * 1000);

  celsiusTemperature = response.data.main.temp;

  let currentIcon = document.querySelector("#current-icon");
  document.querySelector("h1").innerHTML = `${currentCity}`;
  document.querySelector("#temperature").innerHTML = `${currentTemperature}`;
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
  document.querySelector("h3").innerHTML = `Last updated: ${lastUpdated}`;
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  search(cityInput);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSubmit);

//current city
function displayCurrentCity(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let currentLow = Math.round(response.data.main.temp_min);
  let currentCity = response.data.name;
  let currentHumidity = response.data.main.humidity;
  let currentWind = Math.round(response.data.wind.speed);
  let currentConditions = response.data.weather[0].main;
  let currentCountry = response.data.sys.country;

  celsiusTemperature = response.data.main.temp;

  document.querySelector("h1").innerHTML = `${currentCity}`;
  document.querySelector("#temperature").innerHTML = `${currentTemperature}`;
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

  getForecast(response.data.coord);
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

//temperature preference
function temperatureToCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}
function temperatureToFahrenheit(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5) + 32;
  let fahrenheitElement = document.querySelector("#temperature");
  fahrenheitElement.innerHTML = fahrenheitTemperature;
}
let changeToCelsius = document.querySelector("#celsius");
changeToCelsius.addEventListener("click", temperatureToCelsius);

let changeToFahrenheit = document.querySelector("#fahrenheit");
changeToFahrenheit.addEventListener("click", temperatureToFahrenheit);

let celsiusTemperature = null;

search("Toronto");
