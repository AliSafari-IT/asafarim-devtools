'use client'

import Link from 'next/link'
import { useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'
import FeedbackPanel from './FeedbackPanel'
import { PACKAGES } from '@/lib/packages'

function GitHubIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function NpmIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M0 0v24h24V0H0zm19.2 19.2H4.8V4.8h14.4v14.4zm-12-2.4h3.6V9.6H7.2v7.2zm3.6 0h1.2V9.6h-1.2v2.4H9.6v-2.4H8.4v7.2h1.2V12h1.2v4.8zm4.8 0v-7.2h-2.4v7.2h2.4z" />
    </svg>
  )
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])
  const pathname = usePathname()

  // Derive breadcrumb from the current URL
  const slug = pathname?.startsWith('/packages/') ? pathname.split('/')[2] : null
  const currentPkg = slug ? PACKAGES.find(p => p.slug === slug) : null

  const isLegal = ['/privacy-policy', '/cookie-policy', '/terms'].some(p =>
    pathname?.startsWith(p)
  )

  return (
    <div className="flex flex-col flex-1 overflow-hidden min-w-0">
      {/* ─── Global Top Header ─────────────────────────────────────────── */}
      <header className="shrink-0 h-11 flex items-center gap-3 px-3 bg-slate-900 border-b border-slate-700/50 z-30">
        {/* Mobile hamburger — now INSIDE the header */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/70 transition-colors shrink-0"
          aria-label="Open navigation"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <img
            src="/logo-icon.svg"
            alt="ASafariM DevTools"
            className="w-6 h-6 shrink-0 drop-shadow"
          />
          <span className="hidden sm:block text-sm font-semibold text-white group-hover:text-blue-300 transition-colors leading-none">
            ASafariM
          </span>
          <span className="hidden sm:block text-xs text-slate-500 leading-none">
            DevTools
          </span>
        </Link>

        {/* Breadcrumb */}
        {currentPkg && (
          <div className="hidden md:flex items-center gap-1.5 min-w-0">
            <span className="text-slate-600 text-xs">/</span>
            <span className="text-xs text-slate-400 font-mono truncate" title={currentPkg.name}>
              {currentPkg.name}
            </span>
          </div>
        )}
        {isLegal && pathname && (
          <div className="hidden md:flex items-center gap-1.5">
            <span className="text-slate-600 text-xs">/</span>
            <span className="text-xs text-slate-400 capitalize">
              {pathname.replace('/', '').replace(/-/g, ' ')}
            </span>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Global nav actions */}
        <nav className="flex items-center gap-1" aria-label="External links">
          <a
            href="https://github.com/AliSafari-IT"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="flex items-center gap-1.5 px-2 py-1 rounded text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors text-xs"
          >
            <GitHubIcon />
            <span className="hidden lg:block">GitHub</span>
          </a>
          <a
            href="https://www.npmjs.com/~asafarim.be"
            target="_blank"
            rel="noopener noreferrer"
            title="npm profile"
            className="flex items-center gap-1.5 px-2 py-1 rounded text-slate-400 hover:text-red-400 hover:bg-slate-700/60 transition-colors text-xs"
          >
            <NpmIcon />
            <span className="hidden lg:block">npm</span>
          </a>
          <div className="w-px h-4 bg-slate-700 mx-1 shrink-0" />
          <button
            onClick={() => setFeedbackOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-700/40 hover:bg-slate-700 border border-slate-600/40 hover:border-slate-500 rounded-md transition-all duration-150"
            aria-label="Send feedback"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span className="hidden sm:block">Send feedback</span>
          </button>
        </nav>
      </header>

      {/* ─── Body row: Sidebar + Main content ──────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <div className="hidden md:flex shrink-0">
          <Sidebar />
        </div>

        {/* Mobile drawer backdrop */}
        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}

        {/* Mobile sidebar drawer */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-y-0 left-0 z-50 w-64 max-w-[80vw] shadow-2xl">
            <Sidebar onNavigate={closeSidebar} />
          </div>
        )}

        {/* Page content */}
        <div className="flex flex-col flex-1 overflow-hidden min-w-0">
          {children}
        </div>
      </div>

      {/* ─── Feedback Panel overlay ─────────────────────────────────────── */}
      <FeedbackPanel
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
      />
    </div>
  )
}
