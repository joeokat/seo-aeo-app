import type { ProviderResult } from './shared'
import { simulateAnswer } from './shared'

export async function askClaude(prompt: string, siteName: string, apiKey: string): Promise<ProviderResult> {
  if (!apiKey) return simulateAnswer('Claude', prompt, siteName)

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 400,
        messages: [{ role: 'user', content: prompt }]
      })
    })

    if (!res.ok) throw new Error(`Anthropic API returned ${res.status}`)

    const data = await res.json()
    const text = data.content?.map((b: { type: string; text?: string }) => b.text ?? '').join('\n') ?? ''
    return { raw: text, simulated: false }
  } catch (err) {
    console.error('[askClaude] falling back to simulation:', err)
    return simulateAnswer('Claude', prompt, siteName)
  }
}
