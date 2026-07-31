export const SITE_URL = 'https://asafarim.be'
export const SITE_NAME = 'ASafariM DevTools'
export const SITE_DESCRIPTION =
  'Interactive live demos, documentation, and install instructions for every npm package published under the @asafarim scope.'
export const SITE_KEYWORDS = [
  'asafarim',
  'npm packages',
  'react components',
  'devtools',
  'open source',
  'typescript',
  'ui components',
  'design tokens',
  'developer tools',
]
export const ORG_NAME = 'ASafariM'
export const ORG_AUTHOR = 'Ali Safari'
export const TWITTER_HANDLE = '@asafarim'

export const SAME_AS = [
  'https://asafarim.com',
  'https://github.com/AliSafari-IT',
  'https://www.npmjs.com/~asafarim.be',
]

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString()
}
