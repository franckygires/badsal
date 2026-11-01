import React from "react";
import { Button } from "../../components/buttons/Button.jsx";
import { ContactButton } from "../../components/contact/ContactButton.jsx";
import { NavItem } from "../../components/navigation/NavItem.jsx";
import { Badge } from "../../components/feedback/Badge.jsx";
import { SectionHeader } from "../../components/layout/SectionHeader.jsx";
import { ProductCard } from "../../components/cards/ProductCard.jsx";

const PRODUCTS = [
  { category: "Agro-alimentaire", title: "Anacarde brute", excerpt: "Noix de cajou calibrées et triées, conditionnées en sacs pour l'export international." },
  { category: "Textile", title: "Coton fibre", excerpt: "Coton brut conditionné en balles, conforme aux standards internationaux de qualité." },
  { category: "Cosmétique", title: "Beurre de karité", excerpt: "Karité brut et raffiné, traçabilité complète depuis les coopératives de production." },
];

/**
 * Homepage — reference composition of the BADSAL & FILS OKIKIOLA marketing site.
 * Demonstrates how the primitives fit together; see index.html for the static preview.
 */
export function Homepage() {
  return (
    <div style={{ fontFamily: "var(--font-body)", background: "var(--color-bg)", color: "var(--color-text)" }}>
      <header
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 76, padding: "0 32px", background: "var(--color-surface)",
          borderBottom: "var(--border-hairline)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--color-primary)" }}>
            Badsal &amp; Fils Okikiola
          </span>
          <span style={{ fontSize: 10.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-text-faint)", marginTop: 3 }}>
            Import · Export
          </span>
        </div>
        <nav style={{ display: "flex", alignItems: "center", gap: 30 }}>
          <NavItem label="Accueil" active />
          <NavItem label="Produits" items={[{ label: "Agro-alimentaire" }, { label: "Textile & coton" }, { label: "Produits transformés" }]} />
          <NavItem label="Services" items={[{ label: "Logistique" }, { label: "Sourcing" }]} />
          <NavItem label="À propos" />
          <NavItem label="Contact" />
        </nav>
        <Button variant="primary">Demander un devis</Button>
      </header>

      <section
        style={{
          background: "var(--color-primary)", color: "var(--color-text-invert)",
          padding: "72px 32px", display: "grid", gridTemplateColumns: "1.1fr 0.9fr",
          gap: 48, alignItems: "center", maxWidth: 1140, margin: "0 auto",
        }}
      >
        <div>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent-soft)" }}>
            Import &amp; Export · Cotonou, Bénin
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 50, lineHeight: 1.08, margin: "18px 0 0" }}>
            Vos marchandises, du Bénin vers le monde.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "rgba(250,250,248,0.82)", maxWidth: 480, margin: "20px 0 0" }}>
            Sourcing rigoureux, logistique maîtrisée et documentation complète.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
            <Button variant="primary">Demander un devis</Button>
            <ContactButton channel="whatsapp" href="https://wa.me/22901000000" />
          </div>
        </div>
        <div style={{ aspectRatio: "4 / 3.4", borderRadius: "var(--radius-lg)", background: "linear-gradient(135deg,#2C5A45,#143026)", boxShadow: "var(--shadow-lg)" }} />
      </section>

      <section style={{ padding: "72px 32px", maxWidth: 1140, margin: "0 auto" }}>
        <SectionHeader
          eyebrow="Notre catalogue"
          title="Des produits d'exception, prêts à l'export"
          description="Sourcés au Bénin et dans la sous-région, contrôlés et conditionnés selon les normes internationales."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--gutter)", marginTop: 40 }}>
          {PRODUCTS.map((p) => (
            <ProductCard key={p.title} {...p} />
          ))}
        </div>
      </section>

      <div
        style={{
          background: "var(--color-surface-alt)", padding: "56px 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 32, flexWrap: "wrap", maxWidth: 1140, margin: "0 auto",
        }}
      >
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, margin: 0 }}>
            Un projet d'importation ? Parlons-en.
          </h2>
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <Badge label="RCCM" value="RB/COT/24 B 12345" />
            <Badge label="IFU" value="3201 9000 00000" variant="gold" />
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Button variant="primary">Demander un devis</Button>
          <ContactButton channel="wechat" />
        </div>
      </div>
    </div>
  );
}
