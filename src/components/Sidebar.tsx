'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useMemo } from 'react'
import { PACKAGES, CATEGORIES, CATEGORY_COLORS, type PackageCategory } from '@/lib/packages'
import { APPLICATION_GROUPS } from '@/lib/applications'

function formatDownloadCount(count: number): string {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(count)
}

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const [search, setSearch] = useState('')
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())
  const [downloadCounts, setDownloadCounts] = useState<Record<string, number | null>>({})
  const [downloadsLoaded, setDownloadsLoaded] = useState(false)

  useEffect(() => {
    let active = true

    const loadDownloads = async () => {
      try {
        const response = await fetch('/api/downloads')
        if (!response.ok) throw new Error('Failed to load downloads')

        const data = await response.json() as {
          downloads?: Record<string, number | null>
        }
        if (active) setDownloadCounts(data.downloads ?? {})
      } catch {
        if (active) setDownloadCounts({})
      } finally {
        if (active) setDownloadsLoaded(true)
      }
    }

    void loadDownloads()
    return () => {
      active = false
    }
  }, [])

  const filteredPackages = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return PACKAGES
    return PACKAGES.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.keywords.some(k => k.toLowerCase().includes(q))
    )
  }, [search])

  const toggleCategory = (cat: string) => {
    setCollapsed(prev => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
  }

  const isActive = (slug: string) => pathname === `/packages/${slug}`

  return (
    <aside
      className="w-56 shrink-0 bg-slate-900 border-r border-slate-700/50 flex flex-col h-full overflow-hidden"
    >


      {/* Search */}
      <div className="shrink-0 px-3 py-2.5 border-b border-slate-700/50">
        <div className="relative">
          <svg
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search packages…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Nav list */}
      <nav className="flex-1 overflow-y-auto py-1">
        {/* Applications section */}
        {APPLICATION_GROUPS.map(group => {
          const isCollapsed = collapsed.has(group.id)
          return (
            <div key={group.id} className="mb-0.5">
              <button
                onClick={() => toggleCategory(group.id)}
                className="w-full flex items-center justify-between px-4 py-1.5 group"
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-xs">{group.icon}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-orange-400 opacity-70 group-hover:opacity-100 transition-opacity">
                    {group.label}
                  </span>
                  <span className="text-xs text-slate-600">
                    {group.items.length}
                  </span>
                </span>
                <svg
                  className={`w-3 h-3 text-slate-600 transition-transform duration-150 ${isCollapsed ? '-rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {!isCollapsed && (
                <ul className="pb-1">
                  {group.items.map(app => {
                    const active = pathname.startsWith(app.activePathPrefix)
                    return (
                      <li key={app.id}>
                        <Link
                          href={app.href}
                          onClick={onNavigate}
                          title={app.description || app.label}
                          className={`flex items-center gap-2 pl-8 pr-3 py-1 text-xs transition-colors duration-100 ${
                            active
                              ? 'bg-blue-500/15 text-blue-300 border-r-2 border-blue-500 font-medium'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                          }`
                          }
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              active ? 'bg-blue-400' : 'bg-orange-500/60'
                            }`}
                          />
                          <span className="truncate font-mono">{app.label}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )
        })}

        {/* Package categories */}
        {CATEGORIES.map(cat => {
          const pkgs = filteredPackages.filter(p => p.category === cat.id)
          if (pkgs.length === 0) return null
          const isCollapsed = collapsed.has(cat.id)
          const catColors = CATEGORY_COLORS[cat.id]

          return (
            <div key={cat.id} className="mb-0.5">
              {/* Category header */}
              <button
                onClick={() => toggleCategory(cat.id)}
                className="w-full flex items-center justify-between px-4 py-1.5 group"
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-xs">{cat.icon}</span>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${catColors.text} group-hover:opacity-100 opacity-70 transition-opacity`}>
                    {cat.label}
                  </span>
                  <span className="text-xs text-slate-600">
                    {pkgs.length}
                  </span>
                </span>
                <svg
                  className={`w-3 h-3 text-slate-600 transition-transform duration-150 ${isCollapsed ? '-rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Package list */}
              {!isCollapsed && (
                <ul className="pb-1">
                  {pkgs.map(pkg => {
                    const active = isActive(pkg.slug)
                    const downloadCount = downloadCounts[pkg.slug]
                    const downloadLabel = !downloadsLoaded
                      ? 'Loading total npm downloads'
                      : downloadCount === null || downloadCount === undefined
                        ? 'Total npm downloads unavailable'
                        : `${downloadCount.toLocaleString()} total npm downloads`

                    return (
                      <li key={pkg.slug}>
                        <Link
                          href={`/packages/${pkg.slug}`}
                          onClick={onNavigate}
                          title={pkg.name}
                          className={`flex items-center gap-2 pl-8 pr-3 py-1 text-xs transition-colors duration-100 ${
                            active
                              ? `bg-blue-500/15 text-blue-300 border-r-2 border-blue-500 font-medium`
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                          }`}
                        >
                          {pkg.demoUrl && (
                            <span
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                active ? 'bg-blue-400' : 'bg-emerald-500/60'
                              }`}
                            />
                          )}
                          <span className="min-w-0 flex-1 truncate font-mono">{pkg.slug}</span>
                          <span
                            className={`shrink-0 text-[10px] tabular-nums ${active ? 'text-blue-400' : 'text-slate-600'}`}
                            title={downloadLabel}
                            aria-label={downloadLabel}
                          >
                            {!downloadsLoaded
                              ? '…'
                              : downloadCount === null || downloadCount === undefined
                                ? '—'
                                : formatDownloadCount(downloadCount)}
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )
        })}

        {filteredPackages.length === 0 && (
          <div className="px-4 py-6 text-center">
            <p className="text-xs text-slate-500">No packages match</p>
            <button
              onClick={() => setSearch('')}
              className="text-xs text-blue-400 hover:text-blue-300 mt-1"
            >
              Clear search
            </button>
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="shrink-0 px-4 py-3 border-t border-slate-700/50 space-y-2">
        <a
          href="https://www.npmjs.com/~asafarim.be"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          <span>📦</span>
          <span>{PACKAGES.length} packages on npm</span>
        </a>
        <div className="flex items-center gap-2 flex-wrap">
          <Link href="/privacy-policy" onClick={onNavigate} className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
            Privacy
          </Link>
          <span className="text-slate-800">·</span>
          <Link href="/cookie-policy" onClick={onNavigate} className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
            Cookies
          </Link>
          <span className="text-slate-800">·</span>
          <Link href="/terms" onClick={onNavigate} className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </aside>
  )
}
