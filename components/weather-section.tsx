"use client"

import * as React from "react"
import { AlertCircleIcon, DropletIcon, Loader2Icon, WindIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { COUNTRIES } from "@/config/countries"
import { useWeather } from "@/hooks/use-weather"

const COUNTRY_CODES = COUNTRIES.map((country) => country.code)
const COUNTRY_BY_CODE = new Map(COUNTRIES.map((country) => [country.code, country]))

function countryLabel(code: string) {
  const country = COUNTRY_BY_CODE.get(code)
  return country ? `${country.nameKo} (${country.nameEn})` : code
}

export function WeatherSection() {
  const { country, setCountry, weather, status } = useWeather()

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>현재 날씨</CardTitle>
        <Combobox
          items={COUNTRY_CODES}
          value={country.code}
          onValueChange={(code) => {
            const next = code ? COUNTRY_BY_CODE.get(code) : undefined
            if (next) setCountry(next)
          }}
          itemToStringLabel={countryLabel}
        >
          <ComboboxInput placeholder="나라 검색..." />
          <ComboboxContent>
            <ComboboxEmpty>검색 결과가 없습니다</ComboboxEmpty>
            <ComboboxList>
              {(code) => (
                <ComboboxItem key={code} value={code}>
                  {countryLabel(code)}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </CardHeader>
      <CardContent>
        {status === "loading" && (
          <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground">
            <Loader2Icon className="size-5 animate-spin" />
            <span>날씨 정보를 불러오는 중...</span>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center justify-center gap-2 py-8 text-destructive">
            <AlertCircleIcon className="size-5" />
            <span>날씨 정보를 가져오지 못했습니다.</span>
          </div>
        )}

        {status === "success" && weather && (
          <div className="space-y-2">
            <p className="text-4xl font-semibold">
              {Math.round(weather.temperatureC)}°C
            </p>
            <p className="text-muted-foreground">{weather.condition}</p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <DropletIcon className="size-4" />
                습도 {Math.round(weather.humidityPercent)}%
              </span>
              <span className="flex items-center gap-1">
                <WindIcon className="size-4" />
                바람 {Math.round(weather.windSpeedKmh)}km/h
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
