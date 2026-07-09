"use client"

import * as React from "react"

import type { DailyFortune } from "@/types/fortune"
import { FORTUNE_MESSAGES } from "@/config/fortunes"
import { getZodiacAnimal } from "@/lib/zodiac"
import { hashStringToInt } from "@/lib/daily-fortune"

export function useDailyFortune(birthYear: number | null): DailyFortune | null {
  return React.useMemo(() => {
    if (!birthYear) return null

    const animal = getZodiacAnimal(birthYear)
    const todayKey = new Date().toDateString()
    const index = hashStringToInt(`${todayKey}-${animal}`) % FORTUNE_MESSAGES.length

    return { animal, message: FORTUNE_MESSAGES[index] }
  }, [birthYear])
}
