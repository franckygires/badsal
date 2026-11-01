# Site web — BADSAL & FILS OKIKIOLA

Site institutionnel B2B (import-export) construit avec **Astro**, à partir du design
system et des maquettes `.dc.html` du dossier parent. Rendu fidèle au design ;
contenu issu de `../contenu.md`. Bilingue **FR (défaut) + EN**, prêt pour le **mandarin**.

## Démarrer

```bash
cd site
npm install
npm run dev      # http://localhost:4321
npm run build    # génère dist/ (statique)
npm run preview  # sert le dist/ produit
```

Le `dist/` est 100 % statique : déployable gratuitement sur Netlify, Vercel,
Cloudflare Pages, GitHub Pages, ou tout hébergeur de fichiers.

## À compléter (par l'entreprise)

1. **Formulaire de devis** — créer une clé gratuite sur https://web3forms.com
   (liée à `info@badsal-okikiola-fils.be`) et remplacer `WEB3FORMS_ACCESS_KEY`
   dans [src/data/site.ts](src/data/site.ts). Sans clé valide, l'envoi affiche une erreur.
2. **Images** — les visuels sont des placeholders (blocs dégradés « Photo produit »),
   comme dans le design d'origine. Déposer les vraies photos dans `public/` et les
   brancher dans `ProductCard.astro` / les héros le moment venu.
3. **WhatsApp** — le lien `wa.me` utilise `whatsappPrimary` dans `src/data/site.ts`
   (numéro principal). Vérifier/ajuster si besoin.

## Architecture

- **`src/i18n/`** — dictionnaires `fr.ts` / `en.ts` (contrat `types.ts`), helpers
  (`localizePath`, `getDict`). Ajouter le mandarin = créer `zh.ts`, ajouter `"zh"`
  à `locales` (ici + `astro.config.mjs`), dupliquer l'arbre `src/pages/zh/`.
- **`src/data/products.ts`** — produits (phares / export / import) avec nom, teaser
  (2 lignes) et texte complet, par langue. `site.ts` = coordonnées + clé formulaire.
- **`src/components/`** — `Header`, `Footer`, `HeroSlider`, `ProductCard` (carte
  dépliable), `FaqAccordion`, `QuoteForm`, `PageHero`. `components/pages/` = une vue
  par page, pilotée par `locale`.
- **`src/pages/`** — routes FR à la racine, EN sous `/en/`. Chaque fichier est un
  simple wrapper qui rend la vue correspondante avec `locale`.

> ⚠️ **Piège connu du compilateur Astro** : ne jamais accéder à une propriété nommée
> `export` ou `import` dans le frontmatter/template (`t.nav.export`) — le compilateur
> corrompt le JS généré. Utiliser des clés non réservées (`exportLabel`, `exportItems`).
