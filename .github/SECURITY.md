# Security Policy

Thank you for helping keep **ASafariM DevTools** (https://asafarim.be) and its users safe. This
document describes which versions receive security updates, how to report a vulnerability, and
what to expect from us in response.

## Supported Versions

This repository powers a single production website (no published npm package, no versioned
releases). Only the code currently deployed on the `main` branch is supported with security
fixes.

| Branch / Deployment        | Supported          |
| --------------------------- | ------------------- |
| `main` (production, latest) | :white_check_mark:  |
| Older commits / forks       | :x:                 |

If you are looking to report a vulnerability in one of the individual `@asafarim` npm packages
listed on this site (e.g. `@asafarim/dd-menu`, `@asafarim/react-themes`, etc.), please report it
directly on that package's own GitHub repository, linked from its detail page on
https://asafarim.be. Each package is maintained and versioned independently.

## Scope

**In scope:**

- The Next.js application in this repository (`src/`, `public/`, build/deploy configuration)
- The production deployment at https://asafarim.be
- CI/CD workflows in `.github/workflows/`
- The `Dockerfile` and container image built from it

**Out of scope:**

- Third-party demo pages embedded via `<iframe>` on package detail pages (hosted on
  `*.github.io` and other third-party domains) — please report those issues to the respective
  package repository instead
- The individual `@asafarim` npm packages themselves (see above)
- Vulnerabilities in upstream dependencies (Next.js, React, etc.) that are not exploitable
  through this application specifically — please report those upstream, though we appreciate
  being made aware so we can update promptly
- Denial-of-service reports based purely on volumetric load testing
- Social engineering, physical security, or attacks requiring physical access to a maintainer's
  device
- Missing security headers or best-practice hardening suggestions with no demonstrated
  exploitability (please open a normal GitHub issue for these instead)

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues, discussions, or
pull requests.**

Instead, report privately using one of the following channels, in order of preference:

1. **GitHub Private Vulnerability Reporting** (preferred): open the
   [Security tab](https://github.com/AliSafari-IT/asafarim-devtools/security/advisories/new) of
   this repository and click **"Report a vulnerability"**. This creates a private advisory
   visible only to the maintainer.
2. **Email**: send details to **security@asafarim.com**. If possible, encrypt sensitive details
   or avoid including live exploit payloads in plain text.

Please include as much of the following as you can:

- A clear description of the vulnerability and its potential impact
- Steps to reproduce, including affected URL(s), request/response samples, or a proof-of-concept
- The version/commit hash or approximate date you tested against
- Any suggested mitigation, if known

### What to Expect

| Stage                        | Timeline                                   |
| ----------------------------- | ------------------------------------------ |
| Acknowledgement of report     | Within **3 business days**                 |
| Initial triage & severity     | Within **7 business days**                 |
| Fix or mitigation deployed    | Depends on severity — critical issues are prioritized and typically addressed within **7–14 days**; lower-severity issues within **30–90 days** |
| Public disclosure             | Coordinated with the reporter after a fix is deployed |

We follow a **coordinated disclosure** approach: we ask that you give us a reasonable opportunity
to investigate and remediate an issue before any public disclosure, and we commit to keeping you
updated on progress throughout the process. We are happy to credit reporters (by name, handle, or
anonymously, your choice) in the release notes or this document once a fix is public, unless you
prefer not to be credited.

## Security Measures in Place

- **CodeQL static analysis** runs automatically on pushes and pull requests via
  [`.github/workflows/codeql.yml`](./workflows/codeql.yml) to catch common vulnerability patterns
  before they reach production.
- **Dependabot** is configured (see [`.github/dependabot.yml`](./dependabot.yml)) to open pull
  requests for security updates to npm dependencies and GitHub Actions on a weekly basis.
- **No user accounts, authentication, or payment processing** exist on this site, which
  significantly limits the attack surface — there is no database of user credentials or
  financial data to compromise.
- **Third-party demo content is sandboxed**: embedded `<iframe>` demos use a restrictive
  `sandbox` attribute, isolating third-party code from the parent page.
- **Automatic HTTPS/TLS** is enforced in production via a Caddy reverse proxy with Let's
  Encrypt-issued certificates; the production Docker image runs as a non-root user
  (`nextjs`, see `Dockerfile`).
- Dependency versions are pinned in `package.json` and reviewed before merging.

## Contact

For anything not covered above, reach out via:

- Email: **security@asafarim.com**
- GitHub: [@AliSafari-IT](https://github.com/AliSafari-IT)

See also our [Privacy Policy](https://asafarim.be/privacy-policy) and
[Terms of Use](https://asafarim.be/terms).
