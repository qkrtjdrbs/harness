export function formatCurrencyAmount(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency,
      maximumFractionDigits: currency === "KRW" ? 0 : 2,
    }).format(amount)
  } catch {
    return `${amount.toFixed(2)} ${currency}`
  }
}
