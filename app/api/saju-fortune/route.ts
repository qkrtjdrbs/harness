import Anthropic from "@anthropic-ai/sdk"
import { NextRequest } from "next/server"

const RELATIONS = ["same", "generates", "generatedBy", "overcomes", "overcomeBy"] as const
type Relation = (typeof RELATIONS)[number]

const RELATION_DESCRIPTIONS: Record<Relation, string> = {
  same: "오늘의 오행 기운이 나(일간)와 같음 - 균형 잡힌 날",
  generates: "내(일간)가 오늘의 기운을 생해줌 - 내가 힘을 쏟아내는 날",
  generatedBy: "오늘의 기운이 나(일간)를 생해줌 - 도움을 받는 날",
  overcomes: "내(일간)가 오늘의 기운을 극함 - 내가 주도권을 쥐는 날",
  overcomeBy: "오늘의 기운이 나(일간)를 극함 - 눌리기 쉬운 날",
}

const fortuneCache = new Map<string, string>()
const client = new Anthropic()

function isRelation(value: string | null): value is Relation {
  return value !== null && (RELATIONS as readonly string[]).includes(value)
}

export async function GET(request: NextRequest) {
  const relation = request.nextUrl.searchParams.get("relation")
  const date = request.nextUrl.searchParams.get("date")

  if (!isRelation(relation) || !date) {
    return Response.json(
      { error: "Missing or invalid relation/date parameter" },
      { status: 400 }
    )
  }

  const cacheKey = `${date}:${relation}`
  const cached = fortuneCache.get(cacheKey)
  if (cached) {
    return Response.json({ message: cached })
  }

  const response = await client.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 200,
    messages: [
      {
        role: "user",
        content: `사주 오행 상생상극 관계를 기반으로 오늘의 운세 문구를 한국어로 1문장만 작성해줘. 오버스럽고 재미있는 톤으로, 이모지도 1~2개 써도 좋아. 다른 설명 없이 문장만 출력해줘.

오늘의 관계: ${RELATION_DESCRIPTIONS[relation]}`,
      },
    ],
  })

  const textBlock = response.content.find((block) => block.type === "text")
  const message =
    textBlock && textBlock.type === "text"
      ? textBlock.text.trim()
      : "오늘의 운세를 불러오지 못했습니다."

  fortuneCache.set(cacheKey, message)

  return Response.json({ message })
}
