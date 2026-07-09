import type { ZodiacAnimal } from "@/types/fortune"

const ZODIAC_BY_YEAR_MOD_12: ZodiacAnimal[] = [
  "원숭이",
  "닭",
  "개",
  "돼지",
  "쥐",
  "소",
  "호랑이",
  "토끼",
  "용",
  "뱀",
  "말",
  "양",
]

export function getZodiacAnimal(birthYear: number): ZodiacAnimal {
  const index = ((birthYear % 12) + 12) % 12
  return ZODIAC_BY_YEAR_MOD_12[index]
}
