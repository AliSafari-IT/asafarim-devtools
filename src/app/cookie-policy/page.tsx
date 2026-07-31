import type { Metadata } from 'next'
import LegalPageLayout from '@/components/LegalPageLayout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const LAST_UPDATED = '2026-08-01'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: `Details on the cookies and local storage used by ${SITE_NAME}.`,
  alternates: { canonical: `${SITE_URL}/cookie-policy` },
  robots: { index: true, follow: true },
}

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout title="Cookie Policy" lastUpdated={LAST_UPDATED}>
      <p>
        This Cookie Policy explains how <strong>{SITE_NAME}</strong> (&quot;we&quot;,
        &quot;us&quot;) uses cookies and similar storage technologies (such as{' '}
        <code>localStorage</code>) on <a href={SITE_URL}>{SITE_URL}</a>.
      </p>

      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small text files placed on your device by a website. &quot;Similar
        technologies&quot; include browser <code>localStorage</code> and <code>sessionStorage</code>,
        which we use instead of traditional cookies where possible, as they are not automatically
        sent with every network request.
      </p>

      <h2>2. Cookies We Use</h2>
      <h3>2.1 Strictly necessary storage</h3>
      <p>
        We store a single item in your browser&apos;s <code>localStorage</code> under the key{' '}
        <code>asafarim-devtools-cookie-consent</code> to remember whether you accepted or
        declined non-essential cookies, so we don&apos;t show the consent banner on every visit.
        This is strictly necessary for the Site to function as intended and does not require
        consent under the ePrivacy Directive.
      </p>
      <h3>2.2 Analytics / marketing cookies</h3>
      <p>
        <strong>We do not currently use any analytics, advertising, or marketing cookies.</strong>{' '}
        No first-party tracking scripts (e.g. Google Analytics, Meta Pixel, Hotjar) are loaded on
        this Site. If this changes in the future, we will update this policy and request your
        consent via the cookie banner before any such cookies are set.
      </p>
      <h3>2.3 Third-party cookies via embedded demos</h3>
      <p>
        Package detail pages may embed a live demo from a third-party domain (typically{' '}
        <code>*.github.io</code>) inside a sandboxed <code>&lt;iframe&gt;</code> with the{' '}
        <code>sandbox</code> attribute set to <code>allow-scripts allow-same-origin allow-forms
        allow-popups allow-popups-to-escape-sandbox</code>. These third-party pages may set their
        own cookies or use their own local storage, scoped to their own origin, governed entirely
        by their own cookie/privacy policies. We do not access, read, or control cookies set by
        embedded third-party content.
      </p>

      <h2>3. Cookie Table</h2>
      <ul>
        <li>
          <strong>Name:</strong> <code>asafarim-devtools-cookie-consent</code> ·{' '}
          <strong>Type:</strong> localStorage · <strong>Purpose:</strong> Remembers your cookie
          consent choice · <strong>Duration:</strong> Until cleared by you · <strong>Category:</strong>{' '}
          Strictly necessary
        </li>
      </ul>

      <h2>4. Managing Your Preferences</h2>
      <p>
        You can change your cookie preference at any time using the small cookie icon fixed at the
        bottom-left corner of the Site, which reopens the consent banner. You can also clear your
        choice at any time by clearing your browser&apos;s local storage for this Site, or by
        adjusting your browser&apos;s cookie/storage settings directly (most browsers let you
        block or delete storage per-site under Settings → Privacy).
      </p>

      <h2>5. Do Not Track</h2>
      <p>
        As we do not use tracking cookies, there is currently no behavioural tracking for the
        &quot;Do Not Track&quot; browser signal to disable. We respect the intent of this signal
        and will not introduce tracking without updating this policy and requesting fresh consent.
      </p>

      <h2>6. Changes to This Policy</h2>
      <p>
        We may update this Cookie Policy as the Site evolves. Any material change — such as the
        introduction of analytics — will be reflected here and will trigger a renewed consent
        prompt.
      </p>

      <h2>7. Contact</h2>
      <p>
        Questions about our use of cookies can be sent to{' '}
        <a href="mailto:privacy@asafarim.com">privacy@asafarim.com</a>. See also our{' '}
        <a href="/privacy-policy">Privacy Policy</a>.
      </p>
    </LegalPageLayout>
  )
}
