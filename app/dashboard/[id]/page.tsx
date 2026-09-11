'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import SignalMeter from '@/components/SignalMeter'
import PromptTable from '@/components/PromptTable'
import RecommendationList from '@/components/RecommendationList'
import type { Site } from '@/lib/mockData'

export default function SiteDetail({ params }: { params: { id: string } }) {
  const [site, setSite] = useState<Site | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)

  async function runScan(siteId: string) {
    setScanning(true)
    setNotice('Scan in progress — checking search and AI visibility.')
    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteId })
      })
      if (!res.ok) throw new Error('scan failed')
      const result = await res.json()
      setSite(result.site)
      setNotice(
        result.simulated
          ? 'Scan complete — some checks used simulated results.'
          : 'Scan complete — live results.'
      )
    } catch (err) {
      setNotice('Scan failed — check your API keys and server logs.')
      console.error(err)
    } finally {
      setScanning(false)
    }
  }

  useEffect(() => {
    fetch(`/api/sites/${params.id}`)
      .then((r) => {
        if (!r.ok) throw new Error('not found')
        return r.json()
      })
      .then((loadedSite) => {
        setSite(loadedSite)
        if (loadedSite.scoreTrend.length === 0) {
          void runScan(params.id)
        }
      })
      .catch(() => setNotFound(true))
  }, [params.id])

  if (notFound) {
    return (
      <div className="min-h-screen bg-paper text-ink">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="font-body text-sm">
            Couldn&apos;t find that site. <Link href="/dashboard" className="underline">Back to your sites</Link>.
          </p>
        </div>
      </div>
    )
  }

  if (!site) return null

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/dashboard" className="font-ui text-xs text-ink-soft">&larr; all sites</Link>

        <div className="flex items-baseline justify-between mt-4 mb-8">
          <div>
            <h1 className="font-display text-3xl">{site.name}</h1>
            <p className="font-data text-xs text-ink-soft">{site.url}</p>
          </div>
          <div className="text-right">
            <p className="font-ui text-xs text-ink-soft mb-2">
              last scanned {new Date(site.lastScanAt).toLocaleDateString()}
            </p>
            <button
              className="px-4 py-2 bg-ink text-paper font-ui text-xs disabled:opacity-50"
              disabled={scanning}
              onClick={() => runScan(site.id)}
            >
              {scanning ? 'Scanning…' : site.scoreTrend.length === 0 ? 'Run first scan' : 'Run scan now'}
            </button>
          </div>
        </div>

        {notice && <p className="font-ui text-xs text-ink-soft mb-6">{notice}</p>}

        <SignalMeter score={site.score} searchComponent={site.searchComponent} aiComponent={site.aiComponent} />

        <h2 className="font-display text-xl mt-12 mb-4">Tracked prompts</h2>
        <PromptTable prompts={site.prompts} />

        <h2 className="font-display text-xl mt-12 mb-4">Fixes, ranked by impact</h2>
        <RecommendationList recommendations={site.recommendations} />
      </div>
    </div>
  )
}
