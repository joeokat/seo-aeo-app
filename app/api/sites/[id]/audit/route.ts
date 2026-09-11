import { NextResponse } from 'next/server'
import { getSite } from '@/lib/mockData'
import { auditSite } from '@/lib/technicalAudit'

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const site = getSite(params.id)
  if (!site) {
    return NextResponse.json({ error: 'Site not found' }, { status: 404 })
  }

  const audit = await auditSite(site.url)
  site.technicalAudit = audit
  return NextResponse.json({ audit })
}