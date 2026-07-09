import { NextRequest } from "next/server"

import { getDiceCheerMessage } from "@/lib/dice-messages"
import type { DiceValue } from "@/types/dice"

const DICE_VALUES: DiceValue[] = [1, 2, 3, 4, 5, 6]

const VALUE_DESCRIPTIONS: Record<DiceValue, string> = {
  1: "가장 아쉬운 숫자 - 하지만 다독여주는 차분하고 따뜻한 위로 톤. 담담하게 괜찮다고 다음 기회를 기대하게 해줌",
  2: "아쉽지만 나쁘지 않은 숫자 - 잔잔하게 안심시켜주는 톤. 오늘도 무사히 지나갈 거라는 편안한 느낌",
  3: "무난한 숫자 - 특별한 굴곡 없이 평범하게 괜찮은 하루라는 잔잔한 톤",
  4: "살짝 좋은 숫자 - 기대감이 스며드는 살짝 신난 톤. 오 좋은데? 싶은 가벼운 흥분",
  5: "꽤 좋은 숫자 - 대박 조짐이 느껴지는 흥분되고 들뜬 톤. 느낌표를 써도 좋음",
  6: "최고의 숫자 - 완전 럭키비키, 로또 사야 할 것 같은, 인생 역전 각이라는 최대치의 오버스러운 흥분 톤. 느낌표와 이모지를 팍팍 써서 완전 신난 느낌을 표현",
}

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
const GROQ_MODEL = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile"
const MAX_ATTEMPTS = 3

const fortuneCache = new Map<string, string>()

function isDiceValue(value: string | null): value is `${DiceValue}` {
  if (value === null) return false
  return DICE_VALUES.some((diceValue) => String(diceValue) === value)
}

function containsLatinLetters(text: string): boolean {
  return /[A-Za-z]/.test(text)
}

function stripLatinLetters(text: string): string {
  return text
    .replace(/[A-Za-z]+/g, "")
    .replace(/\s{2,}/g, " ")
    .trim()
}

function buildPrompt(value: DiceValue, isRetry: boolean): string {
  const base = `주사위를 굴려서 나온 숫자에 대한 오늘의 응원 문구를 1문장만 작성해줘. 오버스럽고 재미있는 톤으로, 이모지도 1~2개 써도 좋아. 다른 설명 없이 문장만 출력해줘.

말투 규칙:
- 친구한테 카톡 보내듯 자연스러운 구어체 반말로 써. (좋은 예: "오늘은 뭘 해도 잘 풀리는 날이야!", "완전 럭키비키! 로또 사러 가자!!")
- 번역기가 번역한 것처럼 딱딱하고 어색한 문장은 절대 쓰지 마. "당신은", "그것은", "~할 것입니다", "따라서", "그러므로" 같은 번역체 표현은 금지.
- 실제 한국 사람이 평소에 쓰는 말투와 어휘만 써.
- 숫자가 클수록 훨씬 더 오버스럽고 흥분된 톤으로, 숫자가 작을수록 차분하고 담담한 위로 톤으로 써줘.

언어 규칙: 알파벳(영어)은 단 한 글자도 쓰지 마. 한자, 일본어도 쓰지 마. 오직 한글, 숫자, 문장부호, 이모지만 사용해.

오늘 나온 주사위 숫자: ${value} - ${VALUE_DESCRIPTIONS[value]}`

  if (!isRetry) return base

  return `${base}

주의: 방금 전 답변에 영어 알파벳이 섞여 있었어. 이번엔 알파벳을 절대 쓰지 말고 자연스러운 구어체 순수 한글로만 다시 작성해줘.`
}

async function requestFortuneMessage(
  apiKey: string,
  value: DiceValue,
  isRetry: boolean
): Promise<string | null> {
  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [{ role: "user", content: buildPrompt(value, isRetry) }],
    }),
  })

  if (!response.ok) return null

  const data = await response.json()
  const message: string | undefined = data?.choices?.[0]?.message?.content?.trim()
  return message || null
}

export async function GET(request: NextRequest) {
  const rawValue = request.nextUrl.searchParams.get("value")
  const date = request.nextUrl.searchParams.get("date")

  if (!isDiceValue(rawValue) || !date) {
    return Response.json(
      { error: "Missing or invalid value/date parameter" },
      { status: 400 }
    )
  }

  const value = Number(rawValue) as DiceValue

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return Response.json({ error: "Missing GROQ_API_KEY" }, { status: 500 })
  }

  const cacheKey = `${date}:${value}`
  const cached = fortuneCache.get(cacheKey)
  if (cached) {
    return Response.json({ message: cached })
  }

  let message: string | null = null
  let lastCandidate: string | null = null

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const candidate = await requestFortuneMessage(apiKey, value, attempt > 0)

    if (candidate === null) {
      return Response.json({ error: "Failed to reach Groq API" }, { status: 502 })
    }

    lastCandidate = candidate

    if (!containsLatinLetters(candidate)) {
      message = candidate
      break
    }
  }

  if (message === null) {
    const stripped = lastCandidate ? stripLatinLetters(lastCandidate) : ""
    message = stripped.length > 0 ? stripped : getDiceCheerMessage(value)
  }

  fortuneCache.set(cacheKey, message)

  return Response.json({ message })
}
