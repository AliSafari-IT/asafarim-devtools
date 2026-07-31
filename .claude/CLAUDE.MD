# ASafariM DevTools — Project Context

## Overview
Showcase/hub app presenting interactive demos for all npm packages published under the `@asafarim` scope.
Production: https://asafarim.be

## Stack
- **Next.js 16** (App Router, `output: 'standalone'`), **React 19**, **TypeScript**
- **Tailwind CSS 4** (via `@tailwindcss/postcss`), dark theme only (`<html className="dark">`)
- **pnpm 11.2.2** (pinned; lockfileVersion 9.0)
- Node 22 (Docker: `node:22-alpine`)

## Structure
- `src/app/page.tsx` — home: top bar, hero, stats, package grid grouped by category
- `src/app/packages/[slug]/` — per-package demo pages
- `src/app/layout.tsx` — root layout with `Sidebar`; `src/app/icon.svg` — favicon (Next.js convention, do NOT override via metadata icons)
- `src/components/Sidebar.tsx` — package navigation with search + collapsible categories
- `src/lib/packages.ts` — single source of truth: `PACKAGES`, `CATEGORIES`, `CATEGORY_COLORS`
- `public/logo.svg`, `public/logo-icon.svg` — brand assets

## Commands
- `pnpm dev` — dev server (`run.ps1` wraps this)
- `pnpm build` / `pnpm start` — production
- `pnpm lint` / `pnpm typecheck` — both run `tsc --noEmit`

## Conventions
- Adding a package = append entry to `PACKAGES` in `src/lib/packages.ts`; category must exist in `CATEGORIES`
- Styling: Tailwind utility classes, slate palette, accent colors per category from `CATEGORY_COLORS`
- Brand accents: teal `#2dd4bf`, sky `#38bdf8`, amber `#fbbf24`
- Use plain `<img>` for SVG assets (no `next/image` import needed)

## Deployment (VPS via `ssh vps`)
- VPS reachable passwordless as `vps`; IPv4 82.25.116.73 serves both asafarim.com and asafarim.be
- App deploys from this repo to `/var/repos/asafarim-devtools`; compose project/container `asafarim-devtools`, internal port 3200
- All apps share Docker network `asafarim-com_asafarim_net`; Caddy container (`asafarim-com-caddy-1`) terminates TLS and routes per domain
- Caddyfile: `/var/repos/asafarim-com/infra/caddy/Caddyfile` (backup `Caddyfile.bak`); reload zero-downtime:
  `docker exec asafarim-com-caddy-1 caddy reload --config /etc/caddy/Caddyfile`
- **Use `redeploy.ps1` in repo root for full redeploys** (archive → scp → remote build → prune → verify)
- Disk hygiene: build cache is the main disk consumer; `redeploy.ps1` prunes this project's dangling images + cache older than 7 days after every build. Manual reclaim: `ssh vps "docker builder prune -f"` (safe, only unused cache)

## Hard constraints
- **NEVER touch `F:\repos\asafarim-platform`** (the asafarim.com repo) — no reads for edits, no modifications
- On the VPS, only *additive* changes to shared infra (Caddyfile); never restart/remove `asafarim-com-*` containers
- `pnpm-workspace.yaml` must keep `allowBuilds` entries set to `true` — pnpm 11 Docker builds fail otherwise (`ERR_PNPM_IGNORED_BUILDS`)
