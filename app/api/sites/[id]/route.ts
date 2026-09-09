import { NextResponse } from 'next/server'
import { getSite } from '@/lib/mockData'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const site = getSite(params.id)
  if (!site) {
    return NextResponse.json({ error: 'Site not found' }, { status: 404 })
  }
  return NextResponse.json(site)
}
