'use client'

import { useState } from 'react'
import type { ApplicationItem } from '@/lib/applications'

interface Props {
  app: ApplicationItem
}

export default function AppFrame({ app }: Props) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="flex flex-col h-full bg-slate-950">
      {/* Browser chrome bar */}
      <div className="shrink-0 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-slate-800/80 border-b border-slate-700/50">
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 min-w-0 bg-slate-700/50 border border-slate-600/30 rounded px-3 py-1 hidden sm:block">
          <span className="text-xs text-slate-400 font-mono truncate block">{app.embedUrl}</span>
        </div>
        <a
          href={app.embedUrl}
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
            <span className="text-xs text-slate-400">Loading {app.label}…</span>
          </div>
        )}
        <iframe
          src={app.embedUrl}
          title={`${app.label} application`}
          className={`w-full h-full border-0 transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    </div>
  )
}
