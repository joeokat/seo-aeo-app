'use client'

interface Props {
  score: number
  searchComponent: number
  aiComponent: number
}

export default function SignalMeter({ score, searchComponent, aiComponent }: Props) {
  const bandLabel = (v: number) => (v >= 70 ? 'strong' : v >= 40 ? 'partial' : 'weak')
  const bandColor = (v: number) => (v >= 70 ? 'bg-found' : v >= 40 ? 'bg-signal' : 'bg-ink-soft')

  return (
    <div className="border border-line rounded-none p-6 bg-paper">
      <div className="flex items-baseline gap-3">
        <span className="font-data text-6xl leading-none">{score}</span>
        <span className="font-body text-sm text-ink-soft">/ 100 &middot; {bandLabel(score)} signal</span>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <div className="flex justify-between font-body text-sm text-ink-soft mb-1">
            <span>Search engines</span>
            <span className="font-data">{searchComponent}</span>
          </div>
          <div className="h-1.5 w-full bg-line">
            <div className={`h-1.5 ${bandColor(searchComponent)}`} style={{ width: `${searchComponent}%` }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between font-body text-sm text-ink-soft mb-1">
            <span>AI assistants</span>
            <span className="font-data">{aiComponent}</span>
          </div>
          <div className="h-1.5 w-full bg-line">
            <div className={`h-1.5 ${bandColor(aiComponent)}`} style={{ width: `${aiComponent}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}
