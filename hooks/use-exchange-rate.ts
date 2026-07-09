"use client"

import * as React from "react"

import { fetchExchangeRate } from "@/services/exchange-rate-service"
import type { ExchangeRate } from "@/types/stock"

type ExchangeRateStatus = "idle" | "loading" | "success" | "error"

export function useExchangeRate(date: string | null) {
  const [rate, setRate] = React.useState<ExchangeRate | null>(null)
  const [status, setStatus] = React.useState<ExchangeRateStatus>("idle")

  React.useEffect(() => {
    if (!date) {
      setStatus("idle")
      setRate(null)
      return
    }

    let cancelled = false
    setStatus("loading")

    fetchExchangeRate(date)
      .then((result) => {
        if (cancelled) return
        setRate(result)
        setStatus("success")
      })
      .catch(() => {
        if (cancelled) return
        setStatus("error")
      })

    return () => {
      cancelled = true
    }
  }, [date])

  return { rate, status }
}
