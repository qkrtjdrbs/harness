import type { FiveElement, SajuDayMaster, YinYang } from "@/types/saju"

const ELEMENT_INTERPRETATIONS: Record<FiveElement, string> = {
  목: "성장과 확장을 지향하며 유연하고 적응력이 뛰어난 기운을 가졌습니다.",
  화: "열정적이고 표현력이 풍부하며 주변에 활력을 불어넣는 기운을 가졌습니다.",
  토: "안정감 있고 신뢰할 수 있으며 중심을 잡아주는 기운을 가졌습니다.",
  금: "결단력 있고 원칙을 중시하며 맺고 끊음이 분명한 기운을 가졌습니다.",
  수: "지혜롭고 융통성이 있으며 상황에 유연하게 대처하는 기운을 가졌습니다.",
}

const YIN_YANG_INTERPRETATIONS: Record<YinYang, string> = {
  양: "적극적이고 외향적인 성향이 강하게 드러납니다.",
  음: "차분하고 내향적인 성향이 강하게 드러납니다.",
}

export function interpretSaju(dayMaster: SajuDayMaster): string {
  return `일간이 ${dayMaster.element}(${dayMaster.yinYang})이라 ${ELEMENT_INTERPRETATIONS[dayMaster.element]} ${YIN_YANG_INTERPRETATIONS[dayMaster.yinYang]}`
}
