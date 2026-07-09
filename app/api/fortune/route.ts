import { NextRequest } from "next/server"

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
  return Response.json(data)
}
