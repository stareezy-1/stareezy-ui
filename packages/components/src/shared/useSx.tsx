/**
 * useSx — hook for resolving the sx prop into styles + optional responsive CSS.
 *
 * Returns:
 *   - sxStyle: flat style object merged into the component's own style prop
 *   - sxClassName: scoped class name (only needed when sxCss is non-empty)
 *   - sxCss: @media CSS string to inject via a <style> tag (web only)
 *
 * Usage in a web component:
 *   const { sxStyle, sxClassName, sxCss } = useSx(sx);
 *   return (
 *     <>
 *       {sxCss && <SxStyleTag css={sxCss} scopeClass={sxClassName} />}
 *       <div style={{ ...myStyle, ...sxStyle }} className={sxClassName || undefined}>
 *     </>
 *   );
 *
 * Usage in a native component:
 *   const { sxStyle } = useSx(sx);
 *   return <View style={[myStyle, sxStyle]} />;
 */

import React, { useId } from "react";
import { resolveSxWeb, resolveSxNative } from "./sx";
import type { SxProp } from "./sx";
import { isWeb } from "./platform";

// ---------------------------------------------------------------------------
// SxStyleTag — injects responsive sx CSS into the document head (web only)
// ---------------------------------------------------------------------------

/** Inject a <style> tag for responsive sx rules inline in the render tree (SSR-safe). */
export function SxStyleTag({
  css,
  scopeClass,
}: {
  css: string;
  scopeClass: string;
}): React.ReactElement | null {
  if (!css) return null;
  return (
    <style
      data-szx={scopeClass}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: css }}
    />
  );
}

// ---------------------------------------------------------------------------
// useSx hook
// ---------------------------------------------------------------------------

export function useSx(sx: SxProp | undefined): {
  sxStyle: Record<string, unknown>;
  sxClassName: string;
  sxCss: string;
} {
  const uid = useId();
  const scopeClass = `szx-${uid.replace(/:/g, "")}`;

  if (!sx || Object.keys(sx).length === 0) {
    return { sxStyle: {}, sxClassName: scopeClass, sxCss: "" };
  }

  if (isWeb) {
    const { inlineStyle, responsiveCss } = resolveSxWeb(sx, scopeClass);
    return {
      sxStyle: inlineStyle,
      sxClassName: responsiveCss ? scopeClass : "",
      sxCss: responsiveCss,
    };
  }

  // React Native — resolve responsive values against current window width
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const RN = require("react-native") as {
    Dimensions: { get: (d: string) => { width: number; height: number } };
  };
  const windowWidth = RN.Dimensions.get("window").width;
  return {
    sxStyle: resolveSxNative(sx, windowWidth),
    sxClassName: "",
    sxCss: "",
  };
}
