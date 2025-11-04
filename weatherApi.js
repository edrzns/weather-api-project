import dotenv from 'dotenv';

dotenv.config();

const city = 'Riga';
const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;
const weatherApiKey = process.env.WEATHER_API_KEY;

const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=metric`;
const weatherApiUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}`;

fetch(openWeatherUrl)
  .then(response => response.json())
  .then(data => {
    console.log('OpenWeatherMap Data:', data);
  })
  .catch(error => {
    console.error('Error fetching OpenWeatherMap data:', error);
  });

fetch(weatherApiUrl)
  .then(response => response.json())
  .then(data => {                                                                                                                                                                                                                                                                                               
    console.log('WeatherAPI Data:', data);
  })
  .catch(error => {
    console.error('Error fetching WeatherAPI data:', error);
  });
