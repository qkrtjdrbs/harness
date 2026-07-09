import { describe, expect, it } from "vitest"

import { rollDice } from "@/lib/dice"

describe("rollDice", () => {
  it("always returns an integer between 1 and 6", () => {
    for (let i = 0; i < 1000; i++) {
      const value = rollDice()
      expect(Number.isInteger(value)).toBe(true)
      expect(value).toBeGreaterThanOrEqual(1)
      expect(value).toBeLessThanOrEqual(6)
    }
  })
})
