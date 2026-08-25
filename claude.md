# ASafariM DevTools — Workspace Instructions

## Overview

This repository is the ASafariM DevTools showcase for npm packages published under the `@asafarim` scope.

## Stack

- Next.js App Router with React and TypeScript
- Tailwind CSS 4
- pnpm 11.18.0
- Node.js 22 for production builds

## Structure

- `src/app/page.tsx` — home page and package grid
- `src/app/packages/[slug]/` — package detail pages
- `src/components/Sidebar.tsx` — package search and navigation
- `src/lib/packages.ts` — single source of truth for package metadata
- `public/` — static brand assets

## Commands

- `pnpm dev` — start the development server on port 3200
- `pnpm build` — create a production build
- `pnpm start` — start the production server on port 3200
- `pnpm lint` — run the TypeScript check
- `pnpm typecheck` — run the TypeScript check

## Package Registry Convention

To add a package, append a `PackageMeta` entry to `PACKAGES` in `src/lib/packages.ts`. Use an existing category from `CATEGORIES`; package entries automatically appear in the sidebar and home page.

Keep package metadata synchronized with npm. Include the package name, current version, description, npm URL, verified GitHub repository URL, relevant demo URL when available, keywords, and the correct install command.

## Coding Conventions

- Use TypeScript and existing React/Next.js patterns.
- Reuse existing components and styling conventions before adding abstractions.
- Keep changes focused on the requested task.
- Do not expose secrets or add credentials to the repository.
- Preserve the `allowBuilds` entries in `pnpm-workspace.yaml`.
- Do not modify `F:\repos\asafarim-platform`.

## Deployment

Use `redeploy.ps1` for the repository's full VPS deployment workflow. Do not restart or remove shared `asafarim-com-*` containers.
