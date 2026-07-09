import { calculateFourPillars } from "manseryeok"

import type { SajuInput, SajuPillars } from "@/types/saju"

export function calculateSajuPillars(input: SajuInput): SajuPillars {
  const result = calculateFourPillars({
    year: input.year,
    month: input.month,
    day: input.day,
    hour: input.hour,
    minute: 0,
  })

  return result.toObject()
}
