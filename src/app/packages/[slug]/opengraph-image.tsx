import { ImageResponse } from 'next/og'
import { PACKAGES } from '@/lib/packages'
import { SITE_NAME } from '@/lib/seo'

export const alt = 'Package preview'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pkg = PACKAGES.find(p => p.slug === slug)
  return [
    {
      id: 'default',
      alt: pkg ? `${pkg.name} — ${SITE_NAME}` : SITE_NAME,
      size,
      contentType,
    },
  ]
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pkg = PACKAGES.find(p => p.slug === slug)
  const name = pkg?.name ?? SITE_NAME
  const description = pkg?.description ?? ''
  const category = pkg?.category ?? ''
  const version = pkg?.version ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0b1026 0%, #111a3d 55%, #0b1026 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              fontSize: 22,
              color: '#93c5fd',
              background: 'rgba(37,99,235,0.15)',
              padding: '6px 16px',
              borderRadius: 999,
            }}
          >
            {category}
          </span>
          {version && (
            <span style={{ fontSize: 22, color: '#94a3b8' }}>v{version}</span>
          )}
        </div>
        <span style={{ fontSize: 52, fontWeight: 700, marginTop: 24, letterSpacing: -1 }}>
          {name}
        </span>
        <p style={{ fontSize: 26, color: '#cbd5e1', marginTop: 24, maxWidth: 950, lineHeight: 1.5 }}>
          {description}
        </p>
        <span style={{ fontSize: 22, color: '#64748b', marginTop: 'auto' }}>{SITE_NAME}</span>
      </div>
    ),
    { ...size }
  )
}
