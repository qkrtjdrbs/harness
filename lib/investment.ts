import type { InvestmentResult } from "@/types/stock"

export function calculateInvestmentReturn(
  amount: number,
  historicalPrice: number,
  currentPrice: number
): InvestmentResult {
  const shares = amount / historicalPrice
  const currentValue = shares * currentPrice
  const profitLoss = currentValue - amount
  const profitLossPercent = (profitLoss / amount) * 100

  return { shares, currentValue, profitLoss, profitLossPercent }
}
