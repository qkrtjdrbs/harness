import { describe, expect, it } from "vitest"

import { calculateInvestmentReturn } from "@/lib/investment"

describe("calculateInvestmentReturn", () => {
  it("computes profit when the price rose", () => {
    const result = calculateInvestmentReturn(1000, 100, 150)

    expect(result.shares).toBe(10)
    expect(result.currentValue).toBe(1500)
    expect(result.profitLoss).toBe(500)
    expect(result.profitLossPercent).toBe(50)
  })

  it("computes loss when the price fell", () => {
    const result = calculateInvestmentReturn(1000, 100, 80)

    expect(result.currentValue).toBe(800)
    expect(result.profitLoss).toBe(-200)
    expect(result.profitLossPercent).toBe(-20)
  })

  it("returns zero profit when the price is unchanged", () => {
    const result = calculateInvestmentReturn(1000, 100, 100)

    expect(result.profitLoss).toBe(0)
    expect(result.profitLossPercent).toBe(0)
  })
})
