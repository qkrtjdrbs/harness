"use client"

import * as React from "react"

import type { Country, WeatherData, WeatherStatus } from "@/types/weather"
import { COUNTRIES, DEFAULT_COUNTRY_CODE } from "@/config/countries"
import { fetchCurrentWeather } from "@/services/weather-service"

const DEFAULT_COUNTRY =
  COUNTRIES.find((country) => country.code === DEFAULT_COUNTRY_CODE) ?? COUNTRIES[0]

export function useWeather() {
  const [country, setCountry] = React.useState<Country>(DEFAULT_COUNTRY)
  const [weather, setWeather] = React.useState<WeatherData | null>(null)
  const [status, setStatus] = React.useState<WeatherStatus>("loading")

  React.useEffect(() => {
    let cancelled = false
    setStatus("loading")

    fetchCurrentWeather(country)
      .then((data) => {
        if (cancelled) return
        setWeather(data)
        setStatus("success")
      })
      .catch(() => {
        if (cancelled) return
        setStatus("error")
      })

    return () => {
      cancelled = true
    }
  }, [country])

  return { country, setCountry, weather, status }
}
