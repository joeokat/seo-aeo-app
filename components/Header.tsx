'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="border-b border-line bg-paper">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-lg" onClick={closeMenu}>
          <strong>Fleet Labs</strong>
        </Link>

        <nav className="hidden md:flex items-center gap-6 font-ui text-sm">
          <Link href="/dashboard" className="text-ink-soft hover:text-ink">
            Dashboard
          </Link>
          <Link href="/leaderboard" className="text-ink-soft hover:text-ink">
            Leaderboard
          </Link>
          <Link href="/pricing" className="text-ink-soft hover:text-ink">
            Pricing Plan
          </Link>
          
          <Link href="/#scan" className="px-4 py-2 bg-ink text-paper">
            Track Site
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden flex flex-col justify-center gap-1.5 w-10 h-10 -mr-2 text-ink"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block h-px w-5 bg-current transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-px w-5 bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-5 bg-current transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-navigation" className="md:hidden border-t border-line px-6 py-4 font-ui text-sm">
          <div className="max-w-5xl mx-auto flex flex-col items-stretch">
            <Link href="/dashboard" className="py-3 text-ink-soft hover:text-ink" onClick={closeMenu}>
              Dashboard
            </Link>
            <Link href="/leaderboard" className="py-3 text-ink-soft hover:text-ink" onClick={closeMenu}>
              Leadboard
            </Link>
            <Link href="/pricing" className="py-3 text-ink-soft hover:text-ink" onClick={closeMenu}>
              Pricing Plan
            </Link>

            <Link href="/#scan" className="mt-2 px-4 py-3 text-center bg-ink text-paper" onClick={closeMenu}>
              Rank site
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
