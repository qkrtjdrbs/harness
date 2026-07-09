"use client"

import * as React from "react"

import { calculateSaju } from "@/lib/saju"
import { getTodaySajuFortune } from "@/lib/saju-daily-fortune"
import type { SajuPillars } from "@/types/saju"

export function useSaju(
  year: number | null,
  month: number | null,
  day: number | null,
  hour: number | null
) {
  const result = React.useMemo<{
    pillars: SajuPillars
    dailyFortune: string
  } | null>(() => {
    if (!year || !month || !day || hour === null) {
      return null
    }

    try {
      const saju = calculateSaju({ year, month, day, hour })
      return {
        pillars: saju.pillars,
        dailyFortune: getTodaySajuFortune(saju.dayMaster),
      }
    } catch {
      return null
    }
  }, [year, month, day, hour])

  return {
    pillars: result?.pillars ?? null,
    dailyFortune: result?.dailyFortune ?? null,
  }
}
