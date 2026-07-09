export async function fetchSajuFortuneMessage(
  relation: string,
  date: string
): Promise<string> {
  const response = await fetch(
    `/api/saju-fortune?relation=${encodeURIComponent(relation)}&date=${encodeURIComponent(date)}`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch saju fortune")
  }

  const data: { message: string } = await response.json()
  return data.message
}
