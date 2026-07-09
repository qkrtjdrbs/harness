import type { Stock } from "@/types/stock"

export const DEFAULT_STOCK_SYMBOL = "AAPL"

export const STOCKS: Stock[] = [
  { symbol: "AAPL", nameKo: "애플", nameEn: "Apple" },
  { symbol: "MSFT", nameKo: "마이크로소프트", nameEn: "Microsoft" },
  { symbol: "GOOGL", nameKo: "알파벳(구글)", nameEn: "Alphabet" },
  { symbol: "AMZN", nameKo: "아마존", nameEn: "Amazon" },
  { symbol: "NVDA", nameKo: "엔비디아", nameEn: "NVIDIA" },
  { symbol: "TSLA", nameKo: "테슬라", nameEn: "Tesla" },
  { symbol: "META", nameKo: "메타", nameEn: "Meta Platforms" },
  { symbol: "005930.KS", nameKo: "삼성전자", nameEn: "Samsung Electronics" },
  { symbol: "000660.KS", nameKo: "SK하이닉스", nameEn: "SK Hynix" },
  { symbol: "035420.KS", nameKo: "네이버", nameEn: "NAVER" },
]
