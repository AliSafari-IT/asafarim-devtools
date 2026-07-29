import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'ASafariM DevTools',
  description: 'Interactive demos for all @asafarim npm packages',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100`}
        style={{ height: '100dvh', display: 'flex', overflow: 'hidden' }}
      >
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden min-w-0">
          {children}
        </div>
      </body>
    </html>
  )
}
