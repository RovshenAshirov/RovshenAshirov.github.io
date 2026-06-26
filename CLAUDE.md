# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — local dev server (Astro)
- `npm run build` — static build into `dist/`
- `npm run preview` — serve the built `dist/`

No tests, no linter configured.

## Deploy

Pushing to `dev` triggers `.github/workflows/deploy.yml`, which builds and force-pushes `dist/` to the `prod` branch (GitHub Pages serves from `prod`). `dev` is the working branch; never edit `prod` directly. Site is `https://rovshenashirov.github.io`.

## Architecture

Static Astro 4 portfolio site, output `static`, no UI framework — just `.astro` components plus vanilla JS/CSS served from `public/`.

**Multilingual via duplicated pages.** Four locales: `uz` (default, at `src/pages/index.astro`), and `en`/`ru`/`tr` under `src/pages/<lang>/index.astro`. Each page is an near-identical copy that imports its locale JSON from `src/i18n/<lang>.json` and passes it as the `t` prop to every component (`<Hero t={en}/>`). Components read all text via `t.section.key` — they hold no hardcoded copy. **Adding/changing content means editing the four JSON files in lockstep and, for structural changes, all four `index.astro` files.**

**Layout vs. assets.** `src/layouts/Layout.astro` is the single HTML shell (head, meta/OG/analytics, the full list of CSS `<link>`s and JS `<script is:inline>`s, loading screen). All CSS and JS live in `public/` (not bundled by Astro) and are referenced by absolute path:
- `public/css/sections/*.css` and `public/css/components/*.css` — one file per section/component, all manually linked in `Layout.astro`.
- `public/js/sections/*.js` and `public/js/components/*.js` — vanilla DOM scripts (theme toggle, typing animation, stats counters, language dropdown, modal, etc.), each manually listed in `Layout.astro`.

When you add a new section or component, you must wire it in three places: the `.astro` component, its CSS link in `Layout.astro`, and (if interactive) its JS script tag in `Layout.astro`.

JS scripts re-init on both `DOMContentLoaded` and `astro:page-load`, and guard against double-init (see `language.js`). Follow that pattern for new interactive scripts.

The `dist/` directory is committed but is build output — don't hand-edit it.