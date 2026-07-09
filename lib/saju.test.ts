import { describe, expect, it } from "vitest"

import { calculateSaju } from "@/lib/saju"

describe("calculateSaju", () => {
  it("maps a known birth date to the four pillars and day master", () => {
    const result = calculateSaju({
      year: 1992,
      month: 10,
      day: 24,
      hour: 5,
    })

    expect(result).toEqual({
      pillars: {
        year: "임신",
        month: "경술",
        day: "계유",
        hour: "을묘",
      },
      dayMaster: {
        element: "수",
        yinYang: "음",
      },
    })
  })

  it("throws for a year outside the supported range", () => {
    expect(() =>
      calculateSaju({ year: 1700, month: 1, day: 1, hour: 0 })
    ).toThrow()
  })
})
