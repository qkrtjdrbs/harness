const CLEAR_CODES = new Set([0])
const CLOUDY_CODES = new Set([1, 2, 3])
const FOG_CODES = new Set([45, 48])
const DRIZZLE_CODES = new Set([51, 53, 55, 56, 57])
const RAIN_CODES = new Set([61, 63, 65, 66, 67])
const SNOW_CODES = new Set([71, 73, 75, 77])
const SHOWER_CODES = new Set([80, 81, 82])
const SNOW_SHOWER_CODES = new Set([85, 86])
const THUNDERSTORM_CODES = new Set([95, 96, 99])

export function weatherCodeToCondition(code: number): string {
  if (CLEAR_CODES.has(code)) return "맑음"
  if (CLOUDY_CODES.has(code)) return "구름 조금"
  if (FOG_CODES.has(code)) return "안개"
  if (DRIZZLE_CODES.has(code)) return "약한 비"
  if (RAIN_CODES.has(code)) return "비"
  if (SNOW_CODES.has(code)) return "눈"
  if (SHOWER_CODES.has(code)) return "소나기"
  if (SNOW_SHOWER_CODES.has(code)) return "소나기(눈)"
  if (THUNDERSTORM_CODES.has(code)) return "뇌우"
  return "알 수 없음"
}
