import { describe, expect, it } from "vitest"

import { getTenGod } from "@/lib/ten-gods"
import type { FiveElement, YinYang } from "@/types/saju"

const ELEMENTS: FiveElement[] = ["목", "화", "토", "금", "수"]
const YIN_YANGS: YinYang[] = ["양", "음"]

describe("getTenGod", () => {
  it("returns 비견/겁재 for the same element depending on polarity match", () => {
    expect(getTenGod({ element: "목", yinYang: "양" }, { element: "목", yinYang: "양" })).toBe(
      "비견"
    )
    expect(getTenGod({ element: "목", yinYang: "양" }, { element: "목", yinYang: "음" })).toBe(
      "겁재"
    )
  })

  it("returns 정인/편인 when the other element generates the day master", () => {
    expect(getTenGod({ element: "화", yinYang: "양" }, { element: "목", yinYang: "양" })).toBe(
      "정인"
    )
    expect(getTenGod({ element: "화", yinYang: "양" }, { element: "목", yinYang: "음" })).toBe(
      "편인"
    )
  })

  it("produces exactly 10 distinct results across all element/polarity combinations", () => {
    const seen = new Set<string>()

    for (const dayElement of ELEMENTS) {
      for (const dayYinYang of YIN_YANGS) {
        const result = getTenGod(
          { element: dayElement, yinYang: dayYinYang },
          { element: "목", yinYang: "양" }
        )
        seen.add(result)
      }
    }

    expect(seen.size).toBe(10)
  })
})
