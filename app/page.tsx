import Link from 'next/link'

const plans = [
  { name: 'Free', price: '$0', period: 'one scan', detail: 'A single visibility check across search and AI, no monitoring.' },
  { name: 'Monthly', price: '$10', period: 'per month', detail: 'Weekly re-checks, full fix list, alerts when your score drops.' },
  { name: 'Half-year', price: '$49.9', period: 'per 6 months', detail: 'Same as monthly, paid twice a year.' },
  { name: 'Annual', price: '$99.9', period: 'per 12 months', detail: 'Same as monthly, priority support, paid once a year.' }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-paper text-ink font-body">
      <header className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <p className="font-data text-xs text-ink-soft mb-6">for people who built something worth finding</p>
        <h1 className="font-display text-5xl md:text-6xl leading-[1.05] max-w-2xl">
          Know what AI says about you before your customers ask it.
        </h1>
        <p className="font-body text-lg text-ink-soft mt-6 max-w-xl leading-relaxed">
          Signal checks whether your site shows up in Google and in ChatGPT, Perplexity,
          Gemini and Claude, then tells you exactly what&apos;s missing.
        </p>
        <Link
          href="/dashboard"
          className="inline-block mt-8 px-6 py-3 bg-ink text-paper font-body text-sm"
        >
          See a live dashboard
        </Link>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-line">
        <h2 className="font-display text-2xl mb-8">Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-line border border-line">
          {plans.map((plan) => (
            <div key={plan.name} className="bg-paper p-6">
              <p className="font-body text-sm text-ink-soft">{plan.name}</p>
              <p className="font-data text-3xl mt-2">{plan.price}</p>
              <p className="font-body text-xs text-ink-soft mb-4">{plan.period}</p>
              <p className="font-body text-sm">{plan.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
