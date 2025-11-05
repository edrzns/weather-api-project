import dotenv from 'dotenv';

dotenv.config();

const city = 'Riga';
const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;
const weatherApiKey = process.env.WEATHER_API_KEY;

const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=metric`;
const weatherApiUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}`;

const openWeatherPromise = fetch(openWeatherUrl).then(res => res.json());
const weatherApiPromise = fetch(weatherApiUrl).then(res => res.json());

Promise.all([openWeatherPromise, weatherApiPromise])
  .then(data => {
    const openWeatherData = data[0];
    const weatherApiData = data[1];

    console.log('OpenWeather Data:', openWeatherData);
    console.log('WeatherAPI Data:', weatherApiData);
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
  });
