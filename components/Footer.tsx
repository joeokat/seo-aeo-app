import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="font-display text-base"><strong>Fleet Labs</strong></p>
        </div>

        <p className="font-ui text-xs text-ink-soft">
          &copy; {new Date().getFullYear()} Fleet Labs
        </p>
      </div>
    </footer>
  )
}
