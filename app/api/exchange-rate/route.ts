import { NextRequest } from "next/server"

const FRANKFURTER_URL = "https://api.frankfurter.dev/v1"

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date")

  if (!date) {
    return Response.json({ error: "Missing date parameter" }, { status: 400 })
  }

  const response = await fetch(
    `${FRANKFURTER_URL}/${encodeURIComponent(date)}?from=USD&to=KRW`
  )

  if (!response.ok) {
    return Response.json(
      { error: "Failed to fetch exchange rate" },
      { status: 502 }
    )
  }

  const data = await response.json()
  const usdToKrw = data?.rates?.KRW

  if (usdToKrw == null) {
    return Response.json({ error: "No rate available for this date" }, { status: 404 })
  }

  return Response.json({ date: data.date, usdToKrw })
}
