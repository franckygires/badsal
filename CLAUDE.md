# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A **design system + Agent Skill** for **Badsal & Fils Okikiola**, a French-language B2B import–export company in Cotonou, Bénin. The repo root is a collection of CSS tokens, React component sources, and self-contained HTML previews (`*.dc.html`) meant to be read by an agent and copied into downstream artifacts.

The **production website** built from this design lives in [site/](site/) — an **Astro** static site (FR default + EN, Mandarin-ready), with content sourced from [contenu.md](contenu.md). See [site/README.md](site/README.md) for how to run/build/deploy and what the business still needs to provide (Web3Forms key, real images). The `.dc.html` mockups remain the visual reference; the Astro app ports them faithfully. **Gotcha:** never access a property literally named `export`/`import` in Astro frontmatter (`t.nav.export`) — the compiler corrupts the output; use non-reserved keys.

The skill is defined in [SKILL.md](SKILL.md) (`user-invocable: true`). When invoked without specifics, ask what the user wants to build, then act as a brand designer producing either throwaway static HTML artifacts (link `styles.css` for tokens) or production code.

## Brand non-negotiables

Read [readme.md](readme.md) for the full spec. The rules most often gotten wrong:

- **Language is French**, formal "vous". Keep domain terms in form (Incoterms, RCCM, IFU). **No emoji, ever.**
- **Colors:** institutional dark green `#1B4332` (authority — headers, hero, footer) + dark gold `#B8860B` (accent only — CTA borders, eyebrows, underlines; never large fills). Off-white page `#FAFAF8`, white surfaces.
- **Type:** Playfair Display (serif) for headings + wordmark; Inter (sans) for everything else.
- **Section signature motif:** every section opens gold eyebrow → serif title → a fixed **56×3px gold underline bar**.
- Primary CTA is **"Demander un devis"**; fast channels are **WhatsApp + WeChat** (which keep their own brand greens). Surface trust signals (RCCM, IFU) prominently in tabular figures.

## Structure & conventions

- **`styles.css`** — the single entry point consumers link; it only `@import`s the five token files. **Always reference tokens via CSS variables** (`var(--color-primary)`, `var(--space-8)`, `var(--radius-md)`, `var(--dur-base)`), not hardcoded hex/px, in component and artifact code.
- **`tokens/`** — `colors.css`, `typography.css`, `spacing.css` (4px grid; `--container-max: 1140px`; `--section-pad-y: 80px`), `effects.css` (radii, shadows, `--ease-standard`/`--dur-base` motion), `fonts.css` (Google Fonts import).
- **`guidelines/`** — foundation specimen cards (Colors, Type, Spacing, Effects).
- **`components/<group>/`** — each component ships four files: `<Name>.jsx` (inline-style React, no CSS modules), `<Name>.d.ts` (typed props + JSDoc), `<Name>.prompt.md` (one-line usage + example), and `<name>.card.html` (preview). Groups: `buttons`, `contact`, `cards`, `navigation`, `feedback`, `layout`.
- **`ui_kits/website/`** — full Homepage composition, both as static `index.html` and as `Homepage.jsx` built from the real components.

### HTML preview formats — two distinct kinds

- **`*.card.html`** (components & guidelines) — self-contained previews that `<link>` `styles.css`. First line is a directive comment: `<!-- @dsCard group="..." viewport="WxH" name="..." subtitle="..." -->`. These populate the Design System tab. The `.d.ts` `@startingPoint` / `@dsCard` annotations drive that gallery — keep them in sync when editing a component.
- **`*.dc.html`** (top-level pages: `Homepage`, `Contact`, `Vision`, `Importation`, `Exportation`, `QuiSommesNous`) — full-page "Design Component" mockups rendered by **`support.js`**. They use a `<x-dc>` root with a `<helmet>` block (fonts/global CSS), a fixed `1440px` canvas, and **fully inlined hardcoded styles** (not token vars). These are the high-fidelity page comps.

**`support.js` is generated** — its header says "do not edit; rebuild with `cd dc-runtime && bun run build`". That `dc-runtime` source is not in this repo; treat `support.js` as a read-only vendored runtime.

## Working in this repo

- No commands to build/lint/test. To preview: open a `.dc.html` page directly in a browser (it self-loads `support.js`), or open any `.card.html` (self-loads `styles.css`).
- When adding a component, follow the four-file pattern above and place its `.card.html` preview alongside it with a correct `@dsCard` header.
- If a broader UI icon set is needed, add **Lucide** (CDN, 1.5px stroke) and flag the addition — per the iconography rules in `readme.md`. Default icons are minimal inline SVG in `currentColor`.
