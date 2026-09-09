import { NextResponse } from 'next/server'
import { getSite } from '@/lib/mockData'
import { checkSearchRank } from '@/lib/searchCheck'
import { checkAiVisibility } from '@/lib/aiVisibility'
import { computeScoreComponents } from '@/lib/scoring'

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const site = body?.siteId ? getSite(body.siteId) : null

  if (!site) {
    return NextResponse.json({ error: 'Site not found' }, { status: 404 })
  }

  const keys = {
    anthropic: process.env.ANTHROPIC_API_KEY ?? '',
    openai: process.env.OPENAI_API_KEY ?? '',
    gemini: process.env.GEMINI_API_KEY ?? '',
    perplexity: process.env.PERPLEXITY_API_KEY ?? '',
    serp: process.env.SERP_API_KEY ?? ''
  }

  let anySimulated = false

  for (const prompt of site.prompts) {
    const search = await checkSearchRank(prompt.phrase, site.url, keys.serp)
    prompt.searchRank = search.rank
    anySimulated = anySimulated || search.simulated

    const aiResults = await checkAiVisibility(prompt.phrase, site.name, {
      anthropic: keys.anthropic,
      openai: keys.openai,
      gemini: keys.gemini,
      perplexity: keys.perplexity
    })
    prompt.aiMentions = aiResults.map(({ engine, mentioned, position }) => ({ engine, mentioned, position }))
    anySimulated = anySimulated || aiResults.some((r) => r.simulated)
  }

  const { searchComponent, aiComponent, score } = computeScoreComponents(site.prompts)
  site.searchComponent = searchComponent
  site.aiComponent = aiComponent
  site.score = score
  site.scoreTrend = [...site.scoreTrend.slice(-5), score]
  site.lastScanAt = new Date().toISOString()

  return NextResponse.json({ site, simulated: anySimulated })
}
