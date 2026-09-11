import type { TechnicalAudit as TechnicalAuditResult } from '@/lib/technicalAudit'

const statusStyles = {
  pass: 'text-found',
  warning: 'text-signal',
  fail: 'text-ink'
}

export default function TechnicalAudit({ audit }: { audit: TechnicalAuditResult }) {
  return (
    <section className="border border-line bg-paper p-6">
      <div className="flex items-baseline justify-between gap-4 mb-5">
        <div>
          <h2 className="font-display text-xl">Site health</h2>
          <p className="font-body text-xs text-ink-soft mt-1">Technical checks from the homepage and site files</p>
        </div>
        <span className="font-data text-2xl">{audit.score}/100</span>
      </div>

      <div className="divide-y divide-line border-t border-line">
        {audit.checks.map((item) => (
          <div key={item.id} className="py-3 flex items-start justify-between gap-4">
            <div>
              <p className="font-body text-sm">{item.label}</p>
              <p className="font-body text-xs text-ink-soft mt-1">{item.detail}</p>
            </div>
            <span className={`font-ui text-[10px] uppercase shrink-0 ${statusStyles[item.status]}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}