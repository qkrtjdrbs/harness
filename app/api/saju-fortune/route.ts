import { NextRequest } from "next/server"

const TEN_GODS = [
  "비견",
  "겁재",
  "식신",
  "상관",
  "정재",
  "편재",
  "정관",
  "편관",
  "정인",
  "편인",
] as const
type TenGod = (typeof TEN_GODS)[number]

const TEN_GOD_DESCRIPTIONS: Record<TenGod, string> = {
  비견: "나와 같은 기운이 나란히 서 있는 날 - 협력과 경쟁이 동시에 두드러짐",
  겁재: "나와 같은 기운이지만 성질이 다른 날 - 예상치 못한 경쟁이나 지출 주의",
  식신: "내가 가진 기운을 베풀고 표현하는 날 - 먹고 즐기는 일이 잘 풀림",
  상관: "재능과 언변이 돋보이지만 다소 날카로워지는 날 - 마찰 주의",
  정재: "안정적인 재물운의 날 - 성실하게 쌓아온 것이 결과로 돌아옴",
  편재: "뜻밖의 재물이나 기회가 들어올 수 있는 날 - 다소 즉흥적",
  정관: "책임감과 신뢰가 빛나는 날 - 조직과 규칙 안에서 인정받음",
  편관: "압박과 도전이 있지만 뚫고 나가는 힘이 생기는 날",
  정인: "배움과 도움을 받기 좋은 날 - 마음이 편안해지는 기운",
  편인: "예상치 못한 도움이나 영감을 얻는 날 - 다소 변덕스러움",
}

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
const GROQ_MODEL = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile"

const fortuneCache = new Map<string, string>()

function isTenGod(value: string | null): value is TenGod {
  return value !== null && (TEN_GODS as readonly string[]).includes(value)
}

export async function GET(request: NextRequest) {
  const tenGod = request.nextUrl.searchParams.get("tenGod")
  const date = request.nextUrl.searchParams.get("date")

  if (!isTenGod(tenGod) || !date) {
    return Response.json(
      { error: "Missing or invalid tenGod/date parameter" },
      { status: 400 }
    )
  }

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return Response.json({ error: "Missing GROQ_API_KEY" }, { status: 500 })
  }

  const cacheKey = `${date}:${tenGod}`
  const cached = fortuneCache.get(cacheKey)
  if (cached) {
    return Response.json({ message: cached })
  }

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        {
          role: "user",
          content: `사주 십신(十神) 이론을 기반으로 오늘의 운세 문구를 한국어로 1문장만 작성해줘. 순수 한국어와 한글 이모지만 사용하고, 한자나 일본어 등 다른 언어는 섞지 마. 오버스럽고 재미있는 톤으로, 이모지도 1~2개 써도 좋아. 다른 설명 없이 문장만 출력해줘.

오늘의 십신: ${tenGod} - ${TEN_GOD_DESCRIPTIONS[tenGod]}`,
        },
      ],
    }),
  })

  if (!response.ok) {
    return Response.json({ error: "Failed to reach Groq API" }, { status: 502 })
  }

  const data = await response.json()
  const message: string =
    data?.choices?.[0]?.message?.content?.trim() || "오늘의 운세를 불러오지 못했습니다."

  fortuneCache.set(cacheKey, message)

  return Response.json({ message })
}
