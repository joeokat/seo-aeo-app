import { fetchWithTimeout } from './providers/shared'

export interface SearchCheckResult {
  rank: number | null
  updated: boolean
}

export async function checkSearchRank(phrase: string, domain: string, apiKey: string): Promise<SearchCheckResult> {
  if (!apiKey) return { rank: null, updated: false }

  try {
    const url = new URL('https://serpapi.com/search')
    url.searchParams.set('engine', 'google')
    url.searchParams.set('q', phrase)
    url.searchParams.set('api_key', apiKey)

    const res = await fetchWithTimeout(url.toString())
    if (!res.ok) throw new Error(`SerpAPI returned ${res.status}`)

    const data = await res.json()
    const results: { link?: string }[] = data.organic_results ?? []
    const idx = results.findIndex((r) => r.link?.includes(domain))

    return { rank: idx === -1 ? null : idx + 1, updated: true }
  } catch (err) {
    console.error('[checkSearchRank] unable to refresh search result:', err)
    return { rank: null, updated: false }
  }
}
