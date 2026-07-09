import { describe, expect, it } from "vitest"

import { convertCurrency } from "@/lib/currency-conversion"

describe("convertCurrency", () => {
  it("returns the same amount when currencies match", () => {
    expect(convertCurrency(1000, "USD", "USD", 1300)).toBe(1000)
    expect(convertCurrency(1000, "KRW", "KRW", 1300)).toBe(1000)
  })

  it("converts USD to KRW using the rate", () => {
    expect(convertCurrency(100, "USD", "KRW", 1300)).toBe(130000)
  })

  it("converts KRW to USD using the rate", () => {
    expect(convertCurrency(130000, "KRW", "USD", 1300)).toBe(100)
  })
})
