**ProductCard** — catalogue tile with image, category eyebrow, serif title, a 2-line excerpt, and an action button.

```jsx
<ProductCard
  category="Agro-alimentaire"
  title="Anacarde brute"
  excerpt="Noix de cajou calibrées et triées, conditionnées pour l'export."
  image="/assets/anacarde.jpg"
  ctaLabel="En savoir plus"
/>
```

The excerpt clamps to two lines, so keep it tight. Omit `image` to show a "Photo produit" placeholder. Composes `Button` for the CTA — default `secondary`; use `primary` to push a quote request. Lay several out in a CSS grid with `gap: var(--gutter)`.
