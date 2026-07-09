import type { DiceRotation, DiceValue } from "@/types/dice"

const CUBE_SIZE = 88
const HALF_SIZE = CUBE_SIZE / 2

const FACE_TRANSFORMS = {
  front: `rotateY(0deg) translateZ(${HALF_SIZE}px)`,
  back: `rotateY(180deg) translateZ(${HALF_SIZE}px)`,
  right: `rotateY(90deg) translateZ(${HALF_SIZE}px)`,
  left: `rotateY(-90deg) translateZ(${HALF_SIZE}px)`,
  top: `rotateX(90deg) translateZ(${HALF_SIZE}px)`,
  bottom: `rotateX(-90deg) translateZ(${HALF_SIZE}px)`,
} as const

type Face = keyof typeof FACE_TRANSFORMS

const FACE_VALUES: Record<Face, DiceValue> = {
  front: 1,
  back: 6,
  right: 2,
  left: 5,
  top: 3,
  bottom: 4,
}

const FACE_SHADES: Record<Face, string> = {
  top: "#f87171",
  front: "#ef4444",
  right: "#dc2626",
  left: "#dc2626",
  bottom: "#b91c1c",
  back: "#7f1d1d",
}

const PIP_POSITIONS: Record<DiceValue, Array<{ top: string; left: string }>> = {
  1: [{ top: "50%", left: "50%" }],
  2: [
    { top: "22%", left: "22%" },
    { top: "78%", left: "78%" },
  ],
  3: [
    { top: "22%", left: "22%" },
    { top: "50%", left: "50%" },
    { top: "78%", left: "78%" },
  ],
  4: [
    { top: "22%", left: "22%" },
    { top: "22%", left: "78%" },
    { top: "78%", left: "22%" },
    { top: "78%", left: "78%" },
  ],
  5: [
    { top: "22%", left: "22%" },
    { top: "22%", left: "78%" },
    { top: "50%", left: "50%" },
    { top: "78%", left: "22%" },
    { top: "78%", left: "78%" },
  ],
  6: [
    { top: "22%", left: "22%" },
    { top: "22%", left: "78%" },
    { top: "50%", left: "22%" },
    { top: "50%", left: "78%" },
    { top: "78%", left: "22%" },
    { top: "78%", left: "78%" },
  ],
}

function DiceFace({ face }: { face: Face }) {
  const value = FACE_VALUES[face]

  return (
    <div
      className="absolute inset-0 rounded-lg border-2"
      style={{
        transform: FACE_TRANSFORMS[face],
        backgroundColor: FACE_SHADES[face],
        borderColor: "#450a0a",
        boxShadow: "inset 0 6px 10px rgba(255,255,255,0.35), inset 0 -8px 14px rgba(0,0,0,0.35)",
      }}
    >
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/25 via-transparent to-black/30" />
      {PIP_POSITIONS[value].map((position, index) => (
        <span
          key={index}
          className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
          style={{ top: position.top, left: position.left }}
        />
      ))}
    </div>
  )
}

export function DiceCube({ rotation }: { rotation: DiceRotation }) {
  return (
    <div style={{ perspective: "700px" }}>
      <div
        className="relative"
        style={{
          width: CUBE_SIZE,
          height: CUBE_SIZE,
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: "transform 900ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {(Object.keys(FACE_TRANSFORMS) as Face[]).map((face) => (
          <DiceFace key={face} face={face} />
        ))}
      </div>
    </div>
  )
}
