import { NextResponse } from 'next/server'
import { sites } from '@/lib/mockData'

export async function GET() {
  const summary = sites.map(({ id, url, name, plan, score, lastScanAt }) => ({
    id, url, name, plan, score, lastScanAt
  }))
  return NextResponse.json(summary)
}
