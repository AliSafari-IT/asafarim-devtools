import { ImageResponse } from 'next/og'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/seo'
import { PACKAGES } from '@/lib/packages'

export const alt = SITE_NAME
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 24,
              background: 'linear-gradient(135deg, #2563eb, #14b8a6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 48,
              fontWeight: 700,
            }}
          >
            A
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1 }}>{SITE_NAME}</span>
            <span style={{ fontSize: 24, color: '#94a3b8', marginTop: 6 }}>
              {PACKAGES.length}+ open-source @asafarim npm packages
            </span>
          </div>
        </div>
        <p style={{ fontSize: 28, color: '#cbd5e1', marginTop: 48, maxWidth: 900, lineHeight: 1.4 }}>
          {SITE_DESCRIPTION}
        </p>
      </div>
    ),
    { ...size }
  )
}
