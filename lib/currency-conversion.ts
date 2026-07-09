import type { CurrencyCode } from "@/types/stock"

export function convertCurrency(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode,
  usdToKrw: number
): number {
  if (from === to) return amount
  if (from === "USD" && to === "KRW") return amount * usdToKrw
  return amount / usdToKrw
}
