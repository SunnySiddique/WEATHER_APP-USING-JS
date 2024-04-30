let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_temperature = document.querySelector(".weather_temperature");
let w_icon = document.querySelector(".weather_icon");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");
let citySearch = document.querySelector(".weather_search");
let loading = document.querySelector("#loading");
let weather_info = document.querySelector(".weather_info");
let city_name1 = document.querySelector(".city_name1");

let city = "";

const getCountryName = (countCode) => {
  return new Intl.DisplayNames([countCode], { type: "region" }).of(countCode);
};

const getDateTime = (dt) => {
  let curDt = dt * 1000;

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(curDt);
};

const getWeatherData = async () => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=33789e8e3c43070de21ae445698c5779`;
  try {
    loading.innerText = "Loading...";
    city_name1.style.display = "none";

    cityName.textContent = "";
    dateTime.innerHTML = "";
    w_forecast.innerHTML = "";
    w_icon.innerHTML = "";
    w_temperature.innerHTML = "";
    w_minTem.innerHTML = "";
    w_maxTem.innerHTML = "";
    weather_info.innerHTML = "";
    w_forecast.style.display = "none";

    const res = await fetch(weatherUrl);
    const data = await res.json();
    console.log(data);
    const { main, name, weather, wind, sys, dt } = data;

    cityName.textContent = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);
    w_forecast.innerHTML = weather[0].main;
    w_forecast.style.display = "inline-block";
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/w/${weather[0].icon}.png" alt="Weather Icon">
    `;

    w_temperature.innerHTML = `${main.temp.toFixed()}&#176`;
    w_minTem.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
    w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`;

    weather_info.innerHTML = `
    
    <div class="weather_card">
            <i class="fa-solid fa-droplet"></i>
            <div>
              <p>Fells Like</p>
              <p class="weather_feelsLike">${main.feels_like.toFixed(
                2
              )}&#176</p>
            </div>
          </div>
          <div class="weather_card">
            <i class="fa-solid fa-droplet"></i>
            <div>
              <p>Humidity</p>
              <p class="weather_humidity">${main.humidity}%</p>
            </div>
          </div>
          <div class="weather_card">
            <i class="fa-solid fa-droplet"></i>
            <div>
              <p>Wind</p>
              <p class="weather_wind">${wind.speed} m/s</p>
            </div>
          </div>

          <div class="weather_card">
            <i class="fa-solid fa-droplet"></i>
            <div>
              <p>Pressure</p>
              <p class="weather_pressure">${main.pressure} hPa</p>
            </div>
          </div>

    `;
    loading.innerText = "";
  } catch (error) {
    loading.textContent = "Please try again with a valid city name.";
    // Clear content
    cityName.textContent = "";
    dateTime.innerHTML = "";
    w_forecast.innerHTML = "";
    w_icon.innerHTML = "";
    w_temperature.innerHTML = "";
    w_minTem.innerHTML = "";
    w_maxTem.innerHTML = "";
    weather_info.innerHTML = "";
    w_forecast.style.display = "none";
  }
};

citySearch.addEventListener("submit", (e) => {
  e.preventDefault();
  let cityName = document.querySelector(".city_name");
  city = cityName.value;
  getWeatherData();
  cityName.value = "";
});
