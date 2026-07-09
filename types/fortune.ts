export type WesternZodiacSign =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces"

export type DailyFortune = {
  sign: WesternZodiacSign
  signLabelKo: string
  date: string
  horoscope: string
}
