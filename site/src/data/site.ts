// Coordonnées et identifiants de l'entreprise — source unique de vérité.
export const site = {
  name: "BADSAL & FILS OKIKIOLA",
  email: "info@badsal-okikiola-fils.be",
  // Numéro principal utilisé pour le lien WhatsApp (wa.me, format international sans +).
  whatsappPrimary: "2290199034344",
  whatsappNumbers: ["+229 0199034344", "0197886596", "0148474788"],
  wechatId: "+86 17502105979",
  // QR code WeChat affiché dans la modale (déposer l'image dans public/).
  wechatQr: "/wechat-qr.jpeg",
  rccm: "N°RB/PNO/18 B 2200",
  ifu: "3200801032318",
  addressLines: ["Cotonou, Akpakpa PK 5,", "Dandji Lot N°772"],

  // Image de partage (Open Graph) — affichée quand un lien du site est partagé.
  ogImage: "/og-image-v2.webp",

  // Réseaux sociaux : laisser vide tant que les comptes n'existent pas — les icônes
  // n'apparaissent dans le pied de page (et dans les données structurées) que si renseigné.
  social: {
    linkedin: "", // ex. "https://www.linkedin.com/company/badsal-fils-okikiola"
    facebook: "", // ex. "https://www.facebook.com/badsalfilsokikiola"
  },

  // À renseigner après inscription (laisser vide = désactivé) :
  // - gaId : identifiant Google Analytics 4 (ex. "G-XXXXXXXXXX")
  // - googleSiteVerification : code de validation Google Search Console
  gaId: "",
  googleSiteVerification: "",
} as const;

/** Réseaux sociaux réellement renseignés (pour le pied de page et le JSON-LD). */
export function socialLinks(): string[] {
  return [site.social.linkedin, site.social.facebook].filter(Boolean);
}

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsappPrimary}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
