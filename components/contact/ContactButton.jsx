import React from "react";

const ICONS = {
  whatsapp: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.42 5.82c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24zm-3.4 4.43c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.57.18 1.1.16 1.51.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19-.71-.64-1.19-1.42-1.33-1.66-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46z"/>
    </svg>
  ),
  wechat: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8.69 4C4.62 4 1.3 6.74 1.3 10.14c0 1.93 1.07 3.65 2.74 4.8l-.55 1.7 2.02-1.04c.72.22 1.45.36 2.18.4-.13-.45-.2-.92-.2-1.4 0-2.98 2.84-5.36 6.32-5.36.23 0 .45.01.67.03C13.9 6.32 11.55 4 8.69 4zm-2.4 3.2a.92.92 0 1 1 0 1.84.92.92 0 0 1 0-1.84zm4.84 0a.92.92 0 1 1 0 1.84.92.92 0 0 1 0-1.84zM14.1 9.6c-3 0-5.45 2.04-5.45 4.56s2.45 4.56 5.45 4.56c.62 0 1.23-.1 1.81-.28l1.67.86-.46-1.42c1.36-.96 2.23-2.42 2.23-4.06 0-2.52-2.45-4.56-5.25-4.56zm-1.84 2.4a.78.78 0 1 1 0 1.56.78.78 0 0 1 0-1.56zm3.68 0a.78.78 0 1 1 0 1.56.78.78 0 0 1 0-1.56z"/>
    </svg>
  ),
};

/**
 * ContactButton — direct-message CTA for WhatsApp or WeChat, in each platform's
 * brand color. Used for fast B2B enquiry channels alongside the formal quote CTA.
 */
export function ContactButton({
  channel = "whatsapp",
  label,
  href,
  size = "md",
  fullWidth = false,
  ...rest
}) {
  const palette = {
    whatsapp: { bg: "var(--color-whatsapp)", bgDeep: "var(--color-whatsapp-deep)" },
    wechat: { bg: "var(--color-wechat)", bgDeep: "var(--color-wechat-deep)" },
  }[channel];

  const pad = { sm: "8px 14px", md: "11px 20px", lg: "14px 26px" }[size];
  const fontSize = { sm: 13, md: 15, lg: 16 }[size];
  const text = label || (channel === "whatsapp" ? "WhatsApp" : "WeChat");

  const style = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "9px",
    fontFamily: "var(--font-body)",
    fontWeight: "var(--weight-semibold)",
    fontSize,
    lineHeight: 1,
    padding: pad,
    color: "#FFFFFF",
    background: palette.bg,
    border: "none",
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
    textDecoration: "none",
    width: fullWidth ? "100%" : "auto",
    transition: "background var(--dur-base) var(--ease-standard)",
  };

  const Tag = href ? "a" : "button";
  const tagProps = href ? { href, target: "_blank", rel: "noopener noreferrer" } : { type: "button" };

  return (
    <Tag style={style} {...tagProps} {...rest}>
      {ICONS[channel]}
      {text}
    </Tag>
  );
}
