import type { FiveElement } from "@/types/saju"

const GENERATES: Record<FiveElement, FiveElement> = {
  목: "화",
  화: "토",
  토: "금",
  금: "수",
  수: "목",
}

const OVERCOMES: Record<FiveElement, FiveElement> = {
  목: "토",
  화: "금",
  토: "수",
  금: "목",
  수: "화",
}

export type FiveElementRelation =
  | "same"
  | "generates"
  | "generatedBy"
  | "overcomes"
  | "overcomeBy"

export function getFiveElementRelation(
  from: FiveElement,
  to: FiveElement
): FiveElementRelation {
  if (from === to) return "same"
  if (GENERATES[from] === to) return "generates"
  if (GENERATES[to] === from) return "generatedBy"
  if (OVERCOMES[from] === to) return "overcomes"
  return "overcomeBy"
}
