import dotenv from 'dotenv';

dotenv.config();

const city = 'Riga';
const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;
const weatherApiKey = process.env.WEATHER_API_KEY;

const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=metric`;
const weatherApiUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}`;

const openWeatherPromise = timePromise(
  fetch(openWeatherUrl).then((res) => res.json()),
  'OpenWeather'
);
const weatherApiPromise = timePromise(
  fetch(weatherApiUrl).then((res) => res.json()),
  'WeatherAPI'
);

function timePromise(promise, name) {
  const startTime = Date.now();

  return promise.then((data) => {
    const duration = Date.now() - startTime;
    return {
      data,
      duration,
      name,
    };
  });
}

async function getWeather() {
  try {
    const [openWeatherResult, weatherApiResult] = await Promise.all([
      openWeatherPromise,
      weatherApiPromise,
    ]);

    const openWeatherData = openWeatherResult.data;
    const weatherApiData = weatherApiResult.data;

    console.log('OpenWeather Data:', openWeatherData);
    console.log('WeatherAPI Data:', weatherApiData);

    if (openWeatherResult.duration < weatherApiResult.duration) {
      console.log(
        `OpenWeather was faster: ${openWeatherResult.duration}ms vs ${weatherApiResult.duration}ms`
      );
    } else if (weatherApiResult.duration < openWeatherResult.duration) {
      console.log(
        `WeatherAPI was faster: ${weatherApiResult.duration}ms vs ${openWeatherResult.duration}ms`
      );
    } else {
      console.log(`Both APIs responded in the same time: ${openWeatherResult.duration}ms`);
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

getWeather();
