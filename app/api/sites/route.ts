import { NextResponse } from 'next/server'
import { sites, createSite } from '@/lib/mockData'

export async function GET() {
  const summary = sites.map(({ id, url, name, plan, score, lastScanAt }) => ({
    id, url, name, plan, score, lastScanAt
  }))
  return NextResponse.json(summary)
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const rawUrl = typeof body?.url === 'string' ? body.url.trim() : ''

  if (!rawUrl) {
    return NextResponse.json({ error: 'A website URL is required.' }, { status: 400 })
  }

  let site
  try {
    site = createSite(rawUrl)
  } catch {
    return NextResponse.json({ error: 'That doesn\u2019t look like a valid URL.' }, { status: 400 })
  }

  return NextResponse.json({ site })
}
