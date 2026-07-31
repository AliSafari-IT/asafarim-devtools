export type ConsentChoice = 'accepted' | 'necessary-only'

export interface ConsentRecord {
  choice: ConsentChoice
  timestamp: string
  version: number
}

export const CONSENT_STORAGE_KEY = 'asafarim-devtools-cookie-consent'
export const CONSENT_VERSION = 1
export const CONSENT_UPDATED_EVENT = 'asafarim-devtools-cookie-consent-updated'

export function getConsent(): ConsentRecord | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConsentRecord
    if (parsed.version !== CONSENT_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

export function setConsent(choice: ConsentChoice): void {
  if (typeof window === 'undefined') return
  const record: ConsentRecord = {
    choice,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  }
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record))
  window.dispatchEvent(new CustomEvent(CONSENT_UPDATED_EVENT, { detail: record }))
}

export function clearConsent(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(CONSENT_STORAGE_KEY)
  window.dispatchEvent(new CustomEvent(CONSENT_UPDATED_EVENT, { detail: null }))
}
