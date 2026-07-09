import { describe, expect, it } from "vitest"

import { getTodayFiveElementRelation } from "@/lib/saju-daily-fortune"

const KNOWN_WATER_DAY = new Date(1992, 9, 24)

describe("getTodayFiveElementRelation", () => {
  it("returns 'same' when the day master matches today's element", () => {
    const relation = getTodayFiveElementRelation(
      { element: "수", yinYang: "음" },
      KNOWN_WATER_DAY
    )

    expect(relation).toBe("same")
  })

  it("returns 'generatedBy' when today's element generates the day master", () => {
    const relation = getTodayFiveElementRelation(
      { element: "목", yinYang: "양" },
      KNOWN_WATER_DAY
    )

    expect(relation).toBe("generatedBy")
  })
})
