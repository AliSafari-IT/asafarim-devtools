import { PACKAGES } from '@/lib/packages'

const NPM_STATS_START = new Date('2015-01-10T00:00:00.000Z')
const DAY_MS = 24 * 60 * 60 * 1000

type NpmPackageMetadata = {
  time?: {
    created?: string
  }
}

type NpmDownloadPoint = {
  downloads?: number
}

function startOfDay(date: Date): Date {
  const day = new Date(date)
  day.setUTCHours(0, 0, 0, 0)
  return day
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

async function getPackageCreatedAt(name: string): Promise<Date | undefined> {
  try {
    const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(name)}`, {
      next: { revalidate: 86400 },
    })
    if (!response.ok) return undefined

    const metadata = await response.json() as NpmPackageMetadata
    const createdAt = metadata.time?.created
    if (!createdAt) return undefined

    const date = startOfDay(new Date(createdAt))
    return Number.isNaN(date.getTime()) ? undefined : date
  } catch {
    return undefined
  }
}

async function getPackageDownloads(name: string): Promise<number | null> {
  try {
    const yesterday = startOfDay(new Date(Date.now() - DAY_MS))
    const createdAt = await getPackageCreatedAt(name)
    const start = createdAt && createdAt > NPM_STATS_START ? createdAt : NPM_STATS_START

    if (start > yesterday) return 0

    let total = 0
    let periodStart = start

    while (periodStart <= yesterday) {
      const periodEnd = new Date(Math.min(periodStart.getTime() + 364 * DAY_MS, yesterday.getTime()))
      const response = await fetch(
        `https://api.npmjs.org/downloads/point/${formatDate(periodStart)}:${formatDate(periodEnd)}/${encodeURIComponent(name)}`,
        { next: { revalidate: 86400 } },
      )
      if (!response.ok) return null

      const data = await response.json() as NpmDownloadPoint
      if (typeof data.downloads !== 'number') return null

      total += data.downloads
      periodStart = new Date(periodEnd.getTime() + DAY_MS)
    }

    return total
  } catch {
    return null
  }
}

export const revalidate = 86400

export async function GET() {
  const entries = await Promise.all(
    PACKAGES.map(async pkg => [pkg.slug, await getPackageDownloads(pkg.name)] as const),
  )

  return Response.json({ downloads: Object.fromEntries(entries) })
}
