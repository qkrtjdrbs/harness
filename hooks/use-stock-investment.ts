"use client"

import * as React from "react"

import { fetchStockPrices } from "@/services/stock-service"
import type { StockPriceResult } from "@/types/stock"

type StockPriceStatus = "idle" | "loading" | "success" | "error"

export function useStockInvestment(
  symbol: string | null,
  date: string | null,
  amount: number | null
) {
  const [prices, setPrices] = React.useState<StockPriceResult | null>(null)
  const [status, setStatus] = React.useState<StockPriceStatus>("idle")

  React.useEffect(() => {
    if (!symbol || !date || !amount) {
      setStatus("idle")
      setPrices(null)
      return
    }

    let cancelled = false
    setStatus("loading")

    fetchStockPrices(symbol, date)
      .then((result) => {
        if (cancelled) return
        setPrices(result)
        setStatus("success")
      })
      .catch(() => {
        if (cancelled) return
        setStatus("error")
      })

    return () => {
      cancelled = true
    }
  }, [symbol, date, amount])

  return { prices, status }
}
