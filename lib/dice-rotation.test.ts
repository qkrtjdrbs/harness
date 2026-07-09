import { describe, expect, it } from "vitest"

import {
  DICE_FACE_ROTATIONS,
  getNextDiceRotation,
  nextRollAngle,
} from "@/lib/dice-rotation"
import type { DiceValue } from "@/types/dice"

const VALUES: DiceValue[] = [1, 2, 3, 4, 5, 6]

function normalize(angle: number): number {
  return ((angle % 360) + 360) % 360
}

describe("nextRollAngle", () => {
  it("always moves forward and lands on the normalized target", () => {
    const cases: Array<[number, number, number]> = [
      [0, 90, 2],
      [90, 0, 2],
      [810, 180, 2],
      [-90, -90, 1],
    ]

    for (const [current, target, spins] of cases) {
      const next = nextRollAngle(current, target, spins)
      expect(next).toBeGreaterThan(current)
      expect(normalize(next)).toBe(normalize(target))
    }
  })
})

describe("getNextDiceRotation", () => {
  it("lands on each dice value's face rotation from a resting position", () => {
    for (const value of VALUES) {
      const next = getNextDiceRotation({ x: 0, y: 0 }, value, 2)
      const expected = DICE_FACE_ROTATIONS[value]

      expect(normalize(next.x)).toBe(normalize(expected.x))
      expect(normalize(next.y)).toBe(normalize(expected.y))
    }
  })

  it("keeps rotating forward across consecutive rolls", () => {
    let rotation = { x: 0, y: 0 }

    for (const value of [3, 6, 1, 5]) {
      const next = getNextDiceRotation(rotation, value as DiceValue, 2)
      expect(next.x).toBeGreaterThanOrEqual(rotation.x)
      expect(next.y).toBeGreaterThanOrEqual(rotation.y)
      rotation = next
    }
  })
})
