import React from "react";

const SealIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 1.5l1.7 1.1 2-.2.6 1.9 1.6 1.2-.7 1.9.7 1.9-1.6 1.2-.6 1.9-2-.2L8 14.5l-1.7-1.1-2 .2-.6-1.9L2.1 10.5l.7-1.9-.7-1.9 1.6-1.2.6-1.9 2 .2L8 1.5z" fill="currentColor" opacity="0.18"/>
    <path d="M5.6 8.1l1.6 1.6 3.3-3.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/**
 * Badge — certification / compliance pill. Use it to surface legal identifiers
 * (RCCM, IFU) and trust signals beside the company name or in the footer.
 */
export function Badge({ label, value, variant = "cert", icon }) {
  const palettes = {
    cert: { bg: "var(--color-primary-tint)", fg: "var(--color-primary)", chip: "var(--color-primary)" },
    gold: { bg: "var(--color-accent-tint)", fg: "var(--color-accent-deep)", chip: "var(--color-accent-deep)" },
    neutral: { bg: "var(--color-surface-alt)", fg: "var(--color-text-muted)", chip: "var(--color-text-muted)" },
  };
  const p = palettes[variant] || palettes.cert;
  const showIcon = icon !== null;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: value ? "5px 12px 5px 10px" : "5px 12px",
        background: p.bg,
        color: p.fg,
        border: "1px solid color-mix(in srgb, currentColor 22%, transparent)",
        borderRadius: "var(--radius-pill)",
        fontFamily: "var(--font-body)",
        fontSize: 12.5,
        fontWeight: "var(--weight-medium)",
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      {showIcon && (icon || <SealIcon />)}
      {label && (
        <span style={{ fontWeight: "var(--weight-semibold)", letterSpacing: "0.04em" }}>{label}</span>
      )}
      {value && (
        <span
          style={{
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "0.02em",
            color: "var(--color-text)",
            fontWeight: "var(--weight-medium)",
          }}
        >
          {value}
        </span>
      )}
    </span>
  );
}
