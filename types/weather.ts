export type Country = {
  code: string
  nameKo: string
  nameEn: string
  capital: string
  lat: number
  lon: number
}

export type WeatherData = {
  temperatureC: number
  condition: string
  humidityPercent: number
  windSpeedKmh: number
}

export type WeatherStatus = "loading" | "success" | "error"
