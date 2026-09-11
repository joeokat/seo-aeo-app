interface Props {
  label: string
  value: string | number
  detail: string
}

export default function MetricCard({ label, value, detail }: Props) {
  return (
    <div className="border border-line p-5 bg-paper">
      <p className="font-ui text-xs text-ink-soft uppercase tracking-wide">{label}</p>
      <p className="font-data text-3xl mt-3">{value}</p>
      <p className="font-body text-xs text-ink-soft mt-2">{detail}</p>
    </div>
  )
}