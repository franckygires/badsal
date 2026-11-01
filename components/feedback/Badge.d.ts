import * as React from "react";

/**
 * Certification / compliance pill. Surfaces legal identifiers (RCCM, IFU) and
 * trust signals. Pair a short `label` with a `value` for "RCCM · <number>".
 *
 * @startingPoint section="Badges" subtitle="Certification & RCCM pill" viewport="360x60"
 */
export interface BadgeProps {
  /** Leading label, e.g. "RCCM". */
  label?: string;
  /** Identifier / number shown in stronger text, e.g. "RB/COT/24 B 12345". */
  value?: string;
  /** @default "cert" */
  variant?: "cert" | "gold" | "neutral";
  /** Custom leading icon. Pass null to hide the default seal. */
  icon?: React.ReactNode | null;
}

export function Badge(props: BadgeProps): JSX.Element;
