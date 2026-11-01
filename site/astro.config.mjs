// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Site Badsal & Fils Okikiola — sortie statique, i18n FR (défaut) + EN + 中文 + العربية.
// ⚠️ `site` doit correspondre à l'URL réellement déployée (utilisée pour les liens
//     canoniques, l'Open Graph et le sitemap). À ajuster si le domaine final diffère.
export default defineConfig({
  site: "https://badsal-okikiola-fils.be",
  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en", "zh", "ar"],
    routing: {
      prefixDefaultLocale: false, // FR à la racine, EN /en/, 中文 /zh/, العربية /ar/
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "fr",
        locales: { fr: "fr", en: "en", zh: "zh", ar: "ar" },
      },
    }),
  ],
});
