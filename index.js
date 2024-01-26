const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/site.html');
});

app.post('/weather', async (req, res) => {
  const apiKey = 'ba223f883c14470b0a901bc9db8469c5';
  const city = req.body.city;

  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const weatherData = response.data;

    const temperature = weatherData.main.temp;
    const description = capitalizeFirstLetter(weatherData.weather[0].description);
    const icon = weatherData.weather[0].icon;
    const coordinates = weatherData.coord;
    const feelsLike = weatherData.main.feels_like;
    const humidity = weatherData.main.humidity;
    const pressure = weatherData.main.pressure;
    const windSpeed = weatherData.wind.speed;
    const countryCode = weatherData.sys.country;

    const rainVolume = weatherData.rain ? weatherData.rain['3h'] : 0;

    res.send({
      temperature,
      description,
      icon,
      coordinates,
      feelsLike,
      humidity,
      pressure,
      windSpeed,
      countryCode,
      rainVolume,
    });
  } catch (error) {
    res.status(500).send('Error fetching weather data');
  }
});

app.post('/news', async (req, res) => {
  try {
    console.log('Fetching news data...');
    const newsAPIUrl = `https://newsapi.org/v2/everything?q=apple&from=2024-01-25&to=2024-01-25&sortBy=popularity&apiKey=84f61af55f394333a3ebfa14de8700df`;
    const newsResponse = await axios.get(newsAPIUrl);
    
    const newsData = newsResponse.data;

    console.log('Sending news data to the frontend...');
    res.send(newsData);
  } catch (error) {
    console.error('Error fetching news data:', error);
    res.status(500).send('Error fetching news data');
  }
});

app.post('/exchange-rate', async (req, res) => {

  try {
    console.log('Fetching exchange rate data...');
    const exchangeRateResponse = await axios.get(`https://v6.exchangerate-api.com/v6/530d38bfa7504797fe35b9f4/latest/USD`);
    const exchangeRateData = exchangeRateResponse.data;

    console.log('Sending exchange rate data to the frontend...');
    res.send(exchangeRateData);
  } catch (error) {
    console.error('Error fetching exchange rate data:', error);
    res.status(500).send('Error fetching exchange rate data');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.substring(1);
}