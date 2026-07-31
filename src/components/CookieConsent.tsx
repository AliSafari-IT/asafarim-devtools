'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  CONSENT_UPDATED_EVENT,
  getConsent,
  setConsent,
  type ConsentRecord,
} from '@/lib/cookieConsent'

export default function CookieConsent() {
  const [record, setRecord] = useState<ConsentRecord | null | undefined>(undefined)
  const [manageOpen, setManageOpen] = useState(false)

  useEffect(() => {
    setRecord(getConsent())
    const onUpdate = (e: Event) => {
      const detail = (e as CustomEvent<ConsentRecord | null>).detail
      setRecord(detail)
    }
    window.addEventListener(CONSENT_UPDATED_EVENT, onUpdate)
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, onUpdate)
  }, [])

  // Still resolving from localStorage — render nothing to avoid flash.
  if (record === undefined) return null

  const showBanner = record === null
  const showReopenButton = record !== null && !manageOpen

  if (showReopenButton) {
    return (
      <button
        onClick={() => setManageOpen(true)}
        title="Cookie preferences"
        aria-label="Manage cookie preferences"
        className="fixed bottom-3 left-3 z-40 w-9 h-9 flex items-center justify-center rounded-full bg-slate-800/90 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 backdrop-blur shadow-lg transition-colors"
      >
        <span className="text-base leading-none">🍪</span>
      </button>
    )
  }

  if (!showBanner && !manageOpen) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4 flex justify-center">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="text-2xl shrink-0">🍪</span>
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-white mb-1">Cookies & privacy</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              We use only strictly necessary local storage to remember your preferences. This site
              embeds live demo pages hosted on third-party domains (GitHub Pages) inside sandboxed
              iframes, which may set their own cookies under their own privacy policies. We do not
              use first-party analytics, advertising, or tracking cookies. Read our{' '}
              <Link href="/cookie-policy" className="text-blue-400 hover:text-blue-300 underline">
                Cookie Policy
              </Link>{' '}
              and{' '}
              <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300 underline">
                Privacy Policy
              </Link>{' '}
              for details.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 mt-4">
          <button
            onClick={() => {
              setConsent('necessary-only')
              setManageOpen(false)
            }}
            className="px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            Necessary only
          </button>
          <button
            onClick={() => {
              setConsent('accepted')
              setManageOpen(false)
            }}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  )
}
