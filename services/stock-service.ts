import type { StockPriceResult } from "@/types/stock"

export async function fetchStockPrices(
  symbol: string,
  date: string
): Promise<StockPriceResult> {
  const response = await fetch(
    `/api/stock?symbol=${encodeURIComponent(symbol)}&date=${encodeURIComponent(date)}`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch stock data")
  }

  return response.json()
}
