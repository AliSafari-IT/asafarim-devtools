'use client'

import { useState, useRef, useEffect } from 'react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const ROLES = [
  { value: '', label: 'Select your role (optional)' },
  { value: 'frontend-dev', label: 'Frontend Developer' },
  { value: 'backend-dev', label: 'Backend Developer' },
  { value: 'fullstack-dev', label: 'Full-Stack Developer' },
  { value: 'devops', label: 'DevOps / SRE' },
  { value: 'designer', label: 'UI/UX Designer' },
  { value: 'product-manager', label: 'Product Manager' },
  { value: 'tech-lead', label: 'Tech Lead / Architect' },
  { value: 'student', label: 'Student' },
  { value: 'other', label: 'Other' },
] as const

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  description: string
  role: string
  emailOptIn: boolean
  email: string
}

type FormErrors = Partial<Record<'description' | 'email' | 'form', string>>

interface Props {
  isOpen: boolean
  onClose: () => void
}

// ─── Root component ───────────────────────────────────────────────────────────

export default function FeedbackPanel({ isOpen, onClose }: Props) {
  const [done, setDone] = useState(false)
  const [form, setForm] = useState<FormState>({
    description: '',
    role: '',
    emailOptIn: false,
    email: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [reference, setReference] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-focus textarea on open
  useEffect(() => {
    if (isOpen && !done) {
      const t = setTimeout(() => textareaRef.current?.focus(), 350)
      return () => clearTimeout(t)
    }
  }, [isOpen, done])

  // Reset after close animation
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setDone(false)
        setReference(null)
        setForm({ description: '', role: '', emailOptIn: false, email: '' })
        setErrors({})
      }, 350)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
    if (key === 'description' || key === 'email') {
      setErrors(prev => ({ ...prev, [key]: undefined }))
    }
  }

  async function handleSend() {
    const e: FormErrors = {}
    if (!form.description.trim()) {
      e.description = 'Please describe your feedback before sending.'
    }
    if (
      form.emailOptIn &&
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      e.email = 'Please enter a valid email address.'
    }
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }

    setSubmitting(true)
    setErrors({})
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!response.ok) throw new Error('Feedback request failed')
      const result = (await response.json()) as { reference?: string }
      setReference(result.reference ?? null)
      setDone(true)
    } catch {
      setErrors({ form: 'We could not send your feedback. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  const canSend = form.description.trim().length > 0

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Send feedback to ASafariM"
        className={`fixed right-0 top-0 z-50 h-full w-[440px] max-w-[95vw] bg-white flex flex-col shadow-2xl shadow-black/50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {done ? (
          <SuccessView onClose={onClose} reference={reference} />
        ) : (
          <FormView
            form={form}
            errors={errors}
            canSend={canSend}
            submitting={submitting}
            textareaRef={textareaRef}
            update={update}
            onClose={onClose}
            onSend={handleSend}
          />
        )}
      </aside>
    </>
  )
}

// ─── Form view ────────────────────────────────────────────────────────────────

interface FormViewProps {
  form: FormState
  errors: FormErrors
  canSend: boolean
  submitting: boolean
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void
  onClose: () => void
  onSend: () => void
}

function FormView({
  form, errors, canSend, submitting, textareaRef, update, onClose, onSend,
}: FormViewProps) {
  return (
    <>
      {/* ── Header ── */}
      <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h2 className="text-[15px] font-semibold text-gray-900 tracking-tight">
          Send feedback to ASafariM
        </h2>
        <button
          onClick={onClose}
          aria-label="Close feedback panel"
          className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

        {/* Description */}
        <div>
          <label htmlFor="fb-desc" className="block text-sm font-medium text-gray-800 mb-1.5">
            Describe your feedback{' '}
            <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <textarea
            id="fb-desc"
            ref={textareaRef}
            value={form.description}
            onChange={e => update('description', e.target.value)}
            placeholder="Tell us what prompted this feedback…"
            rows={5}
            className={`w-full px-3 py-2.5 text-sm text-gray-900 bg-white border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-colors ${
              errors.description
                ? 'border-red-400 focus:ring-red-400'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          />
          {errors.description ? (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500">
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.description}
            </p>
          ) : (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500">
              Please don&apos;t include any sensitive information
              <span
                title="Sensitive information includes passwords, tokens, personal identification numbers, and private data."
                className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-gray-300 text-gray-400 hover:border-gray-500 hover:text-gray-600 cursor-help transition-colors text-[10px] font-bold leading-none"
              >
                ?
              </span>
            </p>
          )}
        </div>

        {/* Role selector */}
        <div>
          <label htmlFor="fb-role" className="block text-sm font-medium text-gray-800 mb-1.5">
            Your role{' '}
            <span className="text-xs font-normal text-gray-400">— optional</span>
          </label>
          <p className="text-xs text-gray-500 mb-2 leading-relaxed">
            Role details help us understand your use case and provide better targeted responses.
          </p>
          <div className="relative">
            <select
              id="fb-role"
              value={form.role}
              onChange={e => update('role', e.target.value)}
              className="w-full appearance-none px-3 py-2.5 pr-9 text-sm bg-white border border-gray-300 hover:border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer text-gray-800"
            >
              {ROLES.map(r => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Email opt-in */}
        <div className="space-y-3">
          {/* Checkbox row */}
          <label className="flex items-start gap-3 cursor-pointer group select-none">
            {/* Real checkbox drives state; visually hidden but still focusable/tabbable */}
            <input
              type="checkbox"
              className="sr-only peer"
              checked={form.emailOptIn}
              onChange={e => update('emailOptIn', e.target.checked)}
              aria-label="Send me a copy of this feedback by email"
            />
            {/* Custom checkbox visual — purely decorative, no handlers of its own */}
            <div
              aria-hidden="true"
              className={`mt-0.5 w-4 h-4 shrink-0 border-2 rounded-sm flex items-center justify-center transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-blue-400 peer-focus-visible:ring-offset-1 ${
                form.emailOptIn
                  ? 'bg-blue-600 border-blue-600'
                  : 'border-gray-400 group-hover:border-blue-400'
              }`}
            >
              {form.emailOptIn && (
                <svg
                  className="w-2.5 h-2.5 text-white"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M1.5 5.5L4 8 8.5 2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span className="text-sm text-gray-700 leading-snug">
              Send me a copy of this feedback by email
            </span>
          </label>

          {/* Email field — shown only when opt-in is checked */}
          {form.emailOptIn && (
            <div className="pl-7 space-y-1.5">
              <label htmlFor="fb-email" className="block text-xs font-medium text-gray-600">
                Email address{' '}
                <span className="font-normal text-gray-400">— optional</span>
              </label>
              <input
                id="fb-email"
                type="email"
                value={form.email}
                onChange={e => update('email', e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className={`w-full px-3 py-2 text-sm text-gray-900 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-colors ${
                  errors.email
                    ? 'border-red-400 focus:ring-red-400'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>
          )}
        </div>

        {/* Privacy note */}
        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs text-gray-400 leading-relaxed">
            Some account and system information may be sent to ASafariM. We will use it to fix
            problems and improve our packages, subject to our{' '}
            <a
              href="/privacy-policy"
              className="text-blue-500 hover:text-blue-600 hover:underline transition-colors"
            >
              Privacy Policy
            </a>{' '}
            and{' '}
            <a
              href="/terms"
              className="text-blue-500 hover:text-blue-600 hover:underline transition-colors"
            >
              Terms of Service
            </a>
            . Select the checkbox above if you would like a copy by email.
          </p>
        </div>
      </div>

      {errors.form && (
        <p className="shrink-0 px-6 pb-3 text-xs text-red-500">{errors.form}</p>
      )}

      {/* ── Footer ── */}
      <div className="shrink-0 flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50/80">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onSend}
          disabled={!canSend || submitting}
          className={`px-5 py-2 text-sm font-semibold rounded-md transition-all duration-150 ${
            canSend
              ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm hover:shadow-md'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {submitting ? 'Sending…' : 'Send'}
        </button>
      </div>
    </>
  )
}

// ─── Success view ─────────────────────────────────────────────────────────────

function SuccessView({ onClose, reference }: { onClose: () => void; reference: string | null }) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h2 className="text-[15px] font-semibold text-gray-900">Feedback received</h2>
        <button
          onClick={onClose}
          aria-label="Close"
          className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8 text-center">
        {/* Check icon */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
        </div>

        {/* Text */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Thank you!</h3>
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
            Your feedback has been submitted. It will help improve the ASafariM ecosystem and open-source packages.
          </p>
          {reference && (
            <p className="mt-3 text-xs font-medium text-gray-600">Reference: {reference}</p>
          )}
        </div>

        <button
          onClick={onClose}
          className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm hover:shadow-md"
        >
          Done
        </button>
      </div>
    </div>
  )
}
