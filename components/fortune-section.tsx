"use client"

import * as React from "react"
import { SparklesIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getZodiacAnimal } from "@/lib/zodiac"
import { useDailyFortune } from "@/hooks/use-daily-fortune"

const CURRENT_YEAR = new Date().getFullYear()
const EARLIEST_BIRTH_YEAR = 1940
const BIRTH_YEARS = Array.from(
  { length: CURRENT_YEAR - EARLIEST_BIRTH_YEAR + 1 },
  (_, index) => CURRENT_YEAR - index
)

export function FortuneSection() {
  const [birthYear, setBirthYear] = React.useState<number | null>(null)
  const fortune = useDailyFortune(birthYear)

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>오늘의 운세</CardTitle>
        <Select
          value={birthYear ? String(birthYear) : ""}
          onValueChange={(value) => setBirthYear(Number(value))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="출생연도를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            {BIRTH_YEARS.map((year) => (
              <SelectItem key={year} value={String(year)}>
                {year}년생 ({getZodiacAnimal(year)}띠)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {!fortune && (
          <p className="py-4 text-center text-muted-foreground">
            출생연도를 선택하면 오늘의 운세를 볼 수 있어요.
          </p>
        )}

        {fortune && (
          <div className="space-y-2">
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <SparklesIcon className="size-4" />
              {fortune.animal}띠
            </p>
            <p>{fortune.message}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
