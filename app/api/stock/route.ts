import { NextRequest } from "next/server"

const YAHOO_CHART_URL = "https://query1.finance.yahoo.com/v8/finance/chart"
const HISTORY_BUFFER_SECONDS = 5 * 24 * 60 * 60

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get("symbol")
  const date = request.nextUrl.searchParams.get("date")

  if (!symbol || !date) {
    return Response.json(
      { error: "Missing symbol or date parameter" },
      { status: 400 }
    )
  }

  const targetDate = new Date(`${date}T00:00:00Z`)
  if (Number.isNaN(targetDate.getTime())) {
    return Response.json({ error: "Invalid date" }, { status: 400 })
  }

  const targetSeconds = Math.floor(targetDate.getTime() / 1000)
  const period1 = targetSeconds - HISTORY_BUFFER_SECONDS
  const period2 = Math.floor(Date.now() / 1000)

  const url = `${YAHOO_CHART_URL}/${encodeURIComponent(symbol)}?period1=${period1}&period2=${period2}&interval=1d`

  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
  })

  if (!response.ok) {
    return Response.json(
      { error: "Failed to fetch stock data" },
      { status: 502 }
    )
  }

  const data = await response.json()
  const result = data?.chart?.result?.[0]

  if (!result) {
    return Response.json({ error: "No data for symbol" }, { status: 404 })
  }

  const timestamps: number[] = result.timestamp ?? []
  const closes: Array<number | null> = result.indicators?.quote?.[0]?.close ?? []
  const currentPrice: number | undefined = result.meta?.regularMarketPrice
  const currency: string = result.meta?.currency ?? "USD"

  let closestIndex = -1
  let closestDiff = Infinity
  for (let i = 0; i < timestamps.length; i++) {
    if (closes[i] == null) continue
    const diff = Math.abs(timestamps[i] - targetSeconds)
    if (diff < closestDiff) {
      closestDiff = diff
      closestIndex = i
    }
  }

  if (closestIndex === -1 || currentPrice == null) {
    return Response.json({ error: "Insufficient price data" }, { status: 404 })
  }

  return Response.json({
    historicalDate: new Date(timestamps[closestIndex] * 1000).toISOString(),
    historicalPrice: closes[closestIndex],
    currentPrice,
    currency,
  })
}
