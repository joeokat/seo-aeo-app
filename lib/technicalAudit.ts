import { fetchWithTimeout } from './providers/shared'

export type AuditStatus = 'pass' | 'warning' | 'fail'

export interface AuditCheck {
  id: string
  label: string
  status: AuditStatus
  detail: string
}

export interface TechnicalAudit {
  score: number
  checkedAt: string
  checks: AuditCheck[]
}

function check(id: string, label: string, status: AuditStatus, detail: string): AuditCheck {
  return { id, label, status, detail }
}

function extractTag(html: string, pattern: RegExp) {
  return html.match(pattern)?.[1]?.trim() ?? ''
}

export async function auditSite(domain: string): Promise<TechnicalAudit> {
  const baseUrl = `https://${domain}/`
  const checks: AuditCheck[] = []
  let html = ''

  try {
    const response = await fetchWithTimeout(baseUrl)
    if (!response.ok) throw new Error(`homepage returned ${response.status}`)
    html = await response.text()
  } catch {
    checks.push(check('homepage', 'Homepage', 'fail', 'The homepage could not be fetched over HTTPS.'))
    return finalizeAudit(checks)
  }

  const title = extractTag(html, /<title[^>]*>([\s\S]*?)<\/title>/i)
  const description = extractTag(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i)
  const h1Count = (html.match(/<h1(?:\s|>)/gi) ?? []).length
  const canonical = extractTag(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["'][^>]*>/i)
  const hasSchema = /application\/ld\+json/i.test(html)

  checks.push(check(
    'title',
    'Page title',
    title.length >= 10 && title.length <= 60 ? 'pass' : title ? 'warning' : 'fail',
    title ? `${title.length} characters found.` : 'Add a descriptive title for search results.'
  ))
  checks.push(check(
    'description',
    'Meta description',
    description.length >= 70 && description.length <= 160 ? 'pass' : description ? 'warning' : 'fail',
    description ? `${description.length} characters found.` : 'Add a meta description that explains the page.'
  ))
  checks.push(check(
    'h1',
    'Main heading',
    h1Count === 1 ? 'pass' : h1Count === 0 ? 'fail' : 'warning',
    h1Count === 1 ? 'One main heading found.' : `${h1Count} main headings found; aim for one.`
  ))
  checks.push(check(
    'canonical',
    'Canonical URL',
    canonical ? 'pass' : 'warning',
    canonical ? 'Canonical URL is declared.' : 'Declare a canonical URL to consolidate indexing signals.'
  ))
  checks.push(check(
    'schema',
    'Structured data',
    hasSchema ? 'pass' : 'warning',
    hasSchema ? 'JSON-LD structured data found.' : 'Add structured data so search engines can better understand the page.'
  ))
  checks.push(check('https', 'HTTPS', 'pass', 'The site was checked over HTTPS.'))

  const [robots, sitemap] = await Promise.all([
    checkResource(`${baseUrl}robots.txt`, 'robots.txt'),
    checkResource(`${baseUrl}sitemap.xml`, 'sitemap.xml')
  ])
  checks.push(robots, sitemap)

  return finalizeAudit(checks)
}

async function checkResource(url: string, label: string): Promise<AuditCheck> {
  try {
    const response = await fetchWithTimeout(url)
    return response.ok
      ? check(label, label, 'pass', `${label} is available.`)
      : check(label, label, 'warning', `${label} returned HTTP ${response.status}.`)
  } catch {
    return check(label, label, 'warning', `${label} could not be fetched.`)
  }
}

function finalizeAudit(checks: AuditCheck[]): TechnicalAudit {
  const points = checks.reduce((total, item) => total + (item.status === 'pass' ? 100 : item.status === 'warning' ? 60 : 0), 0)
  return {
    score: checks.length === 0 ? 0 : Math.round(points / checks.length),
    checkedAt: new Date().toISOString(),
    checks
  }
}
