"use client"

import * as React from "react"
import { AlertCircleIcon, Loader2Icon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Input } from "@/components/ui/input"
import { STOCKS } from "@/config/stocks"
import { formatCurrencyAmount } from "@/lib/format-currency"
import { useStockInvestment } from "@/hooks/use-stock-investment"

const STOCK_SYMBOLS = STOCKS.map((stock) => stock.symbol)
const STOCK_BY_SYMBOL = new Map(STOCKS.map((stock) => [stock.symbol, stock]))

function stockLabel(symbol: string) {
  const stock = STOCK_BY_SYMBOL.get(symbol)
  return stock ? `${stock.nameKo} (${stock.symbol})` : symbol
}

function formatDate(iso: string) {
  return iso.slice(0, 10)
}

export function StockSection() {
  const today = new Date().toISOString().slice(0, 10)

  const [symbol, setSymbol] = React.useState<string | null>(null)
  const [date, setDate] = React.useState("")
  const [amount, setAmount] = React.useState("")

  const amountNumber = amount ? Number(amount) : null
  const { prices, investment, status } = useStockInvestment(
    symbol,
    date || null,
    amountNumber && amountNumber > 0 ? amountNumber : null
  )

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>모의 주식 투자</CardTitle>
        <div className="flex flex-col gap-2">
          <Combobox
            items={STOCK_SYMBOLS}
            value={symbol ?? ""}
            onValueChange={(value) => setSymbol(value || null)}
            itemToStringLabel={stockLabel}
          >
            <ComboboxInput placeholder="종목 검색..." />
            <ComboboxContent>
              <ComboboxEmpty>검색 결과가 없습니다</ComboboxEmpty>
              <ComboboxList>
                {(value) => (
                  <ComboboxItem key={value} value={value}>
                    {stockLabel(value)}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <Input
            type="date"
            max={today}
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <Input
            type="number"
            min={0}
            placeholder="투자 금액"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        {status === "idle" && (
          <p className="py-4 text-center text-muted-foreground">
            종목, 날짜, 투자 금액을 모두 입력하면 예상 수익을 볼 수 있어요.
          </p>
        )}

        {status === "loading" && (
          <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground">
            <Loader2Icon className="size-5 animate-spin" />
            <span>주가를 불러오는 중...</span>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center justify-center gap-2 py-8 text-destructive">
            <AlertCircleIcon className="size-5" />
            <span>주가 정보를 가져오지 못했습니다.</span>
          </div>
        )}

        {status === "success" && prices && investment && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {formatDate(prices.historicalDate)} 주가
              </span>
              <span>{formatCurrencyAmount(prices.historicalPrice, prices.currency)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">현재 주가</span>
              <span>{formatCurrencyAmount(prices.currentPrice, prices.currency)}</span>
            </div>
            <div className="flex justify-between border-t pt-2 font-medium">
              <span>손익</span>
              <span
                className={
                  investment.profitLoss >= 0 ? "text-red-600" : "text-blue-600"
                }
              >
                {investment.profitLoss >= 0 ? "+" : ""}
                {formatCurrencyAmount(investment.profitLoss, prices.currency)} (
                {investment.profitLossPercent >= 0 ? "+" : ""}
                {investment.profitLossPercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
