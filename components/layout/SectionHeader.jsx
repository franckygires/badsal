import React from "react";

/**
 * SectionHeader — eyebrow + serif title with a gold underline accent, plus an
 * optional lead paragraph. The structural rhythm marker between page sections.
 */
export function SectionHeader({ eyebrow, title, description, align = "left", invert = false }) {
  const titleColor = invert ? "var(--color-text-invert)" : "var(--color-text)";
  const descColor = invert ? "rgba(250,250,248,0.78)" : "var(--color-text-muted)";

  return (
    <header
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        textAlign: align,
        alignItems: align === "center" ? "center" : "flex-start",
        maxWidth: align === "center" ? 720 : 640,
        marginInline: align === "center" ? "auto" : 0,
        fontFamily: "var(--font-body)",
      }}
    >
      {eyebrow && (
        <span
          style={{
            fontSize: 12,
            fontWeight: "var(--weight-semibold)",
            letterSpacing: "var(--tracking-overline)",
            textTransform: "uppercase",
            color: "var(--color-accent)",
          }}
        >
          {eyebrow}
        </span>
      )}
      <h2
        style={{
          margin: 0,
          fontFamily: "var(--font-display)",
          fontWeight: "var(--weight-bold)",
          fontSize: "clamp(26px, 3vw, 34px)",
          lineHeight: 1.15,
          letterSpacing: "var(--tracking-tight)",
          color: titleColor,
        }}
      >
        {title}
      </h2>
      <span
        style={{
          width: 56,
          height: 3,
          background: "var(--color-accent)",
          borderRadius: "var(--radius-pill)",
        }}
      />
      {description && (
        <p style={{ margin: "4px 0 0", fontSize: 16, lineHeight: 1.6, color: descColor }}>
          {description}
        </p>
      )}
    </header>
  );
}
