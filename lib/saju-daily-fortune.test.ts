import { describe, expect, it } from "vitest"

import { getTodaySajuFortune } from "@/lib/saju-daily-fortune"

const KNOWN_WATER_DAY = new Date(1992, 9, 24)

describe("getTodaySajuFortune", () => {
  it("returns the 'same' fortune when the day master matches today's element", () => {
    const fortune = getTodaySajuFortune(
      { element: "수", yinYang: "음" },
      KNOWN_WATER_DAY
    )

    expect(fortune).toBe(
      "나와 같은 기운이 흐르는 균형 잡힌 날입니다. 평소 하던 대로 차분히 임하면 좋습니다."
    )
  })

  it("returns the 'generatedBy' fortune when today's element generates the day master", () => {
    const fortune = getTodaySajuFortune(
      { element: "목", yinYang: "양" },
      KNOWN_WATER_DAY
    )

    expect(fortune).toBe(
      "오늘의 기운이 나를 채워주는 날입니다. 도움을 받기 좋으니 새로운 시도를 해보세요."
    )
  })
})
