import type { DiceValue } from "@/types/dice"

const CHEER_MESSAGES: Record<DiceValue, string> = {
  1: "괜찮아요, 다음 기회에 대박 나요!",
  2: "나쁘지 않아요, 오늘도 무사히!",
  3: "적당히 괜찮은 하루예요!",
  4: "오 좋은데요? 기대해도 좋아요!",
  5: "대박 조짐이 보입니다!!",
  6: "완전 럭키비키!!! 오늘 로또 사세요!!! 인생 역전 각!!! 🎉",
}

export function getDiceCheerMessage(value: DiceValue): string {
  return CHEER_MESSAGES[value]
}
