'use client'

import { useState, useCallback } from 'react'
import Sidebar from './Sidebar'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  return (
    <>
      {/* Mobile hamburger — fixed top-left, only on mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-2.5 left-2.5 z-50 w-9 h-9 flex items-center justify-center bg-slate-800/95 backdrop-blur border border-slate-700 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors shadow-lg"
        aria-label="Open navigation"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Desktop sidebar — always visible on md+ */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile drawer */}
      {sidebarOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={closeSidebar}
          />
          <div className="md:hidden fixed inset-y-0 left-0 z-50 w-64 max-w-[80vw] shadow-2xl">
            <Sidebar onNavigate={closeSidebar} />
          </div>
        </>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        {children}
      </div>
    </>
  )
}
