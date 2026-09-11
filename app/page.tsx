'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Try again.')
        return
      }
      router.push(`/dashboard/${data.site.id}`)
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-paper text-ink">
      <header id="scan" className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        
        <h1 className="font-display text-5xl md:text-6xl leading-[1.05] max-w-2xl">
          Know what AI says about you before your customers ask it.
        </h1>
        <p className="font-ui text-xs text-ink-soft mt-4 mb-6">for people who want to rank their website first online</p>

        {/* <p className="font-body text-lg text-ink-soft mt-6 max-w-xl leading-relaxed">
          Fleet Labs checks whether your site shows up in Google and in ChatGPT, Perplexity,
          Gemini and Claude then tells you exactly what&apos;s missing.
        </p> */}

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
          <input
            type="text"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="yourwebsite.com"
            className="flex-1 px-4 py-3 border border-line bg-paper font-body text-sm focus:outline-none focus:border-ink"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-ink text-paper font-ui text-sm disabled:opacity-50 whitespace-nowrap"
          >
            {loading ? 'Scanning…' : 'Scan Site'}
          </button>
        </form>
        {error && <p className="font-ui text-xs text-signal mt-3">{error}</p>}
        <p className="font-ui text-xs text-ink-soft mt-3">
          Fleet Labs checks whether your site shows up in Google and in AI assistants then tells you exactly what's missing.{' '}
          <a href="/leaderboard" className="underline">See success stories</a>.
        </p>
      </header>

    </div>
  )
}
