import * as React from "react";

export interface NavMenuEntry {
  label: string;
  href?: string;
}

/**
 * Top-navigation link. Shows a chevron when `items` are supplied and reveals a
 * dropdown on hover. Active items carry a gold underline.
 */
export interface NavItemProps {
  label: string;
  href?: string;
  /** Marks the current section (gold underline + semibold). */
  active?: boolean;
  /** Submenu entries; presence adds the dropdown chevron. */
  items?: NavMenuEntry[];
  onSelect?: (entry: NavMenuEntry) => void;
}

export function NavItem(props: NavItemProps): JSX.Element;
