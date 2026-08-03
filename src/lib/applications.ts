export interface ApplicationItem {
  id: string
  label: string
  href: string
  embedUrl: string
  activePathPrefix: string
  description?: string
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
