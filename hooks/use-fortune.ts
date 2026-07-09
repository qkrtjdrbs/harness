"use client"

import * as React from "react"

import type { DailyFortune } from "@/types/fortune"
import { getWesternZodiacSign } from "@/lib/western-zodiac"
import { fetchDailyHoroscope } from "@/services/fortune-service"

type FortuneStatus = "idle" | "loading" | "success" | "error"

export function useFortune(birthMonth: number | null, birthDay: number | null) {
  const [fortune, setFortune] = React.useState<DailyFortune | null>(null)
  const [status, setStatus] = React.useState<FortuneStatus>("idle")

  React.useEffect(() => {
    if (!birthMonth || !birthDay) {
      setStatus("idle")
      setFortune(null)
      return
    }

    let cancelled = false
    setStatus("loading")

    const { sign, labelKo } = getWesternZodiacSign(birthMonth, birthDay)

    fetchDailyHoroscope(sign)
      .then(({ date, horoscope }) => {
        if (cancelled) return
        setFortune({ sign, signLabelKo: labelKo, date, horoscope })
        setStatus("success")
      })
      .catch(() => {
        if (cancelled) return
        setStatus("error")
      })

    return () => {
      cancelled = true
    }
  }, [birthMonth, birthDay])

  return { fortune, status }
}
