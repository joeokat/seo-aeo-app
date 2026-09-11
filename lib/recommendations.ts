import type { TrackedPrompt, Recommendation } from './mockData'

let counter = 0
function nextId() {
  counter += 1
  return `rec-${Date.now()}-${counter}`
}

export function generateRecommendations(
  searchComponent: number,
  aiComponent: number,
  prompts: TrackedPrompt[]
): Recommendation[] {
  const recs: Recommendation[] = []
  const anyUnranked = prompts.some((p) => !p.searchRank)

  if (aiComponent < 40) {
    recs.push({
      id: nextId(),
      category: 'llms_txt',
      title: 'Add an llms.txt file',
      detail: 'AI assistants rarely mention you yet. An llms.txt gives them a canonical summary of what you do to draw from.',
      impact: 'high',
      status: 'open'
    })
  }

  if (searchComponent < 50) {
    recs.push({
      id: nextId(),
      category: 'schema',
      title: 'Add structured data (schema.org) markup',
      detail: 'No structured data was detected in the scan, making it harder for both search and AI crawlers to confirm what you offer.',
      impact: 'high',
      status: 'open'
    })
  }

  if (anyUnranked) {
    recs.push({
      id: nextId(),
      category: 'content',
      title: 'Improve on-page SEO for your tracked phrases',
      detail: 'At least one tracked phrase isn\u2019t ranking in the results checked. Make sure a page directly answers that query.',
      impact: 'medium',
      status: 'open'
    })
  }

  if (aiComponent < 70) {
    recs.push({
      id: nextId(),
      category: 'content',
      title: 'Answer common questions directly on-site',
      detail: 'Add an FAQ or comparison page that answers your tracked prompts in plain language \u2014 that\u2019s what AI engines pull from.',
      impact: 'medium',
      status: 'open'
    })
  }

  if (recs.length === 0) {
    recs.push({
      id: nextId(),
      category: 'content',
      title: 'You\u2019re performing well \u2014 keep monitoring',
      detail: 'Search and AI visibility both look solid for your tracked phrases. Consider tracking a few more to widen coverage.',
      impact: 'low',
      status: 'open'
    })
  }

  return recs
}
