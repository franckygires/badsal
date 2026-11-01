**Button** — the primary action control; green fill + gold border for the main CTA, outlined for secondary actions.

```jsx
<Button variant="primary">Demander un devis</Button>
<Button variant="secondary">En savoir plus</Button>
```

Variants: `primary` (institutional green bg, dark-gold border — the quote CTA), `secondary` (outlined green), `ghost` (text only). Sizes `sm | md | lg`. Pass `href` to render as a link, `fullWidth` to stretch, `iconLeft` / `iconRight` for icons. Keep one primary button per view.
