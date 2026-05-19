import type React from "react";

export interface NavBarProps {
  logo?: React.ReactNode;
  links?: React.ReactNode;
  actions?: React.ReactNode;
  scrolled?: boolean;
  style?: React.CSSProperties | Record<string, unknown>;
}
