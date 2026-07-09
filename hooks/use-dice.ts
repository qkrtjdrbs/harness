"use client"

import * as React from "react"

import { rollDice } from "@/lib/dice"
import { getNextDiceRotation } from "@/lib/dice-rotation"
import { getDiceCheerMessage } from "@/lib/dice-messages"
import type { DiceRotation, DiceValue } from "@/types/dice"

const ROLL_DURATION_MS = 900
const EXTRA_SPINS = 2

export function useDice() {
  const [isRolling, setIsRolling] = React.useState(false)
  const [rotation, setRotation] = React.useState<DiceRotation>({ x: 0, y: 0 })
  const [value, setValue] = React.useState<DiceValue | null>(null)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const roll = React.useCallback(() => {
    if (isRolling) return

    const result = rollDice()
    setIsRolling(true)
    setValue(null)
    setRotation((current) => getNextDiceRotation(current, result, EXTRA_SPINS))

    timeoutRef.current = setTimeout(() => {
      setValue(result)
      setIsRolling(false)
    }, ROLL_DURATION_MS)
  }, [isRolling])

  return {
    isRolling,
    rotation,
    value,
    message: value ? getDiceCheerMessage(value) : null,
    roll,
  }
}
