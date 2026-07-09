import type { DiceRotation, DiceValue } from "@/types/dice"

export const DICE_FACE_ROTATIONS: Record<DiceValue, DiceRotation> = {
  1: { x: 0, y: 0 },
  2: { x: 0, y: -90 },
  3: { x: -90, y: 0 },
  4: { x: 90, y: 0 },
  5: { x: 0, y: 90 },
  6: { x: 0, y: 180 },
}

export function nextRollAngle(
  current: number,
  targetMod: number,
  extraSpins: number
): number {
  const base = Math.ceil(current / 360) * 360
  const normalizedTarget = ((targetMod % 360) + 360) % 360
  return base + extraSpins * 360 + normalizedTarget
}

export function getNextDiceRotation(
  current: DiceRotation,
  target: DiceValue,
  extraSpins: number
): DiceRotation {
  const targetAngles = DICE_FACE_ROTATIONS[target]

  return {
    x: nextRollAngle(current.x, targetAngles.x, extraSpins),
    y: nextRollAngle(current.y, targetAngles.y, extraSpins),
  }
}
