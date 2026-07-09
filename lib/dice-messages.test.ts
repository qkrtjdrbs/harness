import { describe, expect, it } from "vitest"

import { getDiceCheerMessage } from "@/lib/dice-messages"
import type { DiceValue } from "@/types/dice"

const VALUES: DiceValue[] = [1, 2, 3, 4, 5, 6]

describe("getDiceCheerMessage", () => {
  it("returns a distinct, non-empty message for every dice value", () => {
    const seen = new Set<string>()

    for (const value of VALUES) {
      const message = getDiceCheerMessage(value)
      expect(message.length).toBeGreaterThan(0)
      seen.add(message)
    }

    expect(seen.size).toBe(VALUES.length)
  })
})
