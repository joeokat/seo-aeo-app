import type { ProviderResult } from './shared'
import { simulateAnswer } from './shared'

export async function askChatGPT(prompt: string, siteName: string, apiKey: string): Promise<ProviderResult> {
  if (!apiKey) return simulateAnswer('ChatGPT', prompt, siteName)

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 400,
        messages: [{ role: 'user', content: prompt }]
      })
    })

    if (!res.ok) throw new Error(`OpenAI API returned ${res.status}`)

    const data = await res.json()
    const text = data.choices?.[0]?.message?.content ?? ''
    return { raw: text, simulated: false }
  } catch (err) {
    console.error('[askChatGPT] falling back to simulation:', err)
    return simulateAnswer('ChatGPT', prompt, siteName)
  }
}
