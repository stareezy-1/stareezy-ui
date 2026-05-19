import React from "react";
import { isWeb } from "../shared/platform";
import {
  navBarBaseStyle,
  navBarScrolledStyle,
  navBarDefaultStyle,
  navBarLogoStyle,
  navBarLinksStyle,
  navBarActionsStyle,
} from "./NavBar.style";
import type { NavBarProps } from "./NavBar.types";

export type { NavBarProps } from "./NavBar.types";

export const NavBar: React.FC<NavBarProps> = ({
  logo,
  links,
  actions,
  scrolled = false,
  style,
}) => {
  if (!isWeb) return null;

  const blurStyle = scrolled ? navBarScrolledStyle : navBarDefaultStyle;

  return (
    <header
      role="banner"
      style={{
        ...navBarBaseStyle,
        ...blurStyle,
        ...(style as React.CSSProperties),
      }}
    >
      {logo && <div style={navBarLogoStyle}>{logo}</div>}
      {links && (
        <nav style={navBarLinksStyle} aria-label="Main navigation">
          {links}
        </nav>
      )}
      {actions && <div style={navBarActionsStyle}>{actions}</div>}
    </header>
  );
};

NavBar.displayName = "NavBar";
export default NavBar;
