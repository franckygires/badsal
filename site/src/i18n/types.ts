// Contrat partagé entre toutes les langues. Ajouter le mandarin = ajouter "zh"
// ici puis créer src/i18n/zh.ts implémentant `Dict`.
export type Locale = "fr" | "en" | "zh" | "ar";

export interface NavLink {
  label: string;
  /** chemin SANS préfixe de langue, ex. "/exportation" ou "/#ananas" */
  href: string;
}

export interface Pillar {
  icon: string;
  title: string;
  desc: string;
}

export interface Engagement {
  icon: string;
  title: string;
  body: string;
}

export interface VisionProject {
  num: string;
  raw: string;
  product: string;
  desc: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Dict {
  htmlLang: string;
  nav: {
    home: string;
    about: string;
    exportLabel: string;
    importLabel: string;
    vision: string;
    contact: string;
  };
  /** sous-menus déroulants (libellés + cibles) */
  menus: {
    exportItems: NavLink[];
    importItems: NavLink[];
  };
  cta: string;
  common: {
    learnMore: string;
    showLess: string;
    requestQuote: string;
    breadcrumbHome: string;
    openMenu: string;
    closeMenu: string;
  };
  footer: {
    tagline: string;
    navTitle: string;
    contactTitle: string;
    addressLines: string[];
    copyright: string;
  };
  home: {
    heroKicker: string;
    heroSubtitle: string;
    heroBtn2: string;
    intro: { kicker: string; title: string; body: string };
    pillars: Pillar[];
    productsTitle: string;
    productsSub: string;
    bannerKicker: string;
    bannerText: string;
    bannerBtn: string;
  };
  about: {
    breadcrumb: string;
    heroTitle: string;
    identityKicker: string;
    identityTitle: string;
    identityBody: string[];
    photoLabel: string;
    values: string[];
    legalKicker: string;
    legalTitle: string;
    legalSub: string;
    engagementsKicker: string;
    engagementsTitle: string;
    engagements: Engagement[];
    bannerKicker: string;
    bannerText: string;
    bannerBtn: string;
  };
  exportPage: {
    breadcrumb: string;
    heroTitle: string;
    heroSub: string;
    catalogCtaTitle: string;
    groups: {
      agroalimentaire: string;
      aliments: string;
      minieres: string;
      autres: string;
    };
  };
  importPage: {
    breadcrumb: string;
    heroTitle: string;
    heroSub: string;
    catalogCtaTitle: string;
    highlights: string[];
  };
  vision: {
    breadcrumb: string;
    heroKicker: string;
    heroTitle: string;
    statement: string;
    projectsKicker: string;
    projectsTitle: string;
    projects: VisionProject[];
    ctaKicker: string;
    ctaTitle: string;
    ctaSub: string;
    ctaBtn: string;
    ctaBtn2: string;
  };
  contact: {
    heroTitle: string;
    heroSub: string;
    faqKicker: string;
    faqTitle: string;
    faqs: Faq[];
    cardTitle: string;
    cardSub: string;
    addressLabel: string;
    form: {
      kicker: string;
      title: string;
      name: string;
      namePh: string;
      company: string;
      companyPh: string;
      email: string;
      emailPh: string;
      product: string;
      productPh: string;
      qty: string;
      qtyPh: string;
      incoterm: string;
      incotermPh: string;
      message: string;
      messagePh: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
    };
    incoterms: string[];
  };
}
