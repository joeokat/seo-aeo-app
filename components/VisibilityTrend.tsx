export default function VisibilityTrend({ values }: { values: number[] }) {
  const points = values.length > 0 ? values : [0]
  const highest = Math.max(...points, 100)

  return (
    <div className="border border-line p-6 bg-paper">
      <div className="flex items-baseline justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-xl">Visibility trend</h2>
          <p className="font-body text-xs text-ink-soft mt-1">Score movement across recent scans</p>
        </div>
        <span className="font-data text-xs text-ink-soft">{points.length} scans</span>
      </div>

      <div className="h-40 flex items-end gap-2 border-b border-line">
        {points.map((value, index) => (
          <div key={`${value}-${index}`} className="flex-1 h-full flex items-end group">
            <div
              className="w-full min-h-1 bg-ink transition-all group-hover:bg-found"
              style={{ height: `${Math.max((value / highest) * 100, 2)}%` }}
              title={`Scan ${index + 1}: ${value}`}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between font-data text-[10px] text-ink-soft mt-2">
        <span>oldest</span>
        <span>latest</span>
      </div>
    </div>
  )
}