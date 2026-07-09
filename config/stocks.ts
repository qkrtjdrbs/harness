import { KOSPI100_STOCKS } from "@/config/kospi100-stocks"
import { SP500_STOCKS } from "@/config/sp500-stocks"
import type { Stock } from "@/types/stock"

export const DEFAULT_STOCK_SYMBOL = "AAPL"

const STOCKS_BY_SYMBOL = new Map<string, Stock>()
for (const stock of [...SP500_STOCKS, ...KOSPI100_STOCKS]) {
  STOCKS_BY_SYMBOL.set(stock.symbol, stock)
}

export const STOCKS: Stock[] = [...STOCKS_BY_SYMBOL.values()]
