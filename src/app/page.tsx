import Link from 'next/link'
import { CATEGORIES, CATEGORY_COLORS, getPackages } from '@/lib/packages'
import type { PackageMeta } from '@/lib/packages'
import { SITE_URL } from '@/lib/seo'

function StatCard({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 md:p-4 text-center">
      <div className={`text-xl md:text-3xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-slate-400 mt-1">{label}</div>
    </div>
  )
}

function PackageCard({ pkg }: { pkg: PackageMeta }) {
  const colors = CATEGORY_COLORS[pkg.category]
  return (
    <Link
      href={`/packages/${pkg.slug}`}
      className={`group block p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:${colors.border} rounded-lg transition-all duration-150`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs font-mono font-medium text-slate-200 group-hover:text-white transition-colors leading-tight break-all">
          {pkg.name}
        </span>
        <span className="shrink-0 text-xs text-slate-500 bg-slate-700/50 px-1.5 py-0.5 rounded font-mono">
          v{pkg.version}
        </span>
      </div>
      <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
        {pkg.description}
      </p>
      <div className="flex items-center justify-between gap-2">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors.badge}`}>
          {pkg.category}
        </span>
        {pkg.demoUrl ? (
          <span className="flex items-center gap-1 text-xs text-emerald-400">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Live demo
          </span>
        ) : (
          <span className="text-xs text-slate-600">No demo</span>
        )}
      </div>
    </Link>
  )
}

export default async function Home() {
  const packages = await getPackages()
  const liveCount = packages.filter(p => p.demoUrl).length

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: packages.map((pkg, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/packages/${pkg.slug}`,
      name: pkg.name,
    })),
  }

  return (
    <div className="overflow-y-auto h-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-700/50 px-4 pl-12 md:pl-6 md:px-6 py-3 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h1 className="text-sm font-semibold text-white truncate">ASafariM DevTools</h1>
          <p className="text-xs text-slate-400 truncate hidden sm:block">
            Interactive demos for all @asafarim npm packages
          </p>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <a
            href="https://asafarim.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-teal-300 transition-colors"
          >
            <span className="hidden sm:inline">asafarim.com</span><span className="sm:hidden">site</span> ↗
          </a>
          <a
            href="https://www.npmjs.com/~asafarim.be"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-red-400 transition-colors"
          >
            npm ↗
          </a>
          <a
            href="https://github.com/AliSafari-IT"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            <span className="hidden sm:inline">GitHub</span><span className="sm:hidden">GH</span> ↗
          </a>
        </div>
      </div>

      {/* Hero */}
      <div className="px-4 md:px-6 py-6 md:py-8 border-b border-slate-800">
        <div className="max-w-2xl flex items-center gap-3 md:gap-4">
          <img
            src="/logo-icon.svg"
            alt="ASafariM DevTools logo"
            className="w-12 h-12 md:w-16 md:h-16 shrink-0 drop-shadow-xl"
          />
          <div className="min-w-0">
            <h2 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">
              Welcome to ASafariM DevTools 👋
            </h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              Browse all npm packages published under the <code className="text-blue-400 bg-blue-400/10 px-1 rounded">@asafarim</code> scope.
              Click any package in the sidebar or below to open its live demo, install command, and documentation links.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3 mt-5 md:mt-6 max-w-2xl">
          <StatCard value={packages.length} label="Packages" color="text-blue-400" />
          <StatCard value={CATEGORIES.length} label="Categories" color="text-purple-400" />
          <StatCard value={liveCount} label="Live Demos" color="text-emerald-400" />
        </div>
      </div>

      {/* Package grid by category */}
      <div className="px-4 md:px-6 py-6 space-y-8 md:space-y-10">
        {CATEGORIES.map(cat => {
          const pkgs = packages.filter(p => p.category === cat.id)
          const colors = CATEGORY_COLORS[cat.id]
          return (
            <section key={cat.id}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">{cat.icon}</span>
                <h3 className={`text-sm font-semibold ${colors.text}`}>{cat.label}</h3>
                <span className="text-xs text-slate-500">({pkgs.length})</span>
                <div className={`flex-1 h-px ${colors.border} opacity-20 ml-2`} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {pkgs.map(pkg => (
                  <PackageCard key={pkg.slug} pkg={pkg} />
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {/* Footer */}
      <div className="px-4 md:px-6 py-6 border-t border-slate-800 text-center space-y-2">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link href="/privacy-policy" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            Privacy Policy
          </Link>
          <span className="text-slate-700">·</span>
          <Link href="/cookie-policy" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            Cookie Policy
          </Link>
          <span className="text-slate-700">·</span>
          <Link href="/terms" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            Terms of Use
          </Link>
        </div>
        <p className="text-xs text-slate-500">
          Built with Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript 7
        </p>
      </div>
    </div>
  )
}
