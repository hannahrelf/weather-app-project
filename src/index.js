function formatDate(timestamp) {
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

  return `Last updated: <br/>${day} ${hours}:${minutes}`;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<ul class="forecast">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 7 && index > 0) {
      forecastHTML =
        forecastHTML +
        `<br />
            <li> 
              <span class="forecast-day">${formatForecastDay(
                forecastDay.dt
              )}</span>
              <img
                src="src/img/${forecastDay.weather[0].icon}.png"
                alt=""
                class="forecast-icons"
              />
              <p class="forecast-temperatures clearfix">
                <span class="forecast-temperature-max">${Math.round(
                  forecastDay.temp.max
                )}°</span><br /><span
                  class="forecast-temperature-min"
                  >${Math.round(forecastDay.temp.min)}°</span
                >
              </p>
            </li>
            `;
    }
  });

  forecastHTML = forecastHTML + `</ul>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "c81d19eccab31d3c820ee1f18e71cd1a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#feels-like").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}<span class="units"> °C</span>`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} <span class="units"> m/s</span>`;
  document.querySelector("#humidity").innerHTML = `${Math.round(
    response.data.main.humidity
  )} <span class="units"> %</span>`;
  document.querySelector("#time").innerHTML = formatDate(
    response.data.dt * 1000
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `src/img/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", "response.data.weather[0].description");

  getForecast(response.data.coord);
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
