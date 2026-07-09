import type { DiceValue } from "@/types/dice"

export function rollDice(): DiceValue {
  return (Math.floor(Math.random() * 6) + 1) as DiceValue
}
