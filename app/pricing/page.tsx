import PricingPlans from '@/components/PricingPlans'

export const metadata = {
  title: 'Pricing | Fleet Labs',
  description: 'Choose a Fleet Labs plan for ongoing search and AI visibility monitoring.'
}

export default function Pricing() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <p className="font-ui text-xs text-ink-soft mb-3">simple, useful visibility checks</p>
        <h1 className="font-display text-4xl mb-3">Plans</h1>
        <p className="font-body text-sm text-ink-soft max-w-xl mb-10">
          Start with a free scan, then choose the monitoring cadence that fits your site.
        </p>
        <PricingPlans />
      </div>
    </div>
  )
}