import type React from "react";
import type { BoxLayoutProps } from "../shared/boxLayoutProps";

export interface NavBarProps extends BoxLayoutProps {
  logo?: React.ReactNode;
  links?: React.ReactNode;
  actions?: React.ReactNode;
  scrolled?: boolean;
  style?: React.CSSProperties | Record<string, unknown>;
}
