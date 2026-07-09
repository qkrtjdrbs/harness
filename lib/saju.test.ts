import { describe, expect, it } from "vitest"

import { calculateSajuPillars } from "@/lib/saju"

describe("calculateSajuPillars", () => {
  it("maps a known birth date to the four pillars", () => {
    const pillars = calculateSajuPillars({
      year: 1992,
      month: 10,
      day: 24,
      hour: 5,
    })

    expect(pillars).toEqual({
      year: "임신",
      month: "경술",
      day: "계유",
      hour: "을묘",
    })
  })

  it("throws for a year outside the supported range", () => {
    expect(() =>
      calculateSajuPillars({ year: 1700, month: 1, day: 1, hour: 0 })
    ).toThrow()
  })
})
