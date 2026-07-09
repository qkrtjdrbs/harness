"use client"

import * as React from "react"
import { AlertCircleIcon, Loader2Icon, SparklesIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFortune } from "@/hooks/use-fortune"
import { ZODIAC_GRADIENTS, ZODIAC_SYMBOLS } from "@/lib/zodiac-visuals"

const MONTHS = Array.from({ length: 12 }, (_, index) => index + 1)
const DAYS = Array.from({ length: 31 }, (_, index) => index + 1)

export function FortuneSection() {
  const [birthMonth, setBirthMonth] = React.useState<number | null>(null)
  const [birthDay, setBirthDay] = React.useState<number | null>(null)
  const { fortune, status } = useFortune(birthMonth, birthDay)

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>오늘의 별자리 운세</CardTitle>
        <div className="flex gap-2">
          <Select
            value={birthMonth ? String(birthMonth) : ""}
            onValueChange={(value) => setBirthMonth(Number(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="생일 월" />
            </SelectTrigger>
            <SelectContent>
              {MONTHS.map((month) => (
                <SelectItem key={month} value={String(month)}>
                  {month}월
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={birthDay ? String(birthDay) : ""}
            onValueChange={(value) => setBirthDay(Number(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="생일 일" />
            </SelectTrigger>
            <SelectContent>
              {DAYS.map((day) => (
                <SelectItem key={day} value={String(day)}>
                  {day}일
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {status === "idle" && (
          <p className="py-4 text-center text-muted-foreground">
            생일(월/일)을 선택하면 별자리 운세를 볼 수 있어요.
          </p>
        )}

        {status === "loading" && (
          <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground">
            <Loader2Icon className="size-5 animate-spin" />
            <span>운세를 불러오는 중...</span>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center justify-center gap-2 py-8 text-destructive">
            <AlertCircleIcon className="size-5" />
            <span>운세 정보를 가져오지 못했습니다.</span>
          </div>
        )}

        {status === "success" && fortune && (
          <div className="space-y-3">
            <div
              className={`mx-auto flex size-20 items-center justify-center rounded-full bg-gradient-to-br text-4xl text-white shadow-md ${ZODIAC_GRADIENTS[fortune.sign]}`}
            >
              {ZODIAC_SYMBOLS[fortune.sign]}
            </div>
            <p className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <SparklesIcon className="size-4" />
              {fortune.signLabelKo} · {fortune.date}
            </p>
            <p>{fortune.horoscope}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
