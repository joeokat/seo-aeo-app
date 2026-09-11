import Link from 'next/link'
import { sites } from '@/lib/mockData'

export const dynamic = 'force-dynamic'

function improvementLabel(trend: number[]) {
  if (trend.length < 2) return null
  const diff = trend[trend.length - 1] - trend[0]
  if (diff <= 0) return null
  return `+${diff} points since first scan`
}

export default function Leaderboard() {
  const ranked = [...sites]
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="font-ui text-xs text-ink-soft mb-3">social proof</p>
        <h1 className="font-display text-3xl mb-3">Sites doing this well</h1>
        <p className="font-body text-sm text-ink-soft max-w-xl mb-10">
          Ranked by visibility score across search and AI assistants. Wondering what this could
          do for you? <Link href="/#scan" className="underline">Scan your own site</Link> to find out.
        </p>

        <div className="border border-line divide-y divide-line">
          {ranked.map((site, i) => (
            <div key={site.id} className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <span className="font-data text-xs text-ink-soft w-5">{i + 1}</span>
                <div>
                  <p className="font-body font-medium">{site.name}</p>
                  <p className="font-data text-xs text-ink-soft">{site.url}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-data text-2xl text-found">{site.score}</p>
                {improvementLabel(site.scoreTrend) && (
                  <p className="font-ui text-xs text-found">{improvementLabel(site.scoreTrend)}</p>
                )}
              </div>
            </div>
          ))}
          {ranked.length === 0 && (
            <p className="font-body text-sm text-ink-soft p-5">No scanned sites yet — be the first.</p>
          )}
        </div>
      </div>
    </div>
  )
}
