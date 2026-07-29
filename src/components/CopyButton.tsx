'use client'

import { useState } from 'react'

interface Props {
  text: string
}

export default function CopyButton({ text }: Props) {
  const [state, setState] = useState<'idle' | 'copied'>('idle')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setState('copied')
      setTimeout(() => setState('idle'), 2000)
    } catch {
      // clipboard not available
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`shrink-0 text-xs px-2 py-0.5 rounded transition-all duration-200 ${
        state === 'copied'
          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
          : 'text-slate-500 hover:text-slate-200 hover:bg-slate-700 border border-transparent'
      }`}
    >
      {state === 'copied' ? '✓ Copied' : 'Copy'}
    </button>
  )
}
