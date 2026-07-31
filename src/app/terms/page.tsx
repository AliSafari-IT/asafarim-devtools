import type { Metadata } from 'next'
import LegalPageLayout from '@/components/LegalPageLayout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const LAST_UPDATED = '2026-08-01'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: `Terms and conditions governing your use of ${SITE_NAME}.`,
  alternates: { canonical: `${SITE_URL}/terms` },
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Use" lastUpdated={LAST_UPDATED}>
      <p>
        Welcome to <strong>{SITE_NAME}</strong> (&quot;the Site&quot;), available at{' '}
        <a href={SITE_URL}>{SITE_URL}</a>, operated by Ali Safari / ASafariM (&quot;we&quot;,
        &quot;us&quot;, &quot;our&quot;). By accessing or using this Site, you agree to be bound
        by these Terms of Use. If you do not agree, please do not use the Site.
      </p>

      <h2>1. Purpose of the Site</h2>
      <p>
        {SITE_NAME} is an informational catalogue of open-source npm packages published under the{' '}
        <code>@asafarim</code> scope. It provides package descriptions, install commands, links to
        npm and GitHub, and embedded live demo pages for illustrative purposes.
      </p>

      <h2>2. Intellectual Property</h2>
      <p>
        The Site&apos;s design, layout, logo, and original written content are owned by ASafariM
        and protected by copyright. The individual npm packages referenced on this Site are
        separate open-source projects, each governed by their own license (typically MIT, as
        published on their respective npm and GitHub pages). Nothing in these Terms grants you
        any rights to ASafariM trademarks beyond fair, descriptive use.
      </p>

      <h2>3. Use of the Site</h2>
      <p>You agree to use the Site only for lawful purposes. You must not:</p>
      <ul>
        <li>Attempt to gain unauthorised access to the Site, its infrastructure, or related systems</li>
        <li>Use automated means to scrape or overload the Site in a way that disrupts its availability</li>
        <li>Use the Site to distribute malware or engage in unlawful activity</li>
        <li>Misrepresent your affiliation with ASafariM or the listed packages</li>
      </ul>

      <h2>4. Third-Party Links and Embedded Content</h2>
      <p>
        The Site contains links to third-party websites (npm, GitHub, <code>asafarim.com</code>)
        and embeds third-party demo pages (typically hosted on <code>*.github.io</code>) inside
        sandboxed iframes for convenience. We do not control, endorse, or assume responsibility
        for the content, availability, security, or privacy practices of these third-party sites.
        Access to and use of any third-party site is at your own risk and subject to that site&apos;s
        own terms and policies.
      </p>

      <h2>5. No Warranty</h2>
      <p>
        The Site and all package information are provided <strong>&quot;as is&quot;</strong> and
        <strong> &quot;as available&quot;</strong>, without warranties of any kind, express or
        implied, including but not limited to accuracy, completeness, fitness for a particular
        purpose, or non-infringement. Package versions, descriptions, and demo availability may
        change without notice and may not always reflect the latest published state on npm or
        GitHub.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by applicable law, ASafariM shall not be liable for any
        indirect, incidental, special, consequential, or punitive damages, or any loss of data,
        use, goodwill, or other intangible losses, arising out of or related to your access to or
        use of (or inability to access or use) the Site, including any content obtained from
        third-party links or embedded demos.
      </p>

      <h2>7. Open-Source Software Disclaimer</h2>
      <p>
        The npm packages catalogued on this Site are distributed as open-source software under
        their own respective licenses (see each package&apos;s GitHub repository for exact license
        terms). Use of any such package in your own projects is governed by that package&apos;s
        license, not by these Terms.
      </p>

      <h2>8. Changes to the Site and These Terms</h2>
      <p>
        We may modify, suspend, or discontinue any part of the Site at any time. We may also
        revise these Terms from time to time; continued use of the Site after changes take effect
        constitutes acceptance of the revised Terms. The &quot;Last updated&quot; date above
        reflects the most recent revision.
      </p>

      <h2>9. Governing Law</h2>
      <p>
        These Terms are governed by the laws of Belgium, without regard to conflict-of-law
        principles. Any disputes arising from these Terms or your use of the Site shall be subject
        to the exclusive jurisdiction of the competent courts of Belgium, unless mandatory
        consumer-protection law provides otherwise.
      </p>

      <h2>10. Severability</h2>
      <p>
        If any provision of these Terms is found to be unenforceable, the remaining provisions
        will remain in full force and effect.
      </p>

      <h2>11. Contact</h2>
      <p>
        Questions about these Terms can be sent to{' '}
        <a href="mailto:legal@asafarim.com">legal@asafarim.com</a> or via{' '}
        <a href="https://github.com/AliSafari-IT" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        . See also our <a href="/privacy-policy">Privacy Policy</a> and{' '}
        <a href="/cookie-policy">Cookie Policy</a>.
      </p>
    </LegalPageLayout>
  )
}
