import { describe, expect, it } from "vitest"

import { formatCurrencyAmount } from "@/lib/format-currency"

describe("formatCurrencyAmount", () => {
  it("formats USD with two decimal places", () => {
    expect(formatCurrencyAmount(184.25, "USD")).toBe("US$184.25")
  })

  it("formats KRW without decimal places", () => {
    expect(formatCurrencyAmount(76500, "KRW")).toBe("₩76,500")
  })

  it("falls back to a plain string for an unknown currency code", () => {
    expect(formatCurrencyAmount(10, "NOT_A_CURRENCY")).toBe("10.00 NOT_A_CURRENCY")
  })
})
