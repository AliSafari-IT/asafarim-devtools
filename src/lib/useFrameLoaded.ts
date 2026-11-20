'use client'

import { useEffect, useState } from 'react'

/** Reveal the frame anyway after this long, so a missed load event can never hide it for good. */
const REVEAL_AFTER_MS = 8000

/**
 * Load state for an embedded <iframe>.
 *
 * The frame is only rendered after hydration: in the server HTML the browser
 * starts loading it straight away, and a fast (cached) demo could finish before
 * React attached onLoad. The load event was then missed, the frame stayed
 * invisible and the "Loading…" overlay sat on top of it, swallowing every click.
 */
export function useFrameLoaded() {
  const [mounted, setMounted] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setLoaded(true), REVEAL_AFTER_MS)
    return () => clearTimeout(timer)
  }, [])

  return { mounted, loaded, onLoad: () => setLoaded(true) }
}
