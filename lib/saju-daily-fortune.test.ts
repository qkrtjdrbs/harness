import { describe, expect, it } from "vitest"

import { getTodayTenGod } from "@/lib/saju-daily-fortune"

const KNOWN_WATER_DAY = new Date(1992, 9, 24)

describe("getTodayTenGod", () => {
  it("returns 비견 when the day master matches today's element and polarity", () => {
    const tenGod = getTodayTenGod({ element: "수", yinYang: "음" }, KNOWN_WATER_DAY)

    expect(tenGod).toBe("비견")
  })

  it("returns 정인/편인 when today's element generates the day master, depending on polarity", () => {
    const same = getTodayTenGod({ element: "목", yinYang: "음" }, KNOWN_WATER_DAY)
    const different = getTodayTenGod({ element: "목", yinYang: "양" }, KNOWN_WATER_DAY)

    expect(same).toBe("정인")
    expect(different).toBe("편인")
  })
})
