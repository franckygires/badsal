import * as React from "react";

/**
 * Section heading: gold uppercase eyebrow, Playfair title, gold underline bar,
 * and an optional lead paragraph. Marks the start of each page section.
 *
 * @startingPoint section="Layout" subtitle="Section header with gold underline" viewport="640x160"
 */
export interface SectionHeaderProps {
  /** Uppercase gold eyebrow above the title. */
  eyebrow?: string;
  title: string;
  /** Optional lead paragraph below the underline. */
  description?: string;
  /** @default "left" */
  align?: "left" | "center";
  /** Use on dark-green backgrounds to switch text to light. @default false */
  invert?: boolean;
}

export function SectionHeader(props: SectionHeaderProps): JSX.Element;
