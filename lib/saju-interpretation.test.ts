import { describe, expect, it } from "vitest"

import { interpretSaju } from "@/lib/saju-interpretation"
import type { FiveElement, YinYang } from "@/types/saju"

const ELEMENTS: FiveElement[] = ["목", "화", "토", "금", "수"]
const YIN_YANGS: YinYang[] = ["양", "음"]

describe("interpretSaju", () => {
  it("mentions the day master element and yin-yang", () => {
    const text = interpretSaju({ element: "수", yinYang: "음" })

    expect(text).toContain("수")
    expect(text).toContain("음")
  })

  it("produces a distinct, non-empty interpretation for every element/yin-yang combination", () => {
    const seen = new Set<string>()

    for (const element of ELEMENTS) {
      for (const yinYang of YIN_YANGS) {
        const text = interpretSaju({ element, yinYang })
        expect(text.length).toBeGreaterThan(0)
        seen.add(text)
      }
    }

    expect(seen.size).toBe(ELEMENTS.length * YIN_YANGS.length)
  })
})
