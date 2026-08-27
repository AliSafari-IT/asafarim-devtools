'use client'

import { useEffect, useState } from 'react'

type DownloadCounts = Record<string, number | null>

let downloadCountsPromise: Promise<DownloadCounts> | undefined

function loadDownloadCounts(): Promise<DownloadCounts> {
  if (!downloadCountsPromise) {
    downloadCountsPromise = fetch('/api/downloads')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load downloads')
        return response.json() as Promise<{ downloads?: DownloadCounts }>
      })
      .then(data => data.downloads ?? {})
  }

  return downloadCountsPromise
}

function formatDownloadCount(count: number): string {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(count)
}

export default function PackageDownloadCount({
  slug,
  compact = false,
}: {
  slug: string
  compact?: boolean
}) {
  const [count, setCount] = useState<number | null | undefined>(undefined)

  useEffect(() => {
    let active = true

    void loadDownloadCounts()
      .then(downloads => {
        if (active) setCount(downloads[slug] ?? null)
      })
      .catch(() => {
        if (active) setCount(null)
      })

    return () => {
      active = false
    }
  }, [slug])

  const label = count === undefined
    ? 'Loading total npm downloads'
    : count === null
      ? 'Total npm downloads unavailable'
      : `${count.toLocaleString()} total npm downloads`

  return (
    <span className="shrink-0 text-xs text-slate-500 tabular-nums" title={label} aria-label={label}>
      <span aria-hidden="true">↓ </span>
      {count === undefined ? '…' : count === null ? '—' : formatDownloadCount(count)}
      {!compact && ' downloads'}
    </span>
  )
}
