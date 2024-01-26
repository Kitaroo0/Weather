document.getElementById('weatherForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    
    const response = await fetch('/weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ city }),
    });

    const weatherData = await response.json();

    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
      <img src="http://openweathermap.org/img/wn/${weatherData.icon}.png" alt="Weather Icon">
      <p>Temperature: ${(weatherData.temperature-273.15).toFixed(1)}°C</p>
      ${weatherData.description}
      <p>Coordinates: Latitude ${weatherData.coordinates.lat}, Longitude ${weatherData.coordinates.lon}</p>
      <p>Feels Like: ${(weatherData.feelsLike-273.15).toFixed(1)}°C</p>
      <p>Humidity: ${weatherData.humidity}%</p>
      <p>Pressure: ${weatherData.pressure} hPa</p>
      <p>Wind Speed: ${weatherData.windSpeed} m/s</p>
      <p>Country Code: ${weatherData.countryCode}</p>
      <p>Rain Volume (last 3 hours): ${weatherData.rainVolume} mm</p>
    `;
  });

  document.addEventListener('DOMContentLoaded', () => {
    
    const map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const newsButton = document.getElementById('getNews');
    newsButton.addEventListener('click', async () => {
    try {
      const response = await fetch('/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error('Error fetching news data');
      }

      const newsData = await response.json();

      updateNewsInfo(newsData);
    } catch (error) {
      console.error(error);
    }
  });

  const exchangeRateButton = document.getElementById('getExchangeRate');
  exchangeRateButton.addEventListener('click', async () => {
    try {
      const response = await fetch('/exchange-rate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error('Error fetching exchange rate data');
      }

      const exchangeRateData = await response.json();

      updateExchangeRateInfo(exchangeRateData);
    } catch (error) {
      console.error(error);
    }
  });
  
    const form = document.getElementById('weatherForm');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const cityInput = document.getElementById('city');
      const cityName = cityInput.value;
  
      try {
        const response = await fetch('/weather', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ city: cityName }),
        });
  
        if (!response.ok) {
          throw new Error('Error fetching weather data');
        }
  
        const weatherData = await response.json();
        const coordinates = weatherData.coordinates;
  
        map.setView([coordinates.lat, coordinates.lon], 10);
        L.marker([coordinates.lat, coordinates.lon]).addTo(map);

      } catch (error) {
        console.error(error);
      }
    });
  });

  function updateNewsInfo(newsData) {
    const newsInfoDiv = document.getElementById('newsInfo');
  
    newsInfoDiv.innerHTML = '';
  
    for (let i = 1; i < Math.min(10, newsData.articles.length); i++) {
      const article = newsData.articles[i];
      const articleElement = document.createElement('div');
      articleElement.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.description}</p>
        <a href="${article.url}" target="_blank">Read more</a>
        <hr>
      `;
      newsInfoDiv.appendChild(articleElement);
    }
  }
  
  function updateExchangeRateInfo(exchangeRateData) {
    const exchangeRateInfoDiv = document.getElementById('exchangeRateInfo');
  
    exchangeRateInfoDiv.innerHTML = '';
  
    const exchangeRateElement = document.createElement('div');
    exchangeRateElement.innerHTML = `
      <h3>Exchange Rate Information</h3>
      <p>Result: ${exchangeRateData.result}</p>
      <p>Last Update (UTC): ${exchangeRateData.time_last_update_utc}</p>
      
      <h4>Currency Exchange Rates</h4>
      <ul>
        ${getPopularCurrencies().map(currency => `<li>${currency}: ${exchangeRateData.conversion_rates[currency]}</li>`).join('')}
      </ul>
    `;
    exchangeRateInfoDiv.appendChild(exchangeRateElement);
  }
  
  function getPopularCurrencies() {
    return ['USD', 'EUR', 'GBP', 'JPY', 'AUD'];
  }