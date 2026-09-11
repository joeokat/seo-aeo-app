import type { TrackedPrompt } from './mockData'

export function computeScoreComponents(prompts: TrackedPrompt[]) {
  if (prompts.length === 0) return { searchComponent: 0, aiComponent: 0, score: 0 }

  const searchScores = prompts.map((p) => {
    if (!p.searchRank) return 0
    return Math.max(0, 100 - (p.searchRank - 1) * 3.5)
  })

  const aiScores = prompts.filter((p) => p.aiMentions.length > 0).map((p) => {
    const mentions = p.aiMentions.filter((m) => m.mentioned).length
    return (mentions / p.aiMentions.length) * 100
  })

  const searchComponent = Math.round(searchScores.reduce((a, b) => a + b, 0) / searchScores.length)
  const aiComponent = aiScores.length === 0
    ? 0
    : Math.round(aiScores.reduce((a, b) => a + b, 0) / aiScores.length)
  const score = aiScores.length === 0
    ? searchComponent
    : Math.round(searchComponent * 0.4 + aiComponent * 0.6)

  return { searchComponent, aiComponent, score }
}
