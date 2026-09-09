import Link from 'next/link'
import { sites } from '@/lib/mockData'

function bandColor(v: number) {
  return v >= 70 ? 'text-found' : v >= 40 ? 'text-signal' : 'text-ink-soft'
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-paper text-ink font-body">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="font-display text-3xl mb-8">Your sites</h1>

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
                <p className="font-body text-xs text-ink-soft capitalize">{site.plan} plan</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
