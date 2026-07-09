const MYMEMORY_TRANSLATE_URL = "https://api.mymemory.translated.net/get"
const MAX_CHUNK_LENGTH = 480

function splitIntoChunks(text: string, maxLength: number): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/)
  const chunks: string[] = []
  let current = ""

  for (const sentence of sentences) {
    const candidate = current ? `${current} ${sentence}` : sentence
    if (candidate.length > maxLength && current) {
      chunks.push(current)
      current = sentence
    } else {
      current = candidate
    }
  }

  if (current) chunks.push(current)
  return chunks
}

async function translateChunk(chunk: string): Promise<string> {
  const url = `${MYMEMORY_TRANSLATE_URL}?q=${encodeURIComponent(chunk)}&langpair=en|ko`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Translation request failed")
  }

  const data = await response.json()
  const translated = data?.responseData?.translatedText
  return typeof translated === "string" ? translated : chunk
}

export async function translateToKorean(text: string): Promise<string> {
  const chunks = splitIntoChunks(text, MAX_CHUNK_LENGTH)
  const translatedChunks = await Promise.all(chunks.map(translateChunk))
  return translatedChunks.join(" ")
}
