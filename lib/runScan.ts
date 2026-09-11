import type { Site } from './mockData'
import { checkSearchRank } from './searchCheck'
import { checkAiVisibility } from './aiVisibility'
import { computeScoreComponents } from './scoring'
import { generateRecommendations } from './recommendations'

function getKeys() {
  return {
    anthropic: process.env.ANTHROPIC_API_KEY ?? '',
    openai: process.env.OPENAI_API_KEY ?? '',
    gemini: process.env.GEMINI_API_KEY ?? '',
    perplexity: process.env.PERPLEXITY_API_KEY ?? '',
    serp: process.env.SERP_API_KEY ?? ''
  }
}

export function getProviderStatus() {
  const keys = getKeys()
  return [
    { name: 'Google search', configured: Boolean(keys.serp) },
    { name: 'ChatGPT', configured: Boolean(keys.openai) },
    { name: 'Perplexity', configured: Boolean(keys.perplexity) },
    { name: 'Gemini', configured: Boolean(keys.gemini) },
    { name: 'Claude', configured: Boolean(keys.anthropic) }
  ]
}

// Mutates the given site in place with fresh scan results. Returns whether
// any part of the scan fell back to simulation (missing/failed API key).
export interface ScanResult {
  refreshed: boolean
  partial: boolean
}

export async function runScanForSite(site: Site): Promise<ScanResult> {
  const keys = getKeys()
  let refreshed = false
  let partial = false

  for (const prompt of site.prompts) {
    const search = await checkSearchRank(prompt.phrase, site.url, keys.serp)
    if (search.updated) {
      prompt.searchRank = search.rank
      refreshed = true
    } else if (keys.serp) {
      partial = true
    }

    const aiResults = await checkAiVisibility(prompt.phrase, site.name, {
      anthropic: keys.anthropic,
      openai: keys.openai,
      gemini: keys.gemini,
      perplexity: keys.perplexity
    })
    prompt.aiMentions = aiResults.map(({ engine, mentioned, position }) => ({ engine, mentioned, position }))
    partial = partial || aiResults.some((r) => r.simulated)
  }

  const { searchComponent, aiComponent, score } = computeScoreComponents(site.prompts)
  site.searchComponent = searchComponent
  site.aiComponent = aiComponent
  site.score = score
  if (refreshed) {
    site.scoreTrend = [...site.scoreTrend, score].slice(-8)
    site.lastScanAt = new Date().toISOString()
    site.recommendations = generateRecommendations(searchComponent, aiComponent, site.prompts)
  }

  return { refreshed, partial }
}
