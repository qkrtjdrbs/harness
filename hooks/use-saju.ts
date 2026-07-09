"use client"

import * as React from "react"

import { calculateSaju } from "@/lib/saju"
import { getTodayTenGod } from "@/lib/saju-daily-fortune"
import { fetchSajuFortuneMessage } from "@/services/saju-fortune-service"

type FortuneStatus = "idle" | "loading" | "success" | "error"

export function useSaju(
  year: number | null,
  month: number | null,
  day: number | null,
  hour: number | null
) {
  const [dailyFortune, setDailyFortune] = React.useState<string | null>(null)
  const [fortuneStatus, setFortuneStatus] = React.useState<FortuneStatus>("idle")

  const saju = React.useMemo(() => {
    if (!year || !month || !day || hour === null) {
      return null
    }

    try {
      return calculateSaju({ year, month, day, hour })
    } catch {
      return null
    }
  }, [year, month, day, hour])

  React.useEffect(() => {
    if (!saju) {
      setFortuneStatus("idle")
      setDailyFortune(null)
      return
    }

    let cancelled = false
    setFortuneStatus("loading")

    const tenGod = getTodayTenGod(saju.dayMaster)
    const today = new Date().toISOString().slice(0, 10)

    fetchSajuFortuneMessage(tenGod, today)
      .then((message) => {
        if (cancelled) return
        setDailyFortune(message)
        setFortuneStatus("success")
      })
      .catch(() => {
        if (cancelled) return
        setFortuneStatus("error")
      })

    return () => {
      cancelled = true
    }
  }, [saju])

  return {
    pillars: saju?.pillars ?? null,
    dailyFortune,
    fortuneStatus,
  }
}
