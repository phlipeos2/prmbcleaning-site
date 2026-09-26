# PRMB Cleaning — tooling evaluation

Date: 2026-09-25

## Executive decision

Development tooling protects execution quality; it does not create rankings by itself. For this small static site, the best return now is to keep the existing npm/GitHub/Lighthouse stack, actively use GitHub CLI and ripgrep, and add Playwright. The other evaluated tools would add migration or maintenance cost without creating more local relevance, reviews, citations, indexation or leads.

## Evaluation

| Tool | Current state | Benefit for PRMB | Cost / tradeoff | Decision |
|---|---|---|---|---|
| pnpm | Available locally as 11.19.0; official current line is 12 | Efficient shared package store and excellent monorepo workflows | Requires a new lockfile and CI change; this project has only two development dependencies and is not a monorepo | Keep npm. Reassess only if the repository becomes a multi-package application |
| GitHub CLI (`gh`) | Installed, 2.97.0, and authenticated | Fast inspection of Actions, commits, PRs and deployment failures; already used successfully | No project migration; authentication must remain protected | Keep and use operationally |
| ripgrep (`rg`) | Installed, 15.2.0 | Fast content/NAP/schema/link audits that respect `.gitignore`; already found every legacy phone occurrence | No meaningful downside | Keep as the standard search tool |
| fd | Not installed | Faster, friendlier filename discovery than traditional `find` | Mostly overlaps with `rg --files` and PowerShell for this small repository | Do not install now |
| jq | Not installed | Excellent for filtering Lighthouse, API and Search Console JSON | Node.js and PowerShell `ConvertFrom-Json` already cover current scripts | Do not install now; add if JSON-heavy API automation begins |
| Docker / containers | Docker Desktop is installed; no container is required by the project | Reproducible Linux environment and possible future local CI parity | Startup, image downloads, storage and maintenance; no direct SEO benefit for a static Cloudflare Pages site | Keep optional; use GitHub Actions' Linux runner instead |
| OrbStack | Designed as a lightweight Docker/Linux alternative centered on macOS, native Swift and Apple Silicon; commercial plan is $8/user/month annually | Very good Mac container ergonomics | Not the right fit for the current Windows workstation, and containers are not currently needed | Do not adopt |
| Biome | Not installed | Fast formatter/linter for JS, TS, JSON, HTML and CSS | The site is mostly hand-authored static HTML with established formatting; automatic formatting could create large diffs without ranking benefit | Defer until the JavaScript/CSS surface grows materially |
| Playwright | Added at 1.63.0 | Real-browser checks for all important pages on desktop/mobile; protects phone, canonical, H1, 404, JavaScript and responsive overflow | Adds three packages, a Chromium install in CI and roughly 20 seconds of local browser tests | Adopted now |

## Implemented safeguards

- 18 Playwright tests: eight indexable routes plus the missing-page test, in desktop and mobile profiles.
- The CI workflow installs Chromium, runs Playwright and stores the HTML report.
- Static validation now requires the confirmed phone link `tel:+13853149098` on every routed page.
- Static validation fails if the legacy phone is reintroduced into deployable pages or `llms.txt`.
- The existing Lighthouse gates remain in place for SEO, accessibility, best practices and performance.

## Sources

- pnpm: https://pnpm.io/ and https://pnpm.io/installation/
- GitHub CLI manual: https://cli.github.com/manual/
- ripgrep: https://github.com/BurntSushi/ripgrep
- fd: https://github.com/sharkdp/fd
- jq: https://jqlang.org/
- OrbStack: https://orbstack.dev/ and https://orbstack.dev/pricing
- Biome: https://biomejs.dev/
- Playwright: https://playwright.dev/ and https://playwright.dev/docs/ci
