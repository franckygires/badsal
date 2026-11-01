import React, { useState } from "react";

const Chevron = ({ open }) => (
  <svg
    width="11" height="11" viewBox="0 0 12 12" aria-hidden="true"
    style={{ transition: "transform var(--dur-base) var(--ease-standard)", transform: open ? "rotate(180deg)" : "none" }}
  >
    <path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * NavItem — top-navigation link with an optional dropdown indicator and menu.
 * Active state is marked with a gold underline.
 */
export function NavItem({ label, href = "#", active = false, items, onSelect }) {
  const [open, setOpen] = useState(false);
  const hasDropdown = Array.isArray(items) && items.length > 0;

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => hasDropdown && setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a
        href={href}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontFamily: "var(--font-body)",
          fontSize: 15,
          fontWeight: active ? "var(--weight-semibold)" : "var(--weight-medium)",
          color: active ? "var(--color-primary)" : "var(--color-text)",
          textDecoration: "none",
          padding: "8px 2px",
          borderBottom: active ? "2px solid var(--color-accent)" : "2px solid transparent",
          transition: "color var(--dur-base) var(--ease-standard)",
        }}
      >
        {label}
        {hasDropdown && <Chevron open={open} />}
      </a>

      {hasDropdown && open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            minWidth: 220,
            background: "var(--color-surface)",
            border: "var(--border-hairline)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-md)",
            padding: "8px",
            zIndex: 20,
          }}
        >
          {items.map((it) => (
            <a
              key={it.label}
              href={it.href || "#"}
              onClick={() => onSelect && onSelect(it)}
              style={{
                display: "block",
                padding: "9px 12px",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "var(--color-text)",
                textDecoration: "none",
                borderRadius: "var(--radius-sm)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-primary-tint)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {it.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
