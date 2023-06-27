import React, { useEffect, useState, useContext } from 'react'

import axios from 'axios'
import { format } from 'date-fns'

import CustomThemeContext from 'src/CustomThemeContext'

const WeatherWidget = ({ city = 'Newark' }) => {
  const [weatherData, setWeatherData] = useState(null)
  const { theme } = useContext(CustomThemeContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=c54f694eb4484a33bda223538231806&q=${city}&days=3`
        )

        console.log('API result:', result.data)
        setWeatherData(result.data)
      } catch (error) {
        console.error('API error:', error)
      }
    }
    fetchData()
  }, [city])

  if (!weatherData) return <p>Loading...</p>

  return (
    <div
      className={`weather-container mx-30 text-md pt-2 text-center font-bold transition-colors duration-200 overflow-auto ${
        theme === 1 ? 'text-white' : 'text-black'
      }`}
      style={{ height: '100%' }}
    >
      <h2
        className={`mb-2 rounded p-2 text-2xl transition-colors duration-200 ${
          theme === 1 ? 'bg-gray-800 text-white' : 'bg-emerald-400 text-black'
        }`}
      >{`Weather in ${weatherData.location.name}, ${weatherData.location.region}`}</h2>
      <p className="text-xl">{weatherData.current.condition.text}</p>
      <p className="text-xl">{`Current Temperature: ${Math.round(
        weatherData.current.temp_f
      )}°F`}</p>
      <div className="forecast-container flex justify-around overflow-auto p-4">
        {weatherData.forecast.forecastday.slice(0, 3).map((day, index) => (
          <div
            key={index}
            className={`forecast-day m-2 flex flex-col items-center rounded p-4 text-center text-base text-black shadow transition-colors duration-200 ${
              theme === 1
                ? 'bg-gradient-to-br from-gray-700 to-emerald-400'
                : 'bg-white'
            }`}
          >
            <h4>{format(new Date(day.date), 'MMM dd')}</h4>
            <p className="text-lg">{`High: ${Math.round(
              day.day.maxtemp_f
            )}°F, Low: ${Math.round(day.day.mintemp_f)}°F`}</p>
            <p className="text-lg">{day.day.condition.text}</p>
            <img src={day.day.condition.icon} alt="weather condition icon" />
          </div>
        ))}
      </div>
      <p>{`Sunrise: ${weatherData.forecast.forecastday[0].astro.sunrise}, Sunset: ${weatherData.forecast.forecastday[0].astro.sunset}`}</p>
      <p>
        <a
          href="http://www.weatherapi.com/weather"
          target="_blank"
          rel="noopener noreferrer"
        >
          Provided by WeatherAPI.com
        </a>
      </p>
    </div>
  )
}

export default WeatherWidget
