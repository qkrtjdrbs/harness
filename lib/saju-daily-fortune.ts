import { calculateFourPillars } from "manseryeok"

import { getFiveElementRelation, type FiveElementRelation } from "@/lib/five-elements"
import type { SajuDayMaster } from "@/types/saju"

export function getTodayFiveElementRelation(
  dayMaster: SajuDayMaster,
  today: Date = new Date()
): FiveElementRelation {
  const todayPillars = calculateFourPillars({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
    hour: 12,
    minute: 0,
  })

  return getFiveElementRelation(dayMaster.element, todayPillars.dayElement.stem)
}
