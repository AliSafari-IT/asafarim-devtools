import js from '@eslint/js'
import globals from 'globals'

/**
 * Minimal ESLint config for TypeScript 7 compatibility.
 *
 * eslint-config-next@16 bundles typescript-eslint which does not yet support
 * TypeScript 7 (tracked: https://github.com/typescript-eslint/typescript-eslint/issues/10940).
 * Type-checking is handled by `next build` via `experimental.useTypeScriptCli`.
 */
export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**'],
  },
]
