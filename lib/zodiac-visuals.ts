import type { WesternZodiacSign } from "@/types/fortune"

export const ZODIAC_SYMBOLS: Record<WesternZodiacSign, string> = {
  aries: "♈",
  taurus: "♉",
  gemini: "♊",
  cancer: "♋",
  leo: "♌",
  virgo: "♍",
  libra: "♎",
  scorpio: "♏",
  sagittarius: "♐",
  capricorn: "♑",
  aquarius: "♒",
  pisces: "♓",
}

export const ZODIAC_GRADIENTS: Record<WesternZodiacSign, string> = {
  aries: "from-red-400 to-orange-500",
  leo: "from-orange-400 to-amber-500",
  sagittarius: "from-amber-500 to-red-500",
  taurus: "from-emerald-500 to-lime-600",
  virgo: "from-lime-500 to-emerald-600",
  capricorn: "from-stone-500 to-emerald-700",
  gemini: "from-sky-400 to-cyan-500",
  libra: "from-cyan-400 to-sky-500",
  aquarius: "from-sky-500 to-indigo-500",
  cancer: "from-indigo-400 to-blue-600",
  scorpio: "from-purple-600 to-indigo-700",
  pisces: "from-blue-500 to-purple-600",
}
