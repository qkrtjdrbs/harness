import type { Country, WeatherData } from "@/types/weather"
import { weatherCodeToCondition } from "@/lib/weather-condition"

type OpenMeteoResponse = {
  current: {
    temperature_2m: number
    relative_humidity_2m: number
    wind_speed_10m: number
    weather_code: number
  }
}

export async function fetchCurrentWeather(country: Country): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${country.lat}&longitude=${country.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch weather data")
  }

  const data: OpenMeteoResponse = await response.json()

  return {
    temperatureC: data.current.temperature_2m,
    condition: weatherCodeToCondition(data.current.weather_code),
    humidityPercent: data.current.relative_humidity_2m,
    windSpeedKmh: data.current.wind_speed_10m,
  }
}
