# BADSAL & FILS OKIKIOLA — Design System

A design system for **Badsal & Fils Okikiola**, a professional B2B **import–export**
company based in **Cotonou, Bénin**. The system equips designers and developers to
produce institutional, trustworthy interfaces and assets — marketing site, quote
flows, catalogue, documents — in the company's voice and visual identity.

> **Sources.** Built from a brand specification (colors, typography, component list)
> provided by the company. No codebase or Figma file was supplied. Fonts are loaded
> from Google Fonts; product imagery is placeholdered pending real photography.

---

## Brand context

Badsal & Fils Okikiola connects producers in Bénin and the West-African sub-region
with international buyers. Typical exports: **anacarde (cajou), coton, beurre de
karité** and other agro-commodities. The audience is professional — importers,
distributors, trade buyers — so the identity prioritises **credibility, provenance
and clarity** over flash. Legal trust signals (RCCM, IFU) are surfaced prominently, a
norm for serious West-African B2B firms.

---

## Content fundamentals

- **Language: French**, formal "vous". The market is francophone West Africa with
  international reach. Some terms stay in their domain form (Incoterms, RCCM, IFU).
- **Tone:** measured, professional, confidence-building. Sells reliability and
  rigour, not hype. "Sourcing rigoureux, logistique maîtrisée, documentation
  complète."
- **Casing:** sentence case for body and headings; UPPERCASE only for short eyebrow
  labels and acronyms. Titles use the serif; everything else the sans.
- **Numbers & identifiers** (RCCM, IFU, phone) are first-class trust content — shown
  in tabular figures inside badges, never buried.
- **No emoji.** Iconography is restrained line/solid SVG only.
- **CTAs:** one formal primary action — **"Demander un devis"** — supported by
  **"En savoir plus"** and fast messaging channels (WhatsApp, WeChat).

## Visual foundations

- **Color.** Institutional dark green `#1B4332` carries authority and is used for
  headers, hero bands and footers. Dark gold `#B8860B` is the accent — borders on the
  primary CTA, eyebrows, section underlines, never large fills. Off-white `#FAFAF8`
  page, white `#FFFFFF` surfaces, hairline `#E5E5E0` borders. Messaging channels keep
  their own brand greens (WhatsApp `#25D366`, WeChat `#07C160`).
- **Type.** **Playfair Display** (serif) for prestige headings and the wordmark;
  **Inter** (sans) for body, labels and UI. Display sizes 30–56px serif; body 16px /
  1.65 sans. Eyebrows are 12px, uppercase, 0.18em tracked, gold.
- **Layout.** Centred container, max 1140px, 32px gutters. 4px spacing grid; sections
  ~72–80px vertical padding. Generous whitespace; content never edge-to-edge.
- **Section signature.** Each section opens with a gold eyebrow → serif title → a
  fixed **56×3px gold underline bar**. This is the brand's structural motif.
- **Surfaces & elevation.** Cards are white, hairline-bordered, `radius 10px`, with a
  soft low shadow (`0 2px 6px rgba(26,26,26,.06)`). Corners are restrained
  (3–16px) — institutional, not playful.
- **Backgrounds.** Solid color blocks, no gradients except a single faint gold radial
  glow allowed in the dark-green hero. Imagery is warm, documentary (goods, port,
  logistics) — placeholdered here.
- **Motion & states.** Subtle: 200ms ease transitions. Primary button darkens to
  `#143026` on hover; outlined/ghost get a faint green tint; nav items reveal a gold
  underline. No bounces.

## Iconography

- Minimal **inline SVG**, ~18px, drawn in `currentColor` so they inherit context.
- Brand glyphs included for the two messaging channels (**WhatsApp**, **WeChat**) and
  a **chevron** for dropdowns and a **seal/check** for certification badges.
- No icon font, no emoji, no decorative illustration. If you need a broader UI icon
  set, add **Lucide** (CDN) — its 1.5px stroke matches the chevron weight — and flag
  the addition.

---

## Index / manifest

- `styles.css` — global entry point (links every token + font file).
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `effects.css`,
  `fonts.css` (Google Fonts import).
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Effects).
- `components/`
  - `buttons/` — **Button** (primary CTA, secondary outlined, ghost)
  - `contact/` — **ContactButton** (WhatsApp / WeChat)
  - `cards/` — **ProductCard**
  - `navigation/` — **NavItem** (dropdown)
  - `feedback/` — **Badge** (RCCM / certification pill)
  - `layout/` — **SectionHeader** (gold underline)
- `ui_kits/website/` — marketing **Homepage** (static `index.html` + `Homepage.jsx`).
- `SKILL.md` — Agent-Skill manifest for use in Claude Code.

Each component ships `<Name>.jsx` + `<Name>.d.ts` + `<Name>.prompt.md` and a
`@dsCard` HTML preview. Foundation and component previews populate the **Design
System** tab.
