import type { WesternZodiacSign } from "@/types/fortune"

type ZodiacRange = {
  sign: WesternZodiacSign
  labelKo: string
  start: [number, number]
  end: [number, number]
}

const ZODIAC_RANGES: ZodiacRange[] = [
  { sign: "aries", labelKo: "양자리", start: [3, 21], end: [4, 19] },
  { sign: "taurus", labelKo: "황소자리", start: [4, 20], end: [5, 20] },
  { sign: "gemini", labelKo: "쌍둥이자리", start: [5, 21], end: [6, 20] },
  { sign: "cancer", labelKo: "게자리", start: [6, 21], end: [7, 22] },
  { sign: "leo", labelKo: "사자자리", start: [7, 23], end: [8, 22] },
  { sign: "virgo", labelKo: "처녀자리", start: [8, 23], end: [9, 22] },
  { sign: "libra", labelKo: "천칭자리", start: [9, 23], end: [10, 22] },
  { sign: "scorpio", labelKo: "전갈자리", start: [10, 23], end: [11, 21] },
  { sign: "sagittarius", labelKo: "사수자리", start: [11, 22], end: [12, 21] },
  { sign: "aquarius", labelKo: "물병자리", start: [1, 20], end: [2, 18] },
  { sign: "pisces", labelKo: "물고기자리", start: [2, 19], end: [3, 20] },
]

const CAPRICORN: ZodiacRange = {
  sign: "capricorn",
  labelKo: "염소자리",
  start: [12, 22],
  end: [1, 19],
}

function toComparable(month: number, day: number): number {
  return month * 100 + day
}

function isWithinRange(month: number, day: number, range: ZodiacRange): boolean {
  const value = toComparable(month, day)
  return value >= toComparable(...range.start) && value <= toComparable(...range.end)
}

export function getWesternZodiacSign(
  month: number,
  day: number
): { sign: WesternZodiacSign; labelKo: string } {
  if (
    (month === 12 && day >= CAPRICORN.start[1]) ||
    (month === 1 && day <= CAPRICORN.end[1])
  ) {
    return { sign: CAPRICORN.sign, labelKo: CAPRICORN.labelKo }
  }

  const match = ZODIAC_RANGES.find((range) => isWithinRange(month, day, range))
  return match
    ? { sign: match.sign, labelKo: match.labelKo }
    : { sign: CAPRICORN.sign, labelKo: CAPRICORN.labelKo }
}

export function getKoreanLabelForSign(sign: WesternZodiacSign): string {
  const match = [...ZODIAC_RANGES, CAPRICORN].find((range) => range.sign === sign)
  return match?.labelKo ?? sign
}
