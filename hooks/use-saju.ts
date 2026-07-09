"use client"

import * as React from "react"

import { calculateSajuPillars } from "@/lib/saju"
import type { SajuPillars } from "@/types/saju"

export function useSaju(
  year: number | null,
  month: number | null,
  day: number | null,
  hour: number | null
) {
  const pillars = React.useMemo<SajuPillars | null>(() => {
    if (!year || !month || !day || hour === null) {
      return null
    }

    try {
      return calculateSajuPillars({ year, month, day, hour })
    } catch {
      return null
    }
  }, [year, month, day, hour])

  return { pillars }
}
