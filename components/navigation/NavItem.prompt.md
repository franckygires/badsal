**NavItem** — a top-nav link; add `items` to get a dropdown chevron and hover menu, `active` for the gold-underlined current section.

```jsx
<NavItem label="Accueil" href="/" active />
<NavItem label="Produits" items={[
  { label: "Agro-alimentaire", href: "/agro" },
  { label: "Textile", href: "/textile" },
]} />
```

Keep labels short (one or two words). The chevron only appears when `items` is non-empty. Lay items out in a flex row with `gap: var(--space-8)`.
