export type Stock = {
  symbol: string
  nameKo: string
  nameEn: string
}

export type StockPriceResult = {
  historicalDate: string
  historicalPrice: number
  currentPrice: number
  currency: string
}

export type InvestmentResult = {
  shares: number
  currentValue: number
  profitLoss: number
  profitLossPercent: number
}
