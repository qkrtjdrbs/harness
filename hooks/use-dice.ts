"use client"

import * as React from "react"

import { rollDice } from "@/lib/dice"
import { getNextDiceRotation } from "@/lib/dice-rotation"
import { fetchDiceCheerMessage } from "@/services/dice-fortune-service"
import type { DiceRotation, DiceValue } from "@/types/dice"

const ROLL_DURATION_MS = 900
const EXTRA_SPINS = 2

type MessageStatus = "idle" | "loading" | "success" | "error"

export function useDice() {
  const [isRolling, setIsRolling] = React.useState(false)
  const [rotation, setRotation] = React.useState<DiceRotation>({ x: 0, y: 0 })
  const [value, setValue] = React.useState<DiceValue | null>(null)
  const [message, setMessage] = React.useState<string | null>(null)
  const [messageStatus, setMessageStatus] = React.useState<MessageStatus>("idle")
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  React.useEffect(() => {
    if (!value) {
      setMessageStatus("idle")
      setMessage(null)
      return
    }

    let cancelled = false
    setMessageStatus("loading")

    const today = new Date().toISOString().slice(0, 10)

    fetchDiceCheerMessage(value, today)
      .then((fetchedMessage) => {
        if (cancelled) return
        setMessage(fetchedMessage)
        setMessageStatus("success")
      })
      .catch(() => {
        if (cancelled) return
        setMessageStatus("error")
      })

    return () => {
      cancelled = true
    }
  }, [value])

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
    message,
    messageStatus,
    roll,
  }
}
