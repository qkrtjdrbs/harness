"use client"

import { DiceCube } from "@/components/dice-cube"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useDice } from "@/hooks/use-dice"
import type { DiceValue } from "@/types/dice"

const MESSAGE_WEIGHT_BY_VALUE: Record<DiceValue, string> = {
  1: "font-normal",
  2: "font-normal",
  3: "font-medium",
  4: "font-semibold",
  5: "font-bold",
  6: "font-extrabold",
}

export function DiceSection() {
  const { isRolling, rotation, value, message, roll } = useDice()

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>행운의 주사위 굴리기</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 py-6">
        <button
          type="button"
          onClick={roll}
          disabled={isRolling}
          aria-label="주사위 굴리기"
          className="cursor-pointer disabled:pointer-events-none disabled:opacity-70"
        >
          <DiceCube rotation={rotation} />
        </button>

        {!value && !isRolling && (
          <p className="text-center text-muted-foreground">
            주사위를 눌러서 오늘의 행운을 확인해보세요.
          </p>
        )}

        {value && message && (
          <p className={`text-center ${MESSAGE_WEIGHT_BY_VALUE[value]}`}>
            {message}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
