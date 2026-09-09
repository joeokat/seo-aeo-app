'use client'

import type { Recommendation } from '@/lib/mockData'

const impactColor: Record<string, string> = {
  high: 'border-signal',
  medium: 'border-ink-soft',
  low: 'border-line'
}

export default function RecommendationList({ recommendations }: { recommendations: Recommendation[] }) {
  return (
    <ul className="divide-y divide-line border-t border-b border-line">
      {recommendations.map((rec) => (
        <li
          key={rec.id}
          className={`py-4 pl-4 border-l-2 ${
            rec.status === 'resolved' ? 'border-found opacity-50' : impactColor[rec.impact]
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-body font-medium">{rec.title}</p>
              <p className="font-body text-sm text-ink-soft mt-1 max-w-xl">{rec.detail}</p>
            </div>
            <span className="font-data text-xs uppercase shrink-0 mt-1 text-ink-soft">
              {rec.status === 'resolved' ? 'resolved' : rec.impact}
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}
