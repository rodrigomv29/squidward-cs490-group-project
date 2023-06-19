import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { format } from 'date-fns'

const WeatherWidget = ({ city = 'San Francisco' }) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=c54f694eb4484a33bda223538231806&q=${city}&days=5`
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
    <div className="weather-container mx-30 my-4 mt-8 h-2/5 pt-6 text-center text-lg font-bold">
      <h2 className="mb-2 rounded bg-emerald-400 p-2 text-3xl text-black">{`Weather in ${weatherData.location.name}, ${weatherData.location.region}`}</h2>
      <div className="forecast-container flex justify-around overflow-auto p-4">
        {weatherData.forecast.forecastday.slice(0, 3).map((day, index) => (
          <div
            key={index}
            className="forecast-day m-2 flex flex-col items-center rounded bg-white p-4 text-center text-black text-base shadow"
          >
            <h4>{format(new Date(day.date), 'MMM dd')}</h4>
            <p className="text-lg">{day.day.avgtemp_f}°F</p>
            <p className="text-lg">{day.day.condition.text}</p>
            <img src={day.day.condition.icon} alt="weather condition icon" />
          </div>
        ))}
      </div>
    </div>
  )
}
export default WeatherWidget
