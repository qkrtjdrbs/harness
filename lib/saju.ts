import { calculateFourPillars } from "manseryeok"

import type { SajuInput, SajuResult } from "@/types/saju"

export function calculateSaju(input: SajuInput): SajuResult {
  const result = calculateFourPillars({
    year: input.year,
    month: input.month,
    day: input.day,
    hour: input.hour,
    minute: 0,
  })

  return {
    pillars: result.toObject(),
    dayMaster: {
      element: result.dayElement.stem,
      yinYang: result.dayYinYang.stem,
    },
  }
}
