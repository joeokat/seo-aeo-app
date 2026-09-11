import type { ProviderResult } from './shared'
import { fetchWithTimeout, simulateAnswer } from './shared'

export async function askGemini(prompt: string, siteName: string, apiKey: string): Promise<ProviderResult> {
  if (!apiKey) return simulateAnswer('Gemini', prompt, siteName)

  try {
    const res = await fetchWithTimeout(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    )

    if (!res.ok) throw new Error(`Gemini API returned ${res.status}`)

    const data = await res.json()
    const text = data.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? '').join('\n') ?? ''
    return { raw: text, simulated: false }
  } catch (err) {
    console.error('[askGemini] falling back to simulation:', err)
    return simulateAnswer('Gemini', prompt, siteName)
  }
}
