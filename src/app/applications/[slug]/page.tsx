import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { APPLICATIONS } from '@/lib/applications'
import AppFrame from '@/components/AppFrame'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return APPLICATIONS.map(app => ({ slug: app.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const app = APPLICATIONS.find(a => a.id === slug)
  if (!app) return {}

  const url = `${SITE_URL}/applications/${app.id}`
  const title = app.label
  const description = app.description || title

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: `${title} — ${SITE_NAME}`,
      description,
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — ${SITE_NAME}`,
      description,
    },
  }
}

export default async function ApplicationPage({ params }: Props) {
  const { slug } = await params
  const app = APPLICATIONS.find(a => a.id === slug)
  if (!app) notFound()

  const appJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: app.label,
    description: app.description,
    url: `${SITE_URL}/applications/${app.id}`,
    applicationCategory: 'Utilities',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      {/* Page header */}
      <div className="shrink-0 bg-slate-900/95 backdrop-blur border-b border-slate-700/50 px-4 pl-12 md:pl-5 md:px-5 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              <h1 className="text-xs sm:text-sm font-semibold text-white font-mono leading-tight">
                {app.label}
              </h1>
              <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300">
                Application
              </span>
            </div>
            {app.description && (
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed line-clamp-2">
                {app.description}
              </p>
            )}
          </div>

          {/* Action links */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {app.githubUrl && (
              <a
                href={app.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2 py-1 text-xs bg-slate-700/50 hover:bg-slate-700 text-slate-200 border border-slate-600/50 rounded transition-colors"
              >
                <span>GitHub</span>
                <span>↗</span>
              </a>
            )}
            <a
              href={app.embedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 text-xs bg-emerald-900/30 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-800/50 rounded transition-colors"
            >
              <span>Open standalone</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* App iframe — fills remaining height */}
      <div className="flex-1 overflow-hidden">
        <AppFrame app={app} />
      </div>
    </div>
  )
}
