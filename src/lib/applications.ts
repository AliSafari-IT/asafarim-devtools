export interface ApplicationItem {
  id: string
  label: string
  href: string
  activePathPrefix: string
  description?: string
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
        href: '/apps/logo-normalizer',
        activePathPrefix: '/apps/logo-normalizer',
        description: 'Normalize and optimize logo images',
      },
    ],
  },
]
