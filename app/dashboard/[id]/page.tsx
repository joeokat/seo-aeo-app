'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import SignalMeter from '@/components/SignalMeter'
import PromptTable from '@/components/PromptTable'
import RecommendationList from '@/components/RecommendationList'
import type { Site } from '@/lib/mockData'

export default function SiteDetail({ params }: { params: { id: string } }) {
  const [site, setSite] = useState<Site | null>(null)
  const [scanning, setScanning] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/sites/${params.id}`)
      .then((r) => r.json())
      .then(setSite)
  }, [params.id])

  async function runScan() {
    if (!site) return
    setScanning(true)
    setNotice(null)
    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteId: site.id })
      })
      const result = await res.json()
      setSite(result.site)
      setNotice(
        result.simulated
          ? 'Scan complete — running in simulated mode (no API keys set yet).'
          : 'Scan complete — live results.'
      )
    } catch (err) {
      setNotice('Scan failed — check server logs.')
      console.error(err)
    } finally {
      setScanning(false)
    }
  }

  if (!site) return null

  return (
    <div className="min-h-screen bg-paper text-ink font-body">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/dashboard" className="font-data text-xs text-ink-soft">&larr; all sites</Link>

        <div className="flex items-baseline justify-between mt-4 mb-8">
          <div>
            <h1 className="font-display text-3xl">{site.name}</h1>
            <p className="font-data text-xs text-ink-soft">{site.url}</p>
          </div>
          <div className="text-right">
            <p className="font-body text-xs text-ink-soft mb-2">
              last scanned {new Date(site.lastScanAt).toLocaleDateString()}
            </p>
            <button
              className="px-4 py-2 bg-ink text-paper font-body text-xs disabled:opacity-50"
              disabled={scanning}
              onClick={runScan}
            >
              {scanning ? 'Scanning…' : 'Run scan now'}
            </button>
          </div>
        </div>

        {notice && <p className="font-body text-xs text-ink-soft mb-6">{notice}</p>}

        <SignalMeter score={site.score} searchComponent={site.searchComponent} aiComponent={site.aiComponent} />

        <h2 className="font-display text-xl mt-12 mb-4">Tracked prompts</h2>
        <PromptTable prompts={site.prompts} />

        <h2 className="font-display text-xl mt-12 mb-4">Fixes, ranked by impact</h2>
        <RecommendationList recommendations={site.recommendations} />
      </div>
    </div>
  )
}
