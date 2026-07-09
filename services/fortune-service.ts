import type { WesternZodiacSign } from "@/types/fortune"

type FreeHoroscopeApiResponse = {
  data: {
    date: string
    period: string
    sign: string
    horoscope: string
  }
}

export async function fetchDailyHoroscope(
  sign: WesternZodiacSign
): Promise<{ date: string; horoscope: string }> {
  const response = await fetch(`/api/fortune?sign=${sign}`)

  if (!response.ok) {
    throw new Error("Failed to fetch daily horoscope")
  }

  const data: FreeHoroscopeApiResponse = await response.json()

  return {
    date: data.data.date,
    horoscope: data.data.horoscope,
  }
}
