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
import { useSaju } from "@/hooks/use-saju"

const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from(
  { length: CURRENT_YEAR - 1900 + 1 },
  (_, index) => CURRENT_YEAR - index
)
const MONTHS = Array.from({ length: 12 }, (_, index) => index + 1)
const DAYS = Array.from({ length: 31 }, (_, index) => index + 1)
const HOURS = Array.from({ length: 24 }, (_, index) => index)

const PILLAR_LABELS = {
  year: "년주",
  month: "월주",
  day: "일주",
  hour: "시주",
} as const

export function SajuSection() {
  const [birthYear, setBirthYear] = React.useState<number | null>(null)
  const [birthMonth, setBirthMonth] = React.useState<number | null>(null)
  const [birthDay, setBirthDay] = React.useState<number | null>(null)
  const [birthHour, setBirthHour] = React.useState<number | null>(null)
  const { pillars, dailyFortune } = useSaju(
    birthYear,
    birthMonth,
    birthDay,
    birthHour
  )

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>오늘의 운세</CardTitle>
        <div className="grid grid-cols-2 gap-2">
          <Select
            value={birthYear ? String(birthYear) : ""}
            onValueChange={(value) => setBirthYear(Number(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="태어난 연도" />
            </SelectTrigger>
            <SelectContent>
              {YEARS.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}년
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={birthMonth ? String(birthMonth) : ""}
            onValueChange={(value) => setBirthMonth(Number(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="태어난 월" />
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
              <SelectValue placeholder="태어난 일" />
            </SelectTrigger>
            <SelectContent>
              {DAYS.map((day) => (
                <SelectItem key={day} value={String(day)}>
                  {day}일
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={birthHour !== null ? String(birthHour) : ""}
            onValueChange={(value) => setBirthHour(Number(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="태어난 시" />
            </SelectTrigger>
            <SelectContent>
              {HOURS.map((hour) => (
                <SelectItem key={hour} value={String(hour)}>
                  {hour}시
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {!pillars && (
          <p className="py-4 text-center text-muted-foreground">
            생년월일시를 모두 선택하면 사주팔자를 볼 수 있어요.
          </p>
        )}

        {pillars && (
          <div className="space-y-2">
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <SparklesIcon className="size-4" />
              {birthYear}년 {birthMonth}월 {birthDay}일 {birthHour}시
            </p>
            <div className="grid grid-cols-4 gap-2 text-center">
              {(Object.keys(PILLAR_LABELS) as Array<keyof typeof PILLAR_LABELS>).map(
                (key) => (
                  <div key={key} className="rounded-md border p-2">
                    <p className="text-xs text-muted-foreground">
                      {PILLAR_LABELS[key]}
                    </p>
                    <p className="font-medium">{pillars[key]}</p>
                  </div>
                )
              )}
            </div>

            {dailyFortune && (
              <p className="text-sm text-muted-foreground pt-2">{dailyFortune}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
