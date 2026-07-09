import type { ExchangeRate } from "@/types/stock"

export async function fetchExchangeRate(date: string): Promise<ExchangeRate> {
  const response = await fetch(`/api/exchange-rate?date=${encodeURIComponent(date)}`)

  if (!response.ok) {
    throw new Error("Failed to fetch exchange rate")
  }

  return response.json()
}
