"use client";

/**
 * Quasify UI Playground
 *
 * Uses Sandpack for real live code execution in an iframe.
 * The Run button actually compiles and renders the code.
 */

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
} from "@codesandbox/sandpack-react";

// ── Sandpack dependencies injected into the sandbox ──────────────────────────
// We use the CDN-hosted UMD builds so Sandpack can resolve them in the browser.
const SANDPACK_DEPS = {
  react: "^18.3.0",
  "react-dom": "^18.3.0",
};

// ── Shared setup file injected into every sandbox ─────────────────────────────
// Provides lightweight stubs for the token/component packages so examples
// work without a full build pipeline inside the iframe.
const SETUP_FILE = `
// Minimal token stubs
export const colors = {
  celurenBlue: {
    25: { value: '#E6EDFA' }, 50: { value: '#CCDBF5' }, 100: { value: '#B3C9F0' },
    200: { value: '#81A6E7' }, 300: { value: '#4E82DD' }, 400: { value: '#1B5ED3' },
    500: { value: '#024CCE' }, 600: { value: '#0146C5' }, 700: { value: '#023DA5' },
  },
  raisinBlack: {
    100: { value: '#A8A9A9' }, 200: { value: '#7D7D7E' }, 300: { value: '#515253' },
    400: { value: '#33373A' }, 500: { value: '#262728' }, 600: { value: '#171718' },
    700: { value: '#131414' }, 800: { value: '#0F1010' }, 900: { value: '#070707' },
  },
  beauBlue: {
    50: { value: '#FAFBFF' }, 100: { value: '#ECF3F7' }, 200: { value: '#E3ECF4' },
    300: { value: '#D9E6F0' }, 400: { value: '#D5E3EE' }, 500: { value: '#D0E0EC' },
    600: { value: '#A6B3BD' }, 700: { value: '#7D868E' }, 800: { value: '#535A5E' },
  },
  neutral: {
    10: { value: '#FFFFFF' }, 20: { value: '#F5F5F5' }, 30: { value: '#EDEDED' },
    40: { value: '#E0E0E0' }, 50: { value: '#C2C2C2' }, 60: { value: '#9E9E9E' },
    70: { value: '#757575' }, 80: { value: '#616161' }, 90: { value: '#313131' },
    100: { value: '#000000' },
  },
  lawnGreen: {
    50: { value: '#F3FFE3' }, 100: { value: '#E6FBCC' }, 200: { value: '#CDF79A' },
    300: { value: '#B3F367' }, 400: { value: '#9AEF35' }, 500: { value: '#81EB02' },
    600: { value: '#67BC02' }, 700: { value: '#4D8D01' }, 800: { value: '#345E01' },
  },
  crimsonRed: {
    50: { value: '#FFE9EC' }, 100: { value: '#FCCCD2' }, 200: { value: '#FA9AA5' },
    300: { value: '#F76779' }, 400: { value: '#F5354C' }, 500: { value: '#F2021F' },
    600: { value: '#C20219' }, 700: { value: '#910113' }, 800: { value: '#61010C' },
  },
  brightYellowCrayola: {
    50: { value: '#FEF4E2' }, 100: { value: '#FEEFD5' }, 200: { value: '#FDDFAB' },
    300: { value: '#FDCE82' }, 400: { value: '#FCBE58' }, 500: { value: '#FBAE2E' },
    600: { value: '#C98B25' }, 700: { value: '#97681C' }, 800: { value: '#644612' },
  },
  turquiseBlue: {
    50: { value: '#E7FDFA' }, 100: { value: '#D0FCF7' }, 200: { value: '#A1F9EF' },
    300: { value: '#72F7E8' }, 400: { value: '#43F4E0' }, 500: { value: '#14F1D8' },
    600: { value: '#10C1AD' }, 700: { value: '#0C9182' }, 800: { value: '#086056' },
  },
};
export const spacing = {
  zero: { value: 0 }, pixel: { value: 1 }, nano: { value: 2 }, tiny: { value: 4 },
  regular: { value: 6 }, small: { value: 8 }, medium: { value: 12 },
  extraMedium: { value: 16 }, large: { value: 24 }, extraLarge: { value: 28 },
  extraLarge2: { value: 36 }, extraLarge3: { value: 42 }, huge: { value: 64 },
  1: { value: 1 }, 2: { value: 2 }, 3: { value: 3 }, 4: { value: 4 },
  5: { value: 5 }, 6: { value: 6 }, 8: { value: 8 }, 10: { value: 10 },
  12: { value: 12 }, 14: { value: 14 }, 16: { value: 16 }, 18: { value: 18 },
  20: { value: 20 }, 24: { value: 24 }, 28: { value: 28 }, 32: { value: 32 },
  36: { value: 36 }, 48: { value: 48 }, 64: { value: 64 },
};
export const radius = {
  none: { value: 0 }, '2xs': { value: 2 }, xs: { value: 4 }, sm: { value: 6 },
  md: { value: 8 }, lg: { value: 10 }, xl: { value: 12 }, '2xl': { value: 16 },
  '3xl': { value: 20 }, '4xl': { value: 24 }, full: { value: 9999 },
};
export const typography = {
  fontFamily: {
    interRegular: { value: 'Inter, system-ui, sans-serif' },
    interMedium: { value: 'Inter, system-ui, sans-serif' },
    interSemiBold: { value: 'Inter, system-ui, sans-serif' },
    interBold: { value: 'Inter, system-ui, sans-serif' },
    jakartaBold: { value: "'Plus Jakarta Sans', system-ui, sans-serif" },
    jakartaSemiBold: { value: "'Plus Jakarta Sans', system-ui, sans-serif" },
    jakartaBlack: { value: "'Plus Jakarta Sans', system-ui, sans-serif" },
  },
  fontSize: {
    xs: { value: 12 }, sm: { value: 14 }, md: { value: 16 },
    lg: { value: 18 }, xl: { value: 20 }, '2xl': { value: 24 },
    '3xl': { value: 30 }, '4xl': { value: 36 },
  },
};
`;

// ── Component stubs file ──────────────────────────────────────────────────────
// Lightweight React implementations that match the real component API surface.
const COMPONENTS_FILE = `
import React, { useState, useRef, useEffect } from 'react';

// ── Box ───────────────────────────────────────────────────────────────────────
export function Box({ children, style, bg, p, px, py, pt, pb, pl, pr, m, mx, my, mt, mb, ml, mr, rounded, borderWidth, borderColor, width, height, flex, flexDirection, alignItems, justifyContent, gap, display, position, overflow, opacity, ...rest }) {
  const val = (v) => (v && typeof v === 'object' && '__token' in v) ? v.value : v;
  const s = {
    ...(bg !== undefined && { backgroundColor: val(bg) }),
    ...(p !== undefined && { padding: val(p) }),
    ...(px !== undefined && { paddingLeft: val(px), paddingRight: val(px) }),
    ...(py !== undefined && { paddingTop: val(py), paddingBottom: val(py) }),
    ...(pt !== undefined && { paddingTop: val(pt) }),
    ...(pb !== undefined && { paddingBottom: val(pb) }),
    ...(pl !== undefined && { paddingLeft: val(pl) }),
    ...(pr !== undefined && { paddingRight: val(pr) }),
    ...(m !== undefined && { margin: val(m) }),
    ...(mx !== undefined && { marginLeft: val(mx), marginRight: val(mx) }),
    ...(my !== undefined && { marginTop: val(my), marginBottom: val(my) }),
    ...(mt !== undefined && { marginTop: val(mt) }),
    ...(mb !== undefined && { marginBottom: val(mb) }),
    ...(ml !== undefined && { marginLeft: val(ml) }),
    ...(mr !== undefined && { marginRight: val(mr) }),
    ...(rounded !== undefined && { borderRadius: val(rounded) }),
    ...(borderWidth !== undefined && { borderWidth: val(borderWidth), borderStyle: 'solid' }),
    ...(borderColor !== undefined && { borderColor: val(borderColor) }),
    ...(width !== undefined && { width: val(width) }),
    ...(height !== undefined && { height: val(height) }),
    ...(flex !== undefined && { flex: val(flex) }),
    ...(flexDirection !== undefined && { flexDirection: val(flexDirection), display: 'flex' }),
    ...(alignItems !== undefined && { alignItems: val(alignItems), display: 'flex' }),
    ...(justifyContent !== undefined && { justifyContent: val(justifyContent), display: 'flex' }),
    ...(gap !== undefined && { gap: val(gap), display: 'flex' }),
    ...(display !== undefined && { display }),
    ...(position !== undefined && { position }),
    ...(overflow !== undefined && { overflow }),
    ...(opacity !== undefined && { opacity }),
    ...style,
  };
  return React.createElement('div', { style: s, ...rest }, children);
}
export const View = Box;

// ── HStack / VStack ───────────────────────────────────────────────────────────
export function HStack({ flexDirection, ...rest }) {
  return React.createElement(Box, { flexDirection: flexDirection || 'row', ...rest });
}
export function VStack({ flexDirection, ...rest }) {
  return React.createElement(Box, { flexDirection: flexDirection || 'column', ...rest });
}

// ── Text ──────────────────────────────────────────────────────────────────────
const TEXT_PRESETS = {
  'M-heading-bold':    { fontSize: 28, fontWeight: '700', lineHeight: 1.29, fontFamily: 'Inter, system-ui, sans-serif' },
  'S-heading-bold':    { fontSize: 24, fontWeight: '700', lineHeight: 1.33, fontFamily: 'Inter, system-ui, sans-serif' },
  'XS-heading-bold':   { fontSize: 20, fontWeight: '700', lineHeight: 1.4,  fontFamily: 'Inter, system-ui, sans-serif' },
  'L-paragraph-regular': { fontSize: 18, fontWeight: '400', lineHeight: 1.56, fontFamily: 'Inter, system-ui, sans-serif' },
  'M-paragraph-regular': { fontSize: 16, fontWeight: '400', lineHeight: 1.5,  fontFamily: 'Inter, system-ui, sans-serif' },
  'S-paragraph-regular': { fontSize: 14, fontWeight: '400', lineHeight: 1.57, fontFamily: 'Inter, system-ui, sans-serif' },
  'XS-paragraph-regular':{ fontSize: 12, fontWeight: '400', lineHeight: 1.5,  fontFamily: 'Inter, system-ui, sans-serif' },
  'M-label':           { fontSize: 16, fontWeight: '600', lineHeight: 1.5,  fontFamily: 'Inter, system-ui, sans-serif' },
  'S-label':           { fontSize: 14, fontWeight: '600', lineHeight: 1.57, fontFamily: 'Inter, system-ui, sans-serif' },
  'button':            { fontSize: 15, fontWeight: '600', lineHeight: 1.4,  fontFamily: 'Inter, system-ui, sans-serif', textAlign: 'center' },
};
export function Text({ text, children, type, color, style, ...rest }) {
  const preset = TEXT_PRESETS[type] || { fontSize: 14, fontWeight: '400', lineHeight: 1.5, fontFamily: 'Inter, system-ui, sans-serif' };
  return React.createElement('span', { style: { ...preset, color: color || '#0F1010', ...style }, ...rest }, text || children);
}

// ── Button ────────────────────────────────────────────────────────────────────
const BTN_VARIANTS = {
  primary:   { bg: '#024CCE', color: '#fff', border: 'none' },
  secondary: { bg: '#fff', color: '#0F1010', border: '1.5px solid #D9E6F0' },
  tertiary:  { bg: 'transparent', color: '#0F1010', border: 'none' },
  ghost:     { bg: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' },
  outline:   { bg: 'rgba(59,130,246,0.05)', color: '#1B5ED3', border: '1px solid rgba(59,130,246,0.3)' },
  danger:    { bg: '#E35B5B', color: '#fff', border: 'none' },
};
const BTN_SIZES = {
  sm: { padding: '6px 14px', fontSize: 13, minHeight: 32 },
  md: { padding: '9px 18px', fontSize: 14, minHeight: 38 },
  lg: { padding: '11px 22px', fontSize: 15, minHeight: 44 },
  xl: { padding: '13px 28px', fontSize: 16, minHeight: 50 },
};
export function Button({ text, type = 'primary', variant, size = 'md', disabled, loading, onPress, onClick, children, style, fullWidth, leftIcon, rightIcon }) {
  const v = BTN_VARIANTS[variant || type] || BTN_VARIANTS.primary;
  const s = BTN_SIZES[size] || BTN_SIZES.md;
  return React.createElement('button', {
    onClick: onPress || onClick,
    disabled: disabled || loading,
    style: {
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      gap: 6, cursor: disabled ? 'not-allowed' : 'pointer',
      borderRadius: 9999, fontFamily: 'Inter, system-ui, sans-serif',
      fontWeight: '600', letterSpacing: '0.01em', transition: 'all 0.18s ease',
      opacity: disabled ? 0.6 : 1, border: v.border,
      backgroundColor: v.bg, color: v.color,
      width: fullWidth ? '100%' : undefined,
      WebkitFontSmoothing: 'antialiased',
      ...s, ...style,
    },
  }, leftIcon, loading ? '⟳' : (text || children), rightIcon);
}
`;
