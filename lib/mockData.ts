// This mock data stands in for the real pipeline: a scheduled scan_job would
// populate search_checks + ai_checks, from which visibility_scores and
// recommendations get computed. Swap this file for real DB queries when you
// add persistence — the scan API route already does real (or simulated)
// live checks, this just controls what gets stored/returned.

export interface TrackedPrompt {
  id: string
  phrase: string
  searchRank: number | null
  aiMentions: { engine: string; mentioned: boolean; position: number | null }[]
}

export interface Recommendation {
  id: string
  category: 'schema' | 'content' | 'meta' | 'llms_txt' | 'speed'
  title: string
  detail: string
  impact: 'high' | 'medium' | 'low'
  status: 'open' | 'resolved'
}

export interface Site {
  id: string
  url: string
  name: string
  plan: 'free' | 'monthly' | 'semiannual' | 'annual'
  score: number
  scoreTrend: number[]
  searchComponent: number
  aiComponent: number
  lastScanAt: string
  prompts: TrackedPrompt[]
  recommendations: Recommendation[]
}

export const sites: Site[] = [
  {
    id: 'nova-fit',
    url: 'novafit.app',
    name: 'NovaFit',
    plan: 'monthly',
    score: 61,
    scoreTrend: [48, 51, 55, 58, 57, 61],
    searchComponent: 68,
    aiComponent: 54,
    lastScanAt: '2026-09-04T09:00:00Z',
    prompts: [
      {
        id: 'p1',
        phrase: 'best home workout app for beginners',
        searchRank: 6,
        aiMentions: [
          { engine: 'ChatGPT', mentioned: true, position: 3 },
          { engine: 'Perplexity', mentioned: true, position: 2 },
          { engine: 'Gemini', mentioned: false, position: null },
          { engine: 'Claude', mentioned: false, position: null }
        ]
      },
      {
        id: 'p2',
        phrase: 'app to track workouts without a subscription',
        searchRank: 14,
        aiMentions: [
          { engine: 'ChatGPT', mentioned: false, position: null },
          { engine: 'Perplexity', mentioned: false, position: null },
          { engine: 'Gemini', mentioned: false, position: null },
          { engine: 'Claude', mentioned: false, position: null }
        ]
      }
    ],
    recommendations: [
      {
        id: 'r1',
        category: 'llms_txt',
        title: 'Add an llms.txt file',
        detail: 'No llms.txt found — AI crawlers have no canonical summary of what NovaFit does to draw from.',
        impact: 'high',
        status: 'open'
      },
      {
        id: 'r2',
        category: 'schema',
        title: 'Add SoftwareApplication schema',
        detail: 'The homepage has no structured data, making it harder for engines to confirm pricing and category.',
        impact: 'high',
        status: 'open'
      },
      {
        id: 'r3',
        category: 'content',
        title: 'Answer comparison queries directly',
        detail: '"without a subscription" queries aren\u2019t answered anywhere on-site in plain language.',
        impact: 'medium',
        status: 'open'
      },
      {
        id: 'r4',
        category: 'meta',
        title: 'Rewrite thin meta descriptions',
        detail: '4 of 12 indexed pages share a generic meta description.',
        impact: 'low',
        status: 'resolved'
      }
    ]
  },
  {
    id: 'harbor-goods',
    url: 'harborgoods.co',
    name: 'Harbor Goods',
    plan: 'free',
    score: 34,
    scoreTrend: [34],
    searchComponent: 41,
    aiComponent: 22,
    lastScanAt: '2026-09-01T09:00:00Z',
    prompts: [
      {
        id: 'p3',
        phrase: 'sustainably made canvas tote bags',
        searchRank: 22,
        aiMentions: [
          { engine: 'ChatGPT', mentioned: false, position: null },
          { engine: 'Perplexity', mentioned: false, position: null },
          { engine: 'Gemini', mentioned: false, position: null },
          { engine: 'Claude', mentioned: false, position: null }
        ]
      }
    ],
    recommendations: [
      {
        id: 'r5',
        category: 'schema',
        title: 'Add Product schema to listings',
        detail: 'None of the 18 product pages expose price, availability, or reviews as structured data.',
        impact: 'high',
        status: 'open'
      },
      {
        id: 'r6',
        category: 'content',
        title: 'Add a materials & sourcing FAQ',
        detail: 'Sustainability claims aren\u2019t backed by any page AI engines can cite directly.',
        impact: 'medium',
        status: 'open'
      }
    ]
  }
]

export function getSite(id: string) {
  return sites.find((s) => s.id === id) ?? null
}
