export type SajuInput = {
  year: number
  month: number
  day: number
  hour: number
}

export type SajuPillars = {
  year: string
  month: string
  day: string
  hour: string
}

export type FiveElement = "목" | "화" | "토" | "금" | "수"

export type YinYang = "양" | "음"

export type SajuDayMaster = {
  element: FiveElement
  yinYang: YinYang
}

export type SajuResult = {
  pillars: SajuPillars
  dayMaster: SajuDayMaster
}
