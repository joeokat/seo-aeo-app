import type { ProviderResult } from './shared'
import { fetchWithTimeout, simulateAnswer } from './shared'

export async function askPerplexity(prompt: string, siteName: string, apiKey: string): Promise<ProviderResult> {
  if (!apiKey) return simulateAnswer('Perplexity', prompt, siteName)

  try {
    const res = await fetchWithTimeout('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [{ role: 'user', content: prompt }]
      })
    })

    if (!res.ok) throw new Error(`Perplexity API returned ${res.status}`)

    const data = await res.json()
    const text = data.choices?.[0]?.message?.content ?? ''
    return { raw: text, simulated: false }
  } catch (err) {
    console.error('[askPerplexity] falling back to simulation:', err)
    return simulateAnswer('Perplexity', prompt, siteName)
  }
}
