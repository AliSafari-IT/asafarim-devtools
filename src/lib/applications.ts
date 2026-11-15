export interface ApplicationItem {
  id: string
  label: string
  href: string
  embedUrl: string
  activePathPrefix: string
  description?: string
  npmUrl?: string
  instructions?: string[]
  githubUrl?: string
}

export interface ApplicationGroup {
  id: string
  label: string
  icon: string
  items: ApplicationItem[]
}

export const APPLICATION_GROUPS: ApplicationGroup[] = [
  {
    id: 'applications',
    label: 'Applications',
    icon: '🚀',
    items: [
      {
        id: 'qr-studio',
        label: 'QR Studio',
        href: '/applications/qr-studio',
        embedUrl: 'https://alisafari-it.github.io/asafarim-qr-studio/',
        activePathPrefix: '/applications/qr-studio',
        description: 'Create branded QR codes with logos, custom layouts and PNG/SVG downloads.',
        githubUrl: 'https://github.com/AliSafari-IT/asafarim-qr-studio',
        npmUrl: 'https://www.npmjs.com/package/@asafarim/qr-studio',
        instructions: ['Enter a web address and choose Create QR code.', 'Optionally upload a logo, add a brand name, and adjust the layout.', 'Choose a file name, color and resolution, then download PNG or SVG.'],
      },
      {
        id: 'logo-normalizer',
        label: 'Logo Normalizer',
        href: '/applications/logo-normalizer',
        embedUrl: '/apps/logo-normalizer',
        activePathPrefix: '/applications/logo-normalizer',
        description: 'Normalize and optimize logo images',
        githubUrl: 'https://github.com/AliSafari-IT/logo-normalizer',
      },
    ],
  },
]

export const APPLICATIONS: ApplicationItem[] = APPLICATION_GROUPS.flatMap(g => g.items)
