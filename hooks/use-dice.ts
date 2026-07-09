"use client"

import * as React from "react"

import { getDiceCheerMessage } from "@/lib/dice-messages"
import { rollDice } from "@/lib/dice"
import type { DiceValue } from "@/types/dice"

const ROLL_ANIMATION_MS = 800
const ROLL_TICK_MS = 80

export function useDice() {
  const [isRolling, setIsRolling] = React.useState(false)
  const [displayValue, setDisplayValue] = React.useState<DiceValue>(1)
  const [value, setValue] = React.useState<DiceValue | null>(null)
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const roll = React.useCallback(() => {
    if (isRolling) return

    setIsRolling(true)
    setValue(null)

    intervalRef.current = setInterval(() => {
      setDisplayValue(rollDice())
    }, ROLL_TICK_MS)

    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      const result = rollDice()
      setDisplayValue(result)
      setValue(result)
      setIsRolling(false)
    }, ROLL_ANIMATION_MS)
  }, [isRolling])

  return {
    isRolling,
    displayValue,
    value,
    message: value ? getDiceCheerMessage(value) : null,
    roll,
  }
}
