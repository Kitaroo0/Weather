# Weather

## Overview

The Weather App is a simple web application that allows users to get current weather information, news and exchange rate.

## Features

- Current weather details (temperature, description, etc.).
- Geolocation and mapping to showcase the location of cities.
- News and exchange rate

## Prerequisites

Before running the app, make sure you have the following installed:

- Node.js and npm (Node Package Manager)

## Getting Started

1. Clone the repository:
   
   git clone https://github.com/your-username/weather-app.git
  
2. Navigate to the project directory:

   cd Weather

3. Install dependencies:

   npm install

4. Set up your OpenWeatherMap API key:

   Obtain an API key from OpenWeatherMap.

   Replace 'your_openweathermap_api_key' with your actual API key in index.js and site.js files.

5. Run the server:

   node index.js

   The server will start at http://localhost:3000.

6. Open the app in your browser:

   Navigate to http://localhost:3000 in your web browser to access the Weather App.

## Additional APIs

To enhance functionality, the app integrates additional APIs for exchange rates and news. These APIs run on the server side.

Exchange Rate API: https://www.exchangerate-api.com/

News API: https://newsapi.org/

OpenWeather API

- Endpoint: `/weather`
- Parameters: `city`

News API

- Endpoint: `/news`
- Parameters: (if any)

Exchange Rate API

- Endpoint: `/exchange-rate`
- Parameters: (if any)


## Notes

I had to remove the "node_modules" directory from the "RegLog" folder, since there are 1000+ files there and it cannot be added to the github.
