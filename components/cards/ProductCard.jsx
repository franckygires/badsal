import React from "react";
import { Button } from "../buttons/Button.jsx";

/**
 * ProductCard — catalogue tile: image, optional category, title, 2-line excerpt,
 * and an action button. Built for export-product grids.
 */
export function ProductCard({
  image,
  imageAlt = "",
  category,
  title,
  excerpt,
  ctaLabel = "En savoir plus",
  ctaVariant = "secondary",
  onCta,
  href,
}) {
  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--color-surface)",
        border: "var(--border-hairline)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        boxShadow: "var(--shadow-sm)",
        fontFamily: "var(--font-body)",
        height: "100%",
      }}
    >
      <div
        style={{
          aspectRatio: "4 / 3",
          background: image
            ? `#EDEDE7 center / cover no-repeat url(${image})`
            : "var(--color-surface-alt)",
          position: "relative",
        }}
      >
        {!image && (
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-text-faint)",
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Photo produit
          </span>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "20px 20px 22px" }}>
        {category && (
          <span
            style={{
              fontSize: 11,
              fontWeight: "var(--weight-semibold)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
            }}
          >
            {category}
          </span>
        )}
        <h3
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-bold)",
            fontSize: 21,
            lineHeight: 1.2,
            color: "var(--color-text)",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: 14.5,
            lineHeight: 1.5,
            color: "var(--color-text-muted)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {excerpt}
        </p>
        <div style={{ marginTop: "8px" }}>
          <Button variant={ctaVariant} size="sm" href={href} onClick={onCta}>
            {ctaLabel}
          </Button>
        </div>
      </div>
    </article>
  );
}
