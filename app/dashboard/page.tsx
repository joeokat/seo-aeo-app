import Link from 'next/link'
import { sites } from '@/lib/mockData'

export const dynamic = 'force-dynamic'

function bandColor(v: number) {
  return v >= 70 ? 'text-found' : v >= 40 ? 'text-signal' : 'text-ink-soft'
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl">Your sites</h1>
          <Link href="/#scan" className="font-ui text-xs px-4 py-2 bg-ink text-paper">
            Scan a new site
          </Link>
        </div>

        {sites.length === 0 ? (
          <p className="font-body text-sm text-ink-soft">
            You haven&apos;t scanned a site yet. <Link href="/#scan" className="underline">Scan one now</Link>.
          </p>
        ) : (
          <div className="border border-line divide-y divide-line">
            {sites.map((site) => (
              <Link
                key={site.id}
                href={`/dashboard/${site.id}`}
                className="flex items-center justify-between p-5 hover:bg-black/[0.02]"
              >
                <div>
                  <p className="font-body font-medium">{site.name}</p>
                  <p className="font-data text-xs text-ink-soft">{site.url}</p>
                </div>
                <div className="text-right">
                  <p className={`font-data text-2xl ${bandColor(site.score)}`}>{site.score}</p>
                  <p className="font-ui text-xs text-ink-soft capitalize">{site.plan} plan</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
