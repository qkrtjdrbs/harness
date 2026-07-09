import { calculateFourPillars } from "manseryeok"

import { getTenGod, type TenGod } from "@/lib/ten-gods"
import type { SajuDayMaster } from "@/types/saju"

export function getTodayTenGod(
  dayMaster: SajuDayMaster,
  today: Date = new Date()
): TenGod {
  const todayPillars = calculateFourPillars({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
    hour: 12,
    minute: 0,
  })

  return getTenGod(dayMaster, {
    element: todayPillars.dayElement.stem,
    yinYang: todayPillars.dayYinYang.stem,
  })
}
