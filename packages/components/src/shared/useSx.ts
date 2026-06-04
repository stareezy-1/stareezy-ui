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

import { useId, useEffect, useRef } from "react";
import { resolveSxWeb, resolveSxNative } from "./sx";
import type { SxProp } from "./sx";
import { isWeb } from "./platform";

// ---------------------------------------------------------------------------
// SxStyleTag — injects responsive sx CSS into the document head (web only)
// ---------------------------------------------------------------------------

/** Inject a <style> tag for responsive sx rules and clean up on unmount. */
export function SxStyleTag({
  css,
  scopeClass,
}: {
  css: string;
  scopeClass: string;
}): null {
  const styleRef = useRef<HTMLStyleElement | null>(null);
  useEffect(() => {
    if (!css || typeof document === "undefined") return;
    const el = document.createElement("style");
    el.setAttribute("data-szx", scopeClass);
    el.textContent = css;
    document.head.appendChild(el);
    styleRef.current = el;
    return () => {
      styleRef.current?.parentNode?.removeChild(styleRef.current);
      styleRef.current = null;
    };
  }, [css, scopeClass]);
  return null;
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
