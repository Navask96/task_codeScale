const axios = require('axios');
const apiKey = 'ef063d7110b64fb58b6b97380ce4c2e4'; 

async function getWeatherData(location) {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);

    const weatherData = {
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
    };

    return weatherData;
  } catch (error) {
    throw error;
  }
}

module.exports = { getWeatherData };
