import { askClaude } from './providers/anthropic'
import { askChatGPT } from './providers/openai'
import { askGemini } from './providers/gemini'
import { askPerplexity } from './providers/perplexity'

export interface AiEngineKeys {
  anthropic: string
  openai: string
  gemini: string
  perplexity: string
}

export interface AiMentionResult {
  engine: string
  mentioned: boolean
  position: number | null
  simulated: boolean
}

function detectMention(text: string, siteName: string): { mentioned: boolean; position: number | null } {
  const sentences = text.split(/(?<=[.!?])\s+/)
  const idx = sentences.findIndex((s) => s.toLowerCase().includes(siteName.toLowerCase()))
  return idx === -1 ? { mentioned: false, position: null } : { mentioned: true, position: idx + 1 }
}

export async function checkAiVisibility(
  phrase: string,
  siteName: string,
  keys: AiEngineKeys
): Promise<AiMentionResult[]> {
  const engines: { name: string; key: string; run: () => Promise<{ raw: string; simulated: boolean }> }[] = [
    { name: 'ChatGPT', key: keys.openai, run: () => askChatGPT(phrase, siteName, keys.openai) },
    { name: 'Perplexity', key: keys.perplexity, run: () => askPerplexity(phrase, siteName, keys.perplexity) },
    { name: 'Gemini', key: keys.gemini, run: () => askGemini(phrase, siteName, keys.gemini) },
    { name: 'Claude', key: keys.anthropic, run: () => askClaude(phrase, siteName, keys.anthropic) }
  ].filter((engine) => Boolean(engine.key))

  const results = await Promise.all(
    engines.map(async ({ name, run }) => {
      const { raw, simulated } = await run()
      const { mentioned, position } = detectMention(raw, siteName)
      return { engine: name, mentioned, position, simulated }
    })
  )

  return results
}
