import * as React from "react";

/**
 * Primary action control. Use `primary` for the single most important action on a
 * surface (the quote CTA), `secondary` for supporting actions, `ghost` for tertiary.
 *
 * @startingPoint section="Buttons" subtitle="Primary CTA + outlined secondary" viewport="520x120"
 */
export interface ButtonProps {
  children: React.ReactNode;
  /** Visual emphasis. @default "primary" */
  variant?: "primary" | "secondary" | "ghost";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Render as an anchor instead of a button. */
  href?: string;
  /** Stretch to fill the container width. @default false */
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
}

export function Button(props: ButtonProps): JSX.Element;
