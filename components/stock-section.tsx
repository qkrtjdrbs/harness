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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { STOCKS } from "@/config/stocks"
import { calculateInvestmentReturn } from "@/lib/investment"
import { convertCurrency } from "@/lib/currency-conversion"
import { formatCurrencyAmount } from "@/lib/format-currency"
import { useExchangeRate } from "@/hooks/use-exchange-rate"
import { useStockInvestment } from "@/hooks/use-stock-investment"
import type { CurrencyCode } from "@/types/stock"

const STOCK_SYMBOLS = STOCKS.map((stock) => stock.symbol)
const STOCK_BY_SYMBOL = new Map(STOCKS.map((stock) => [stock.symbol, stock]))
const CURRENCIES: CurrencyCode[] = ["KRW", "USD"]
const PAGE_SIZE = 20
const SCROLL_LOAD_THRESHOLD_PX = 24

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
  const [inputCurrency, setInputCurrency] = React.useState<CurrencyCode>("KRW")
  const [visibleLimit, setVisibleLimit] = React.useState(PAGE_SIZE)

  const amountNumber = amount ? Number(amount) : null
  const validAmount = amountNumber && amountNumber > 0 ? amountNumber : null

  const { prices, status } = useStockInvestment(symbol, date || null, validAmount)
  const { rate, status: rateStatus } = useExchangeRate(date || null)
  const { rate: currentRate } = useExchangeRate(today)

  function handleStockListScroll(event: React.UIEvent<HTMLDivElement>) {
    const target = event.currentTarget
    const reachedBottom =
      target.scrollTop + target.clientHeight >=
      target.scrollHeight - SCROLL_LOAD_THRESHOLD_PX

    if (reachedBottom) {
      setVisibleLimit((previous) => previous + PAGE_SIZE)
    }
  }

  const investment = React.useMemo(() => {
    if (!prices || !validAmount || !rate) return null

    const convertedAmount = convertCurrency(
      validAmount,
      inputCurrency,
      prices.currency as CurrencyCode,
      rate.usdToKrw
    )

    return calculateInvestmentReturn(
      convertedAmount,
      prices.historicalPrice,
      prices.currentPrice
    )
  }, [prices, validAmount, rate, inputCurrency])

  const usdEquivalent =
    validAmount && rate
      ? convertCurrency(validAmount, inputCurrency, "USD", rate.usdToKrw)
      : null
  const krwEquivalent =
    validAmount && rate
      ? convertCurrency(validAmount, inputCurrency, "KRW", rate.usdToKrw)
      : null

  const profitLossByCurrency = React.useMemo(() => {
    if (!investment || !prices || !currentRate) return null

    return {
      usd: convertCurrency(
        investment.profitLoss,
        prices.currency as CurrencyCode,
        "USD",
        currentRate.usdToKrw
      ),
      krw: convertCurrency(
        investment.profitLoss,
        prices.currency as CurrencyCode,
        "KRW",
        currentRate.usdToKrw
      ),
    }
  }, [investment, prices, currentRate])

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>그때 샀더라면...</CardTitle>
        <p className="text-xs text-muted-foreground">
          특정 날짜에 사서 지금까지 묵혀놨을 때 예상 손익을 계산해줘요.
        </p>
        <p className="text-xs text-muted-foreground">
          S&amp;P500, 코스피100 편입 종목을 검색할 수 있어요. 목록은 스크롤하면
          더 볼 수 있어요.
        </p>
        <div className="flex flex-col gap-2">
          <Combobox
            items={STOCK_SYMBOLS}
            value={symbol ?? ""}
            onValueChange={(value) => setSymbol(value || null)}
            onInputValueChange={() => setVisibleLimit(PAGE_SIZE)}
            onOpenChange={(open) => {
              if (open) setVisibleLimit(PAGE_SIZE)
            }}
            itemToStringLabel={stockLabel}
            limit={visibleLimit}
          >
            <ComboboxInput placeholder="종목 검색..." />
            <ComboboxContent>
              <ComboboxEmpty>검색 결과가 없습니다</ComboboxEmpty>
              <ComboboxList onScroll={handleStockListScroll}>
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
          <div className="flex gap-2">
            <Input
              type="number"
              min={0}
              placeholder="투자 금액"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              className="flex-1"
            />
            <Select
              value={inputCurrency}
              onValueChange={(value) => setInputCurrency(value as CurrencyCode)}
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {validAmount && rateStatus === "loading" && (
            <p className="text-xs text-muted-foreground">
              환율 정보를 불러오는 중...
            </p>
          )}

          {validAmount && rate && usdEquivalent !== null && krwEquivalent !== null && (
            <div className="space-y-0.5 rounded-md bg-muted/50 p-2 text-xs text-muted-foreground">
              <p>달러 환산: {formatCurrencyAmount(usdEquivalent, "USD")}</p>
              <p>원화 환산: {formatCurrencyAmount(krwEquivalent, "KRW")}</p>
              <p>환율 계산 기준: 선택한 날짜({rate.date}) 기준 환율입니다.</p>
            </div>
          )}
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
            {profitLossByCurrency && (
              <>
                <div className="flex justify-between border-t pt-2 font-medium">
                  <span>손익 (달러)</span>
                  <span
                    className={
                      investment.profitLoss >= 0
                        ? "text-red-600"
                        : "text-blue-600"
                    }
                  >
                    {investment.profitLoss >= 0 ? "+" : ""}
                    {formatCurrencyAmount(profitLossByCurrency.usd, "USD")} (
                    {investment.profitLossPercent >= 0 ? "+" : ""}
                    {investment.profitLossPercent.toFixed(2)}%)
                  </span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>손익 (원화)</span>
                  <span
                    className={
                      investment.profitLoss >= 0
                        ? "text-red-600"
                        : "text-blue-600"
                    }
                  >
                    {investment.profitLoss >= 0 ? "+" : ""}
                    {formatCurrencyAmount(profitLossByCurrency.krw, "KRW")} (
                    {investment.profitLossPercent >= 0 ? "+" : ""}
                    {investment.profitLossPercent.toFixed(2)}%)
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  손익 환산은 현재 환율({currentRate?.date}) 기준입니다.
                </p>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
