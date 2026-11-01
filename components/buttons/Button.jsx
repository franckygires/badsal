import React from "react";

/**
 * Button — primary action control for BADSAL & FILS OKIKIOLA.
 *
 * Variants:
 *  - primary:   institutional green fill with a dark-gold border (main CTA, e.g. "Demander un devis")
 *  - secondary: outlined green on transparent (e.g. "En savoir plus")
 *  - ghost:     text-only, low emphasis
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  fullWidth = false,
  iconLeft,
  iconRight,
  disabled = false,
  onClick,
  type = "button",
  ...rest
}) {
  const pad = {
    sm: "8px 16px",
    md: "12px 22px",
    lg: "16px 30px",
  }[size];
  const fontSize = { sm: 13, md: 15, lg: 16 }[size];

  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    fontFamily: "var(--font-body)",
    fontWeight: "var(--weight-semibold)",
    fontSize,
    lineHeight: 1,
    letterSpacing: "0.01em",
    padding: pad,
    borderRadius: "var(--radius-sm)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? "100%" : "auto",
    textDecoration: "none",
    transition: "background var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard)",
    boxSizing: "border-box",
  };

  const variants = {
    primary: {
      background: "var(--color-primary)",
      color: "var(--color-text-invert)",
      border: "1.5px solid var(--color-accent)",
    },
    secondary: {
      background: "transparent",
      color: "var(--color-primary)",
      border: "1.5px solid var(--color-primary)",
    },
    ghost: {
      background: "transparent",
      color: "var(--color-primary)",
      border: "1.5px solid transparent",
    },
  };

  const style = { ...base, ...variants[variant] };

  const Tag = href ? "a" : "button";
  const tagProps = href
    ? { href, role: "button" }
    : { type, disabled };

  return (
    <Tag style={style} onClick={disabled ? undefined : onClick} {...tagProps} {...rest}>
      {iconLeft}
      {children}
      {iconRight}
    </Tag>
  );
}
