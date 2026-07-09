export type ZodiacAnimal =
  | "쥐"
  | "소"
  | "호랑이"
  | "토끼"
  | "용"
  | "뱀"
  | "말"
  | "양"
  | "원숭이"
  | "닭"
  | "개"
  | "돼지"

export type DailyFortune = {
  animal: ZodiacAnimal
  message: string
}
