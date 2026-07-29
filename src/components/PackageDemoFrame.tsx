'use client'

import { useState } from 'react'
import type { PackageMeta } from '@/lib/packages'

interface Props {
  pkg: PackageMeta
}

function NoDemo({ pkg }: { pkg: PackageMeta }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 p-8 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl">
        📦
      </div>
      <div>
        <h3 className="text-base font-semibold text-slate-200 mb-1">No live demo available</h3>
        <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
          This package doesn&apos;t have a standalone demo site yet. Check the GitHub repository for usage examples and documentation.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <a
          href={pkg.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm rounded-lg transition-colors"
        >
          <span>View on GitHub</span>
          <span>↗</span>
        </a>
        <a
          href={pkg.npmUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-300 text-sm rounded-lg transition-colors"
        >
          <span>View on npm</span>
          <span>↗</span>
        </a>
      </div>
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-left max-w-sm w-full">
        <p className="text-xs text-slate-500 mb-2 font-semibold uppercase tracking-wide">Install</p>
        <code className="text-xs text-emerald-400 font-mono">{pkg.install}</code>
      </div>
    </div>
  )
}

export default function PackageDemoFrame({ pkg }: Props) {
  const [loaded, setLoaded] = useState(false)

  if (!pkg.demoUrl) {
    return <NoDemo pkg={pkg} />
  }

  return (
    <div className="flex flex-col h-full bg-slate-950">
      {/* Browser chrome bar */}
      <div className="shrink-0 flex items-center gap-3 px-4 py-2 bg-slate-800/80 border-b border-slate-700/50">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 bg-slate-700/50 border border-slate-600/30 rounded px-3 py-1">
          <span className="text-xs text-slate-400 font-mono truncate block">{pkg.demoUrl}</span>
        </div>
        <a
          href={pkg.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Open in new tab"
          className="text-slate-500 hover:text-slate-300 transition-colors shrink-0 p-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      {/* Iframe */}
      <div className="flex-1 relative">
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-950">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-slate-400">Loading demo…</span>
          </div>
        )}
        <iframe
          src={pkg.demoUrl}
          title={`${pkg.name} live demo`}
          className={`w-full h-full border-0 transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    </div>
  )
}
