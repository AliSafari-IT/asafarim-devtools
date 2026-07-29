import { notFound } from 'next/navigation'
import { PACKAGES, CATEGORY_COLORS } from '@/lib/packages'
import PackageDemoFrame from '@/components/PackageDemoFrame'
import CopyButton from '@/components/CopyButton'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return PACKAGES.map(pkg => ({ slug: pkg.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const pkg = PACKAGES.find(p => p.slug === slug)
  if (!pkg) return {}
  return {
    title: `${pkg.name} — ASafariM DevTools`,
    description: pkg.description,
  }
}

export default async function PackagePage({ params }: Props) {
  const { slug } = await params
  const pkg = PACKAGES.find(p => p.slug === slug)
  if (!pkg) notFound()

  const colors = CATEGORY_COLORS[pkg.category]

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Page header */}
      <div className="shrink-0 bg-slate-900/95 backdrop-blur border-b border-slate-700/50 px-5 py-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-sm font-semibold text-white font-mono break-all">
                {pkg.name}
              </h1>
              <span className="shrink-0 text-xs bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded font-mono">
                v{pkg.version}
              </span>
              <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full ${colors.badge}`}>
                {pkg.category}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed line-clamp-2">
              {pkg.description}
            </p>
          </div>

          {/* Action links */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={pkg.npmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1 text-xs bg-red-900/30 hover:bg-red-900/50 text-red-300 border border-red-800/50 rounded transition-colors"
            >
              <span>npm</span>
              <span>↗</span>
            </a>
            {pkg.githubUrl && (
              <a
                href={pkg.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1 text-xs bg-slate-700/50 hover:bg-slate-700 text-slate-200 border border-slate-600/50 rounded transition-colors"
              >
                <span>GitHub</span>
                <span>↗</span>
              </a>
            )}
            {pkg.demoUrl && (
              <a
                href={pkg.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1 text-xs bg-emerald-900/30 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-800/50 rounded transition-colors"
              >
                <span>Open demo</span>
                <span>↗</span>
              </a>
            )}
          </div>
        </div>

        {/* Install command */}
        <div className="flex items-center gap-3 mt-2 bg-slate-800/50 border border-slate-700/50 rounded px-3 py-1.5 w-fit max-w-full">
          <span className="text-xs text-slate-500 shrink-0">$</span>
          <code className="text-xs text-emerald-400 font-mono">{pkg.install}</code>
          <CopyButton text={pkg.install} />
        </div>
      </div>

      {/* Demo area — fills remaining height */}
      <div className="flex-1 overflow-hidden">
        <PackageDemoFrame pkg={pkg} />
      </div>
    </div>
  )
}
