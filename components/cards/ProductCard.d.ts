import * as React from "react";

/**
 * Catalogue tile for an export product: image, category eyebrow, serif title,
 * 2-line clamped excerpt, and an action button. Designed for responsive grids.
 *
 * @startingPoint section="Cards" subtitle="Product catalogue tile" viewport="320x380"
 */
export interface ProductCardProps {
  /** Image URL. Falls back to a "Photo produit" placeholder when omitted. */
  image?: string;
  imageAlt?: string;
  /** Small gold eyebrow, e.g. "Agro-alimentaire". */
  category?: string;
  title: string;
  /** Body copy; clamped to two lines. */
  excerpt: string;
  /** @default "En savoir plus" */
  ctaLabel?: string;
  /** @default "secondary" */
  ctaVariant?: "primary" | "secondary" | "ghost";
  onCta?: (e: React.MouseEvent) => void;
  href?: string;
}

export function ProductCard(props: ProductCardProps): JSX.Element;
