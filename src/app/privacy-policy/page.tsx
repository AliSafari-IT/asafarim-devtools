import type { Metadata } from 'next'
import LegalPageLayout from '@/components/LegalPageLayout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const LAST_UPDATED = '2026-08-01'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${SITE_NAME} collects, uses, and protects your data, in compliance with the EU General Data Protection Regulation (GDPR).`,
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
  robots: { index: true, follow: true },
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <p>
        This Privacy Policy explains how <strong>ASafariM</strong> (&quot;we&quot;, &quot;us&quot;,
        &quot;our&quot;) handles information in connection with your use of{' '}
        <strong>{SITE_NAME}</strong>, available at{' '}
        <a href={SITE_URL}>{SITE_URL}</a> (the &quot;Site&quot;). This policy is written to comply
        with the EU General Data Protection Regulation (GDPR) 2016/679 and Belgian data protection
        law.
      </p>

      <h2>1. Data Controller</h2>
      <p>
        The data controller responsible for this Site is Ali Safari, operating as ASafariM,
        based in Belgium. For any privacy-related questions or requests, contact us at{' '}
        <a href="mailto:privacy@asafarim.com">privacy@asafarim.com</a>.
      </p>

      <h2>2. What This Site Does</h2>
      <p>
        {SITE_NAME} is a static catalogue and documentation site listing open-source npm packages
        published under the <code>@asafarim</code> scope. It does not require account creation,
        does not collect payment information, and does not include any contact or sign-up forms.
      </p>

      <h2>3. Information We Collect</h2>
      <h3>3.1 Information you provide</h3>
      <p>
        We do not operate any forms, newsletters, or account systems on this Site, so we do not
        directly collect names, email addresses, or other personal details from you through the
        Site itself.
      </p>
      <h3>3.2 Information collected automatically</h3>
      <p>
        Like most websites, our hosting infrastructure and content delivery network may
        automatically log limited technical data for security and reliability purposes, such as:
      </p>
      <ul>
        <li>IP address (used transiently for request routing and abuse prevention)</li>
        <li>Browser type, operating system, and device information</li>
        <li>Pages visited, referring URL, and timestamps</li>
      </ul>
      <p>
        We do not use this data for profiling, advertising, or first-party analytics. We do not
        currently run any analytics, advertising, or tracking scripts (e.g. Google Analytics,
        Meta Pixel) on this Site.
      </p>
      <h3>3.3 Local storage / cookie preference</h3>
      <p>
        We store a single preference in your browser&apos;s local storage to remember your cookie
        consent choice. See our <a href="/cookie-policy">Cookie Policy</a> for full details.
      </p>

      <h2>4. Third-Party Embedded Demos</h2>
      <p>
        Package detail pages may embed a live demo hosted on a third-party domain (typically
        GitHub Pages, <code>*.github.io</code>) inside a sandboxed <code>&lt;iframe&gt;</code>.
        When you view such a demo, your browser makes a direct request to that third-party
        server, which operates under its own privacy policy and may set its own cookies or
        collect its own usage data. We do not control and are not responsible for the privacy
        practices of these third-party sites. External links to npm, GitHub, and{' '}
        <a href="https://asafarim.com" target="_blank" rel="noopener noreferrer">
          asafarim.com
        </a>{' '}
        are provided for convenience and are likewise governed by their own privacy policies.
      </p>

      <h2>5. Legal Basis for Processing (GDPR Art. 6)</h2>
      <p>
        Where any personal data is processed (e.g. minimal technical logs), our legal basis is our
        <strong> legitimate interest</strong> in operating, securing, and maintaining the Site
        (Art. 6(1)(f) GDPR). Where you provide consent for optional storage (see Cookie Policy),
        our legal basis is your <strong>consent</strong> (Art. 6(1)(a) GDPR).
      </p>

      <h2>6. Data Retention</h2>
      <p>
        Technical hosting logs are retained only as long as necessary for security and operational
        purposes, typically no longer than 30 days, and are then deleted or anonymised. Your
        cookie consent preference remains in your browser&apos;s local storage until you clear
        your browser data or withdraw consent.
      </p>

      <h2>7. Data Sharing</h2>
      <p>
        We do not sell, rent, or trade personal data. We use third-party infrastructure providers
        (hosting, DNS, and TLS/reverse proxy services) solely to operate the Site; these providers
        may process technical data strictly as data processors on our behalf.
      </p>

      <h2>8. International Data Transfers</h2>
      <p>
        Our hosting infrastructure is located within the European Union. Where a third-party demo
        or link directs you outside the Site, that destination may be located in a different
        jurisdiction and is governed by its own privacy practices.
      </p>

      <h2>9. Your Rights Under GDPR</h2>
      <p>If you are located in the European Economic Area, you have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Request rectification of inaccurate data</li>
        <li>Request erasure of your data (&quot;right to be forgotten&quot;)</li>
        <li>Restrict or object to processing</li>
        <li>Request data portability</li>
        <li>Withdraw consent at any time (without affecting prior lawful processing)</li>
        <li>
          Lodge a complaint with your national supervisory authority — in Belgium, the{' '}
          <a
            href="https://www.gegevensbeschermingsautoriteit.be"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gegevensbeschermingsautoriteit / Autorité de protection des données (APD)
          </a>
        </li>
      </ul>
      <p>
        To exercise any of these rights, contact us at{' '}
        <a href="mailto:privacy@asafarim.com">privacy@asafarim.com</a>.
      </p>

      <h2>10. Children&apos;s Privacy</h2>
      <p>
        This Site is not directed at children under 16 and we do not knowingly collect personal
        data from children.
      </p>

      <h2>11. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Material changes will be reflected by
        updating the &quot;Last updated&quot; date at the top of this page.
      </p>

      <h2>12. Contact</h2>
      <p>
        Questions about this Privacy Policy can be sent to{' '}
        <a href="mailto:privacy@asafarim.com">privacy@asafarim.com</a> or via{' '}
        <a href="https://github.com/AliSafari-IT" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        .
      </p>
    </LegalPageLayout>
  )
}
