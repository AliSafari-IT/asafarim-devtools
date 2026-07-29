<p align="center">
  <img src="public/logo.svg" alt="ASafariM DevTools" width="640" />
</p>

# ASafariM DevTools

Interactive showcase for all npm packages published under the [**@asafarim**](https://www.npmjs.com/~asafarim.be) scope — live demos, install commands, and documentation links in one place.

**Live:** https://asafarim.be

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router, standalone output) + [React 19](https://react.dev) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [pnpm](https://pnpm.io) 11.2.2
- Docker (production, behind Caddy with automatic HTTPS)

## Getting Started

```powershell
pnpm install
pnpm dev
```

Or simply:

```powershell
.\run.ps1
```

Open http://localhost:3000.

### Scripts

| Command          | Description              |
| ---------------- | ------------------------ |
| `pnpm dev`       | Start dev server         |
| `pnpm build`     | Production build         |
| `pnpm start`     | Start production server  |
| `pnpm lint`      | Type-check (`tsc`)       |
| `pnpm typecheck` | Type-check (`tsc`)       |

## Project Structure

```
src/
  app/
    page.tsx            # Home: hero, stats, package grid by category
    layout.tsx          # Root layout + sidebar
    icon.svg            # Favicon (Next.js file convention)
    packages/[slug]/    # Per-package demo pages
  components/
    Sidebar.tsx         # Search + category navigation
    PackageDemoFrame.tsx
    CopyButton.tsx
  lib/
    packages.ts         # PACKAGES / CATEGORIES registry (single source of truth)
public/
  logo.svg              # Full lockup (icon + wordmark)
  logo-icon.svg         # Icon badge
```

**Adding a package:** append an entry to `PACKAGES` in `src/lib/packages.ts` — it appears in the sidebar and home grid automatically.

## Deployment

The site runs in Docker on the same VPS as [asafarim.com](https://asafarim.com), routed by a shared Caddy reverse proxy (`asafarim.be → devtools:3000`) with automatic Let's Encrypt TLS.

Redeploy with a single command (requires `ssh vps` access):

```powershell
.\redeploy.ps1
```

This archives the repo, uploads it to `/var/repos/asafarim-devtools` on the VPS, rebuilds the Docker image, restarts the container, and verifies both sites respond.

## Links

- Website: https://asafarim.com
- npm: https://www.npmjs.com/~asafarim.be
- GitHub: https://github.com/AliSafari-IT
