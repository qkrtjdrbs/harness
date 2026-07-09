export async function fetchSajuFortuneMessage(
  tenGod: string,
  date: string
): Promise<string> {
  const response = await fetch(
    `/api/saju-fortune?tenGod=${encodeURIComponent(tenGod)}&date=${encodeURIComponent(date)}`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch saju fortune")
  }

  const data: { message: string } = await response.json()
  return data.message
}
