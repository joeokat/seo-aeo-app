export const plans = [
  { name: 'Free', price: '$0', period: 'one scan', detail: 'A single visibility check across search and AI, no monitoring.' },
  { name: 'Monthly', price: '$10', period: 'per month', detail: 'Weekly re-checks, full fix list, alerts when your score drops.' },
  { name: 'Half-year', price: '$49.90', period: 'per 6 months', detail: 'Same as monthly, paid twice a year.' },
  { name: 'Annual', price: '$99.90', period: 'per 12 months', detail: 'Same as monthly, priority support, paid once a year.' }
]

export default function PricingPlans() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-line border border-line">
      {plans.map((plan) => (
        <div key={plan.name} className="bg-paper p-6">
          <p className="font-ui text-sm text-ink-soft">{plan.name}</p>
          <p className="font-data text-3xl mt-2">{plan.price}</p>
          <p className="font-ui text-xs text-ink-soft mb-4">{plan.period}</p>
          <p className="font-body text-sm">{plan.detail}</p>
        </div>
      ))}
    </div>
  )
}