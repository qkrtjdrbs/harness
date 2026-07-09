import { describe, expect, it } from "vitest"

import { getFiveElementRelation } from "@/lib/five-elements"
import type { FiveElement } from "@/types/saju"

const ELEMENTS: FiveElement[] = ["목", "화", "토", "금", "수"]

describe("getFiveElementRelation", () => {
  it("returns 'same' for identical elements", () => {
    for (const element of ELEMENTS) {
      expect(getFiveElementRelation(element, element)).toBe("same")
    }
  })

  it("is exhaustive and consistent for every element pair", () => {
    for (const from of ELEMENTS) {
      for (const to of ELEMENTS) {
        const relation = getFiveElementRelation(from, to)
        const inverse = getFiveElementRelation(to, from)

        if (from === to) {
          expect(relation).toBe("same")
          continue
        }

        const opposite: Record<string, string> = {
          generates: "generatedBy",
          generatedBy: "generates",
          overcomes: "overcomeBy",
          overcomeBy: "overcomes",
        }
        expect(inverse).toBe(opposite[relation])
      }
    }
  })

  it("matches known 오행 상생 pairs", () => {
    expect(getFiveElementRelation("목", "화")).toBe("generates")
    expect(getFiveElementRelation("화", "토")).toBe("generates")
    expect(getFiveElementRelation("토", "금")).toBe("generates")
    expect(getFiveElementRelation("금", "수")).toBe("generates")
    expect(getFiveElementRelation("수", "목")).toBe("generates")
  })

  it("matches known 오행 상극 pairs", () => {
    expect(getFiveElementRelation("목", "토")).toBe("overcomes")
    expect(getFiveElementRelation("화", "금")).toBe("overcomes")
    expect(getFiveElementRelation("토", "수")).toBe("overcomes")
    expect(getFiveElementRelation("금", "목")).toBe("overcomes")
    expect(getFiveElementRelation("수", "화")).toBe("overcomes")
  })
})
