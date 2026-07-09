import { getFiveElementRelation, type FiveElementRelation } from "@/lib/five-elements"
import type { FiveElement, YinYang } from "@/types/saju"

export type TenGod =
  | "비견"
  | "겁재"
  | "식신"
  | "상관"
  | "정재"
  | "편재"
  | "정관"
  | "편관"
  | "정인"
  | "편인"

type Polarity = "same" | "different"

const TEN_GOD_TABLE: Record<FiveElementRelation, Record<Polarity, TenGod>> = {
  same: { same: "비견", different: "겁재" },
  generates: { same: "식신", different: "상관" },
  overcomes: { same: "정재", different: "편재" },
  overcomeBy: { same: "정관", different: "편관" },
  generatedBy: { same: "정인", different: "편인" },
}

export function getTenGod(
  dayMaster: { element: FiveElement; yinYang: YinYang },
  other: { element: FiveElement; yinYang: YinYang }
): TenGod {
  const relation = getFiveElementRelation(dayMaster.element, other.element)
  const polarity: Polarity = dayMaster.yinYang === other.yinYang ? "same" : "different"

  return TEN_GOD_TABLE[relation][polarity]
}
