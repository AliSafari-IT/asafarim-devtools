import Link from 'next/link'

export default function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string
  lastUpdated: string
  children: React.ReactNode
}) {
  return (
    <div className="overflow-y-auto h-full">
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-700/50 px-4 pl-12 md:pl-6 md:px-6 py-3 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h1 className="text-sm font-semibold text-white truncate">{title}</h1>
          <p className="text-xs text-slate-500">Last updated: {lastUpdated}</p>
        </div>
        <Link
          href="/"
          className="shrink-0 text-xs text-slate-400 hover:text-white transition-colors"
        >
          ← Back home
        </Link>
      </div>

      <article className="px-4 md:px-6 py-6 md:py-10 max-w-3xl mx-auto prose-legal">
        {children}
      </article>
    </div>
  )
}
