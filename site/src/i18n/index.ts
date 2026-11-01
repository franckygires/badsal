import type { Dict, Locale } from "./types";
import { fr } from "./fr";
import { en } from "./en";
import { zh } from "./zh";
import { ar } from "./ar";

export type { Dict, Locale } from "./types";

export const locales: Locale[] = ["fr", "en", "zh", "ar"];
export const defaultLocale: Locale = "fr";

/** Langues écrites de droite à gauche. */
export const rtlLocales: Locale[] = ["ar"];
export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

const dicts: Record<Locale, Dict> = { fr, en, zh, ar };

export function getDict(locale: Locale): Dict {
  return dicts[locale] ?? fr;
}

/** Préfixe un chemin logique ("/exportation", "/#ananas", "/") avec la langue.
 *  FR = pas de préfixe ; EN = "/en" ; 中文 = "/zh" ; العربية = "/ar". */
export function localizePath(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  if (clean === "/") return `/${locale}/`;
  return `/${locale}${clean}`;
}

/** Nom affiché dans le sélecteur de langue. */
export const localeLabels: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  zh: "中文",
  ar: "العربية",
};
