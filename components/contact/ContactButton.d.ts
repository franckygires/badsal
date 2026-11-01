import * as React from "react";

/**
 * Direct-message CTA rendered in a messaging platform's brand color. Pair with the
 * formal quote CTA to give buyers a fast, familiar enquiry channel.
 *
 * @startingPoint section="Buttons" subtitle="WhatsApp + WeChat contact buttons" viewport="420x90"
 */
export interface ContactButtonProps {
  /** Messaging platform. @default "whatsapp" */
  channel?: "whatsapp" | "wechat";
  /** Button text. Defaults to the platform name. */
  label?: string;
  /** Deep link (wa.me / weixin). Renders as an anchor that opens in a new tab. */
  href?: string;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function ContactButton(props: ContactButtonProps): JSX.Element;
