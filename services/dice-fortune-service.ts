import type { DiceValue } from "@/types/dice"

export async function fetchDiceCheerMessage(
  value: DiceValue,
  date: string
): Promise<string> {
  const response = await fetch(
    `/api/dice-fortune?value=${encodeURIComponent(value)}&date=${encodeURIComponent(date)}`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch dice fortune")
  }

  const data: { message: string } = await response.json()
  return data.message
}
