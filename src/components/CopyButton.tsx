'use client'

import { useState } from 'react'

interface Props {
  text: string
}

/** The Clipboard API, or, where it is missing or refused, the older copy command on a temporary textarea. */
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // fall through to the textarea copy
  }
  const area = document.createElement('textarea')
  area.value = text
  area.setAttribute('readonly', '')
  area.style.position = 'fixed'
  area.style.opacity = '0'
  document.body.appendChild(area)
  area.select()
  try {
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    area.remove()
  }
}

export default function CopyButton({ text }: Props) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')

  const handleCopy = async () => {
    setState((await copyText(text)) ? 'copied' : 'failed')
    setTimeout(() => setState('idle'), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      aria-live="polite"
      className={`shrink-0 text-xs px-2 py-0.5 rounded transition-all duration-200 ${
        state === 'copied'
          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
          : state === 'failed'
            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            : 'text-slate-500 hover:text-slate-200 hover:bg-slate-700 border border-transparent'
      }`}
    >
      {state === 'copied' ? '✓ Copied' : state === 'failed' ? 'Select and copy' : 'Copy'}
    </button>
  )
}
