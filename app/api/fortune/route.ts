import { NextRequest } from "next/server"

import type { WesternZodiacSign } from "@/types/fortune"
import { getKoreanLabelForSign } from "@/lib/western-zodiac"
import { translateToKorean } from "@/lib/translate"

const FREE_HOROSCOPE_API_URL =
  "https://freehoroscopeapi.com/api/v1/get-horoscope/daily"

export async function GET(request: NextRequest) {
  const sign = request.nextUrl.searchParams.get("sign")

  if (!sign) {
    return Response.json({ error: "Missing sign parameter" }, { status: 400 })
  }

  const response = await fetch(`${FREE_HOROSCOPE_API_URL}?sign=${sign}`)

  if (!response.ok) {
    return Response.json(
      { error: "Failed to fetch horoscope" },
      { status: 502 }
    )
  }

  const data = await response.json()
  const translated = await translateToKorean(data.data.horoscope)
  const signLabelKo = getKoreanLabelForSign(sign as WesternZodiacSign)
  const horoscopeKo = translated.replace(
    new RegExp(data.data.sign, "gi"),
    signLabelKo
  )

  return Response.json({
    data: { ...data.data, horoscope: horoscopeKo },
  })
}
