'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import SignalMeter from '@/components/SignalMeter'
import PromptTable from '@/components/PromptTable'
import RecommendationList from '@/components/RecommendationList'
import MetricCard from '@/components/MetricCard'
import VisibilityTrend from '@/components/VisibilityTrend'
import TechnicalAudit from '@/components/TechnicalAudit'
import type { Site } from '@/lib/mockData'

export default function SiteDetail({ params }: { params: { id: string } }) {
  const [site, setSite] = useState<Site | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [statusMessage, setStatusMessage] = useState('Live visibility data')
  const [audit, setAudit] = useState<Site['technicalAudit']>(undefined)

  async function runTechnicalAudit(siteId: string) {
    try {
      const res = await fetch(`/api/sites/${siteId}/audit`, { method: 'POST' })
      if (!res.ok) throw new Error('audit failed')
      const result = await res.json()
      setAudit(result.audit)
    } catch (err) {
      console.error(err)
    }
  }

  async function runScan(siteId: string) {
    setScanning(true)
    setStatusMessage('Refreshing visibility insights...')
    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteId })
      })
      if (!res.ok) throw new Error('scan failed')
      const result = await res.json()
      setSite(result.site)
      setStatusMessage(
        result.simulated
          ? 'Updated just now.'
          : 'Updated just now · Live visibility data.'
      )
    } catch (err) {
      setStatusMessage('Unable to refresh · Check your API keys and try again.')
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
        setAudit(loadedSite.technicalAudit)
        if (loadedSite.scoreTrend.length === 0) {
          void runScan(params.id)
        }
        if (!loadedSite.technicalAudit) {
          void runTechnicalAudit(params.id)
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

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mt-4 mb-8">
          <div>
            <h1 className="font-display text-3xl">{site.name}</h1>
            <p className="font-data text-xs text-ink-soft">{site.url}</p>
          </div>
          <div className="sm:text-right">
            <p className="font-ui text-xs text-ink-soft mt-2">
              Last updated {new Date(site.lastScanAt).toLocaleDateString()}
            </p>
            <p className={`font-ui text-xs mt-1 ${scanning ? 'text-signal' : statusMessage.startsWith('Unable') ? 'text-signal' : 'text-found'}`}>
              {scanning ? 'Refreshing visibility insights...' : statusMessage}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <MetricCard label="Visibility score" value={`${site.score}/100`} detail="Overall search and AI signal" />
          <MetricCard label="Search visibility" value={`${site.searchComponent}/100`} detail="Google result coverage" />
          <MetricCard label="AI visibility" value={`${site.aiComponent}/100`} detail="Connected AI sources only" />
          <MetricCard
            label="Keyword ranking"
            value={site.prompts.length}
            detail={`${site.prompts.filter((prompt) => prompt.searchRank).length} currently ranking`}
          />
          <button
              className="self-start sm:self-auto px-4 py-4 bg-ink text-paper font-ui mb-6 text-xs disabled:opacity-50"
              disabled={scanning}
              onClick={() => runScan(site.id)}
            >
              {scanning ? 'Refreshing...' : 'Refresh visibility insights'}
            </button>
        </div>

        <div className="mt-4">
          <VisibilityTrend values={site.scoreTrend} />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3">
          </div>
        </div>

        {audit && (
          <div className="mt-4">
            <TechnicalAudit audit={audit} />
            <div className="flex justify-end mt-3">
              <button
                type="button"
                className="self-start sm:self-auto px-4 py-4 bg-ink text-paper font-ui mb-6 text-xs disabled:opacity-50"
                disabled={scanning}
                onClick={() => runTechnicalAudit(site.id)}
              >
                Refresh site health
              </button>
            </div>
          </div>
        )}

        <div className="mt-12">
          <h2 className="font-display text-xl mb-4">Visibility by channel</h2>
          <SignalMeter score={site.score} searchComponent={site.searchComponent} aiComponent={site.aiComponent} />
        </div>

        <h2 className="font-display text-xl mt-12 mb-4">Keyword ranking</h2>
        <PromptTable prompts={site.prompts} />

        <h2 className="font-display text-xl mt-12 mb-4">Recommended fixes</h2>
        <RecommendationList recommendations={site.recommendations} />
      </div>
    </div>
  )
}
