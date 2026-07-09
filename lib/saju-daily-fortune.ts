import { calculateFourPillars } from "manseryeok"

import { getFiveElementRelation, type FiveElementRelation } from "@/lib/five-elements"
import type { SajuDayMaster } from "@/types/saju"

const FORTUNE_MESSAGES: Record<FiveElementRelation, string> = {
  generatedBy:
    "오늘의 기운이 나를 채워주는 날입니다. 도움을 받기 좋으니 새로운 시도를 해보세요.",
  generates:
    "내가 가진 기운을 쏟아내는 날입니다. 활동적이지만 무리하지 않게 컨디션을 살피세요.",
  overcomeBy:
    "오늘의 기운에 눌리기 쉬운 날입니다. 신중하게 움직이고 휴식을 챙기세요.",
  overcomes:
    "내가 주도권을 쥐는 날입니다. 추진력이 좋으니 미뤄둔 일을 처리해보세요.",
  same: "나와 같은 기운이 흐르는 균형 잡힌 날입니다. 평소 하던 대로 차분히 임하면 좋습니다.",
}

export function getTodaySajuFortune(
  dayMaster: SajuDayMaster,
  today: Date = new Date()
): string {
  const todayPillars = calculateFourPillars({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
    hour: 12,
    minute: 0,
  })

  const relation = getFiveElementRelation(
    dayMaster.element,
    todayPillars.dayElement.stem
  )

  return FORTUNE_MESSAGES[relation]
}
