//Show Current Time
let currentTime = new Date();
let time = document.querySelector("#time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];

let hours = currentTime.getHours();
hours = ("0" + hours).slice(-2);
let minutes = currentTime.getMinutes();
minutes = ("0" + minutes).slice(-2);

time.innerHTML = `${day}, ${hours}:${minutes}`;

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#feels-like").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}°C`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} m/s`;
  document.querySelector("#humidity").innerHTML = `${Math.round(
    response.data.main.humidity
  )} %`;
}

function searchCity(city) {
  let apiKey = "c81d19eccab31d3c820ee1f18e71cd1a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  searchCity(city);
}

function findCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c81d19eccab31d3c820ee1f18e71cd1a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findCurrentLocation);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", changeCity);

let findLocation = document.querySelector("#location-button");
findLocation.addEventListener("click", getPosition);

searchCity("London");
