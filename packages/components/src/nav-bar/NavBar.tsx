import React from "react";
import { isWeb } from "../shared/platform";
import { useThemedColors } from "../shared/useThemedColors";
import { Box } from "../primitives/Box";
import {
  navBarGeometry,
  navBarLogoStyle,
  navBarLinksStyle,
  navBarActionsStyle,
} from "./NavBar.style";
import type { NavBarProps } from "./NavBar.types";
import { extractBoxLayoutProps } from "../shared/boxLayoutProps";
import type { SzrFC } from '../shared/types';

export type { NavBarProps } from "./NavBar.types";

export const NavBar: SzrFC<NavBarProps> = (props) => {
  const { layout, sxProps, rest } = extractBoxLayoutProps(props);
  const hasLayoutProps =
    Object.keys(layout).length > 0 || Object.keys(sxProps).length > 0;
  const { logo, links, actions, scrolled = false, style } = rest as NavBarProps;
  const themed = useThemedColors();

  if (!isWeb) return null;

  const headerEl = (
    <header
      role="banner"
      style={{
        position: "sticky",
        top: 0,
        zIndex: navBarGeometry.zIndex,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `0 ${navBarGeometry.paddingH}px`,
        height: navBarGeometry.height,
        backgroundColor: themed.bgSecondary,
        borderBottom: `1px solid ${themed.borderDefault}`,
        backdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
        transition: "backdrop-filter 0.3s ease, border-color 0.3s ease",
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

  if (hasLayoutProps)
    return (
      <Box {...layout} {...sxProps}>
        {headerEl}
      </Box>
    );
  return headerEl;
};

NavBar.displayName = "NavBar";
export default NavBar;
