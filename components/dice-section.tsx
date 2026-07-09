"use client"

import {
  Dice1Icon,
  Dice2Icon,
  Dice3Icon,
  Dice4Icon,
  Dice5Icon,
  Dice6Icon,
  type LucideIcon,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useDice } from "@/hooks/use-dice"
import type { DiceValue } from "@/types/dice"

const DICE_ICONS: Record<DiceValue, LucideIcon> = {
  1: Dice1Icon,
  2: Dice2Icon,
  3: Dice3Icon,
  4: Dice4Icon,
  5: Dice5Icon,
  6: Dice6Icon,
}

const MESSAGE_WEIGHT_BY_VALUE: Record<DiceValue, string> = {
  1: "font-normal",
  2: "font-normal",
  3: "font-medium",
  4: "font-semibold",
  5: "font-bold",
  6: "font-extrabold",
}

export function DiceSection() {
  const { isRolling, displayValue, value, message, roll } = useDice()
  const DiceIcon = DICE_ICONS[displayValue]

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>행운의 주사위 굴리기</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 py-4">
        <button
          type="button"
          onClick={roll}
          disabled={isRolling}
          aria-label="주사위 굴리기"
          className="flex size-24 items-center justify-center rounded-full transition-transform hover:scale-105 disabled:pointer-events-none disabled:opacity-50"
        >
          <DiceIcon
            className={`size-20 ${isRolling ? "animate-spin" : ""}`}
          />
        </button>

        {!value && !isRolling && (
          <p className="text-center text-muted-foreground">
            주사위를 눌러서 오늘의 행운을 확인해보세요.
          </p>
        )}

        {value && message && (
          <p
            className={`text-center ${MESSAGE_WEIGHT_BY_VALUE[value]}`}
          >
            {message}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
