# Repository Guidelines

This project is a Next.js 15 + TypeScript blog/site. Use the conventions below to keep contributions consistent and easy to review.

## Project Structure & Module Organization
- `src/app`: App Router routes and pages; articles live under `article/YYYY-MM/...` with local images beside each `.mdx`.
- `src/modules`: Feature modules (e.g., `article`, `layout`, `color-mode`).
- `src/components`: Reusable UI components.
- `src/common`: Global styles and shared config (`globals.css`, `config.ts`).
- `public`: Static assets; prefer route‑local assets near content when possible.
- `.github/workflows`: CI running tests on pull requests.

## Build, Test, and Development Commands
- `pnpm i`: Install dependencies.
- `pnpm dev`: Run Next dev server.
- `pnpm build`: Production build. Sitemap/robots via Next routes.
- `pnpm start`: Start the built app.
- `pnpm test` / `pnpm test:ci`: Run Vitest (happy‑dom env).
- `pnpm lint` / `pnpm type-check`: Lint with ESLint and check types with `tsc`.
- `pnpm analyze`: Build with bundle analyzer. `pnpm knip`: detect unused code/exports.

## Coding Style & Naming Conventions
- TypeScript strict; format via Prettier (2‑space indent, semicolons, double quotes, trailing commas, LF EOL).
- Path aliases: `@app`, `@modules`, `@components`, `@common` (see `tsconfig.json`).
- Components: PascalCase filenames (`Button.tsx`); CSS modules as `*.module.css`; MDX files kebab‑case inside dated folders.
- ESLint rules: interfaces start with `I` (e.g., `IUser`); prefer type‑only imports; exhaustive `switch` checks; JSX lists must have keys.

## Testing Guidelines
- Framework: Vitest with `happy-dom` (see `vitest.config.ts`).
- Location: co‑locate `*.test.ts(x)` with source (e.g., `src/sample.test.ts`).
- Run locally: `pnpm test`; CI uses `pnpm test:ci`.
- Coverage: no hard threshold yet—add meaningful tests for utilities, components, and edge cases.

## Commit & Pull Request Guidelines
- Messages: concise, present tense. English or Korean are both used; Conventional prefixes (`feat:`, `fix:`, `chore:`) encouraged. Optional scope: `feat(article): ...`.
- PRs must: describe intent, link issues (`Closes #123`), include before/after screenshots for UI changes, and pass `pnpm lint`, `pnpm type-check`, and tests.

## Security & Configuration
- Copy `.env.example` → `.env` (managed with `direnv`). Never commit secrets.
- Client‑exposed values must use `NEXT_PUBLIC_*` (e.g., `NEXT_PUBLIC_SITE_URL=https://example.com`).
