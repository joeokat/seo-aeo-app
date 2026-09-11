import { NextResponse } from 'next/server'
import { getSite } from '@/lib/mockData'
import { getProviderStatus, runScanForSite } from '@/lib/runScan'

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const site = body?.siteId ? getSite(body.siteId) : null

  if (!site) {
    return NextResponse.json({ error: 'Site not found' }, { status: 404 })
  }

  const result = await runScanForSite(site)

  return NextResponse.json({ site, ...result, providers: getProviderStatus() })
}
